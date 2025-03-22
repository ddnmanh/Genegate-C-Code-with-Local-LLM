import requests
import json
import subprocess
import os
import re
import time
import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

model_standard_prompt = "qwen2.5-coder-7b-instruct"
model_generation_code = "qwen2.5-coder-7b-instruct"

def call_lm_studio(prompt, model_name="local-model", port=1234, max_tokens=500, retries=3):
    url = f"http://localhost:{port}/v1/chat/completions"
    headers = {"Content-Type": "application/json"}
    data = {
        "model": model_name,
        "messages": [
            {"role": "system", "content": "Answer simply, return only the requested result without explanation, return only the best result, do not modify the request even if you realize the request is wrong"},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": max_tokens,
        "temperature": 0.7
    }
    
    start_time = time.time()
    response_data = None
    success = False
    
    for attempt in range(retries):
        try:
            response = requests.post(url, headers=headers, data=json.dumps(data))
            response.raise_for_status()
            response_data = response.json()
            result = response_data["choices"][0]["message"]["content"]
            if not result.strip() or ("int main" in result and "#include" not in result):
                continue
            success = True
            break
        except (requests.exceptions.ConnectionError, KeyError):
            if attempt == retries - 1:
                return {
                    "success": False,
                    "result": f"Error: Failed after {retries} attempts",
                    "duration": time.time() - start_time,
                    "attempts": attempt + 1,
                    "tokens": 0,
                    "model": model_name
                }
    
    duration = time.time() - start_time
    
    if not success:
        return {
            "success": False,
            "result": "Error: Empty response",
            "duration": duration,
            "attempts": retries,
            "tokens": 0,
            "model": model_name
        }
        
    # Lấy thông tin token
    token_usage = response_data.get("usage", {})
    tokens_total = token_usage.get("total_tokens", 0)
    
    return {
        "success": True,
        "result": result,
        "duration": duration,
        "attempts": attempt + 1,
        "tokens": tokens_total,
        "model": model_name
    }

def validate_json_format(data, required_keys):
    return isinstance(data, dict) and all(key in data for key in required_keys) and \
           "Tests" in data and isinstance(data["Tests"], list) and \
           all(isinstance(test, dict) and "input" in test and "output" in test for test in data["Tests"])

def normalize_requirement(problem, input_desc, output_desc, test_str, retries=3):
    prompt = f"""
        Convert the following request and test suite to structured JSON:
        Request: "{problem}"
        Input description: "{input_desc}"
        Output description: "{output_desc}"
        Test suite:
        {test_str}
        Ensure "input" is a whitespace-separated string (e.g., "4 1 2 3"), not a list.
        Return only the JSON result in this format:
        {{
            "Problem": "...",
            "InputDescription": "...",
            "OutputDescription": "...",
            "Tests": [{{"input": "...", "output": "..."}}, ...]
        }}
    """
    required_keys = ["Problem", "InputDescription", "OutputDescription", "Tests"]
    
    normalization_stats = {
        "start_time": time.time(),
        "attempts": 0,
        "success": False,
        "total_duration": 0,
        "tokens_used": 0
    }
    
    for attempt in range(retries):
        normalization_stats["attempts"] += 1
        lm_response = call_lm_studio(prompt, model_standard_prompt, port=1234)
        normalization_stats["tokens_used"] += lm_response["tokens"]
        
        if not lm_response["success"]:
            if attempt == retries - 1:
                normalization_stats["total_duration"] = time.time() - normalization_stats["start_time"]
                return None, f"Error: Normalization failed after {retries} attempts", normalization_stats
            continue
            
        result = lm_response["result"]
        cleaned_result = re.sub(r'```(?:json)?\s*|\s*```', '', result).strip()
        try:
            normalized_data = json.loads(cleaned_result)
            if validate_json_format(normalized_data, required_keys):
                normalization_stats["success"] = True
                normalization_stats["total_duration"] = time.time() - normalization_stats["start_time"]
                return normalized_data, None, normalization_stats
            continue
        except json.JSONDecodeError as e:
            print(f"JSON decode error: {e}, Raw result: {result}, Cleaned result: {cleaned_result}")
            if attempt == retries - 1:
                normalization_stats["total_duration"] = time.time() - normalization_stats["start_time"]
                return None, f"Error: Invalid JSON format after {retries} attempts", normalization_stats
    
    normalization_stats["total_duration"] = time.time() - normalization_stats["start_time"]
    return None, "Error: Normalization failed", normalization_stats

def validate_cpp_code(code):
    return bool(re.search(r'#include\s*<\w+>', code)) and bool(re.search(r'int\s+main\s*\(', code))

def generate_cpp_code(normalized_data, feedback=None, retries=3): 
    prompt = f"""
        Write a complete C++ program to solve the problem: "{normalized_data['Problem']}".
        Input description: "{normalized_data['InputDescription']}"
        Output description: "{normalized_data['OutputDescription']}"
        The program must strictly follow the input and output descriptions. No unwanted content is allowed including printing descriptions, comments, explanations, ... using code like "printf", "cout".
        The program must read the input via cin according to the input description and print the result via cout according to the output description.
        The program must ensure that it does not fall into an infinite loop when reading the input.
        The program must allow sequential input (Each value is separated by a space or by pressing the "enter" key).
        Make sure the code includes the necessary parts (e.g. <iostream>) and a main function.
        Pass the tests:
        {chr(10).join([f"- Input: \"{t['input']}\" → Output: \"{t['output']}\"" for t in normalized_data['Tests']])}
    """ 
    
    if feedback:
        prompt += f"\nPrevious code failed with errors:\n{feedback}\nPlease fix the code to pass all tests."
    
    generation_stats = {
        "start_time": time.time(),
        "attempts": 0,
        "success": False,
        "total_duration": 0,
        "tokens_used": 0,
        "feedback_provided": feedback is not None
    }
    
    for attempt in range(retries):
        generation_stats["attempts"] += 1
        lm_response = call_lm_studio(prompt, model_generation_code, port=1234)
        generation_stats["tokens_used"] += lm_response["tokens"]
        
        if not lm_response["success"]:
            if attempt == retries - 1:
                generation_stats["total_duration"] = time.time() - generation_stats["start_time"]
                return None, f"Error: Code generation failed after {retries} attempts", generation_stats
            continue
            
        result = lm_response["result"]
        cleaned_code = re.sub(r'```(?:cpp)?\s*|\s*```', '', result).strip()
        if validate_cpp_code(cleaned_code):
            generation_stats["success"] = True
            generation_stats["total_duration"] = time.time() - generation_stats["start_time"]
            return cleaned_code, None, generation_stats
        
        print(f"Code generation attempt {attempt + 1}/{retries}: Invalid C++ format, Raw result: {result}, Cleaned result: {cleaned_code}")
        if attempt == retries - 1:
            generation_stats["total_duration"] = time.time() - generation_stats["start_time"]
            return None, f"Error: Invalid C++ code after {retries} attempts", generation_stats
    
    generation_stats["total_duration"] = time.time() - generation_stats["start_time"] 
    
    return None, "Error: Code generation failed", generation_stats

def compile_cpp(code):
    with open("./compiled_files/code.cpp", "w") as f:
        f.write(code)
    start_time = time.time()
    compile_result = subprocess.run(["g++", "./compiled_files/code.cpp", "-o", "./compiled_files/code"], capture_output=True, text=True)
    compile_duration = time.time() - start_time
    
    compilation_stats = {
        "duration": compile_duration,
        "success": compile_result.returncode == 0,
        "error_message": compile_result.stderr if compile_result.returncode != 0 else None
    }
    
    if compile_result.returncode != 0:
        print(f"Compilation failed: {compile_result.stderr}")
        return False, f"Compilation error: {compile_result.stderr}", compilation_stats
    return True, None, compilation_stats

def run_cpp(test_input):
    start_time = time.time()
    run_result = subprocess.run(["./compiled_files/code"], input=test_input, capture_output=True, text=True)
    execution_duration = time.time() - start_time
    
    execution_stats = {
        "duration": execution_duration,
        "success": run_result.returncode == 0,
        "error_message": run_result.stderr if run_result.returncode != 0 else None
    }
    
    if run_result.returncode != 0:
        print(f"Runtime error: {run_result.stderr}")
        return False, f"Runtime error: {run_result.stderr}", execution_stats
    
    return True, run_result.stdout.strip(), execution_stats

def run_tests(code, tests): 
    if not code.strip():
        return False, [{"test_id": 0, "input": None, "expected": None, "actual": None, "error": "Generated code is empty"}], {"success": False, "compilation": None, "test_executions": [], "pass_rate": 0}
    
    test_stats = {
        "start_time": time.time(),
        "success": False,
        "compilation": None,
        "test_executions": [],
        "total_duration": 0,
        "pass_rate": 0,
        "failed_tests": 0,
        "passed_tests": 0
    }
    
    compile_success, compile_error, compilation_stats = compile_cpp(code)
    test_stats["compilation"] = compilation_stats
    
    if not compile_success:
        test_stats["total_duration"] = time.time() - test_stats["start_time"]
        return False, [{"test_id": 0, "input": None, "expected": None, "actual": None, "error": compile_error}], test_stats
    
    test_results = []
    all_passed = True
    
    for i, test in enumerate(tests):
        success, result, execution_stats = run_cpp(test["input"])
        test_stats["test_executions"].append(execution_stats)
        
        # Ensure both result and test output are strings for comparison
        result = str(result).strip() if result else ""
        testOutput = str(test["output"]).strip() 
        
        test_passed = success and result == testOutput
        if test_passed:
            test_stats["passed_tests"] += 1
        else:
            test_stats["failed_tests"] += 1
            all_passed = False
        
        if not success:
            test_results.append({
                "test_id": i + 1, 
                "input": test["input"], 
                "expected": testOutput, 
                "actual": None, 
                "error": result,
                "passed": False,
                "execution_time": execution_stats["duration"]
            })
        elif result != testOutput:
            test_results.append({
                "test_id": i + 1, 
                "input": test["input"], 
                "expected": testOutput, 
                "actual": result, 
                "error": "Output mismatch",
                "passed": False,
                "execution_time": execution_stats["duration"]
            })
        else:
            test_results.append({
                "test_id": i + 1, 
                "input": test["input"], 
                "expected": testOutput, 
                "actual": result, 
                "error": None,
                "passed": True,
                "execution_time": execution_stats["duration"]
            })
    
    # Tính toán tỉ lệ vượt qua bộ test
    total_tests = len(tests)
    test_stats["pass_rate"] = (test_stats["passed_tests"] / total_tests) * 100 if total_tests > 0 else 0
    test_stats["success"] = all_passed
    test_stats["total_duration"] = time.time() - test_stats["start_time"]
    
    return all_passed, test_results, test_stats

def generate_feedback(test_results):
    feedback = "Failed test cases:\n"
    for result in test_results:
        if result.get("error") or not result.get("passed", False):
            feedback += (f"- Test {result['test_id']}: Input \"{result['input']}\" → "
                         f"Expected \"{result['expected']}\", Got \"{result['actual']}\", "
                         f"Error: {result['error']}\n")
    return feedback

def extract_code_metrics(code):
    if not code:
        return {
            "lines_of_code": 0,
            "complexity_score": 0
        }
    
    lines = code.split('\n')
    non_empty_lines = [line for line in lines if line.strip()]
    
    # Đánh giá độ phức tạp đơn giản dựa trên:
    # - Số lượng câu lệnh điều kiện (if, else, switch)
    # - Số lượng vòng lặp (for, while, do-while)
    # - Số lượng hàm
    conditional_statements = len(re.findall(r'\b(if|else|switch|case)\b', code))
    loops = len(re.findall(r'\b(for|while|do)\b', code))
    functions = len(re.findall(r'\w+\s+\w+\s*\([^)]*\)\s*{', code))
    
    complexity_score = conditional_statements + loops * 2 + functions
    
    return {
        "lines_of_code": len(non_empty_lines),
        "complexity_score": complexity_score,
        "conditional_statements": conditional_statements,
        "loops": loops,
        "functions": functions
    }

def compute_improvement_metrics(history):
    if len(history) <= 1:
        return {
            "pass_rate_improvement": 0,
            "code_quality_improvement": 0
        }
    
    # Lấy tỉ lệ vượt qua test của lần đầu và lần cuối
    first_attempt = history[0]
    last_attempt = history[-1]
    
    # Tính cải thiện tỉ lệ vượt qua test
    first_pass_rate = first_attempt.get("test_stats", {}).get("pass_rate", 0)
    last_pass_rate = last_attempt.get("test_stats", {}).get("pass_rate", 0)
    pass_rate_improvement = last_pass_rate - first_pass_rate
    
    # Tính cải thiện chất lượng code (đơn giản dựa trên độ phức tạp)
    first_complexity = first_attempt.get("code_metrics", {}).get("complexity_score", 0)
    last_complexity = last_attempt.get("code_metrics", {}).get("complexity_score", 0)
    
    # Nếu độ phức tạp giảm mà pass rate tăng -> code tốt hơn
    if first_complexity > 0 and last_complexity > 0:
        if last_pass_rate > first_pass_rate and last_complexity <= first_complexity:
            code_quality_improvement = 100  # Cải thiện tối đa
        elif last_pass_rate > first_pass_rate:
            # Cải thiện pass rate nhưng tăng độ phức tạp
            complexity_change_ratio = last_complexity / first_complexity
            code_quality_improvement = (last_pass_rate - first_pass_rate) / complexity_change_ratio
        else:
            code_quality_improvement = 0
    else:
        code_quality_improvement = 0
    
    return {
        "pass_rate_improvement": pass_rate_improvement,
        "code_quality_improvement": code_quality_improvement
    }

def process_request(problem, input_desc, output_desc, test_str):
    process_stats = {
        "request_id": datetime.datetime.now().strftime("%Y%m%d%H%M%S"),
        "start_time": time.time(),
        "end_time": None,
        "total_duration": 0,
        "attempts": 0,
        "success": False,
        "normalization": None,
        "code_generations": [],
        "improvement_metrics": None
    }
    
    normalized, norm_error, normalization_stats = normalize_requirement(problem, input_desc, output_desc, test_str)
    process_stats["normalization"] = normalization_stats
    
    if not normalized:
        process_stats["end_time"] = time.time()
        process_stats["total_duration"] = process_stats["end_time"] - process_stats["start_time"]
        return None, norm_error, None, [], process_stats
    
    attempt = 0
    max_attempts = 5
    feedback = None
    history = []
    
    while attempt < max_attempts:
        process_stats["attempts"] += 1
        
        code, code_error, generation_stats = generate_cpp_code(normalized, feedback)
        process_stats["code_generations"].append(generation_stats)
        
        if not code:
            code_metrics = extract_code_metrics(None)
            history.append({
                "attempt": attempt + 1, 
                "code": None, 
                "error": code_error, 
                "test_results": None,
                "test_stats": None,
                "code_metrics": code_metrics,
                "generation_stats": generation_stats
            })
            
            process_stats["end_time"] = time.time()
            process_stats["total_duration"] = process_stats["end_time"] - process_stats["start_time"]
            process_stats["improvement_metrics"] = compute_improvement_metrics(history)
            
            return None, code_error, None, history, process_stats
        
        all_passed, test_results, test_stats = run_tests(code, normalized["Tests"])
        code_metrics = extract_code_metrics(code)
        
        history.append({
            "attempt": attempt + 1, 
            "code": code, 
            "error": None if all_passed else "Tests failed", 
            "test_results": test_results,
            "test_stats": test_stats,
            "code_metrics": code_metrics,
            "generation_stats": generation_stats
        })
        
        if all_passed:
            process_stats["success"] = True
            process_stats["end_time"] = time.time()
            process_stats["total_duration"] = process_stats["end_time"] - process_stats["start_time"]
            process_stats["improvement_metrics"] = compute_improvement_metrics(history)
            
            return code, None, test_results, history, process_stats
        
        feedback = generate_feedback([r for r in test_results if r.get("error") or not r.get("passed", False)])
        attempt += 1
    
    process_stats["end_time"] = time.time()
    process_stats["total_duration"] = process_stats["end_time"] - process_stats["start_time"]
    process_stats["improvement_metrics"] = compute_improvement_metrics(history)
    
    return None, "Could not generate code that passes all tests after 5 attempts", test_results, history, process_stats

@app.route('/api/generate', methods=['POST'])
def generate_code():
    data = request.get_json()
    problem = data.get('problem')
    input_desc = data.get('inputDesc')
    output_desc = data.get('outputDesc')
    test_str = data.get('testStr')
    
    if not all([problem, input_desc, output_desc, test_str]):
        return jsonify({'error': 'Missing required fields'}), 400

    code, error, test_results, history, process_stats = process_request(problem, input_desc, output_desc, test_str)

    response = {
        'finalCode': code,
        'error': error,
        'testResults': test_results,
        'history': history,
        'stats': process_stats
    }
    
    return jsonify(response)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """API endpoint để lấy thống kê từ các requests trước đó"""
    # Trong phiên bản thực tế, điều này sẽ lấy từ cơ sở dữ liệu hoặc bộ nhớ
    # Hiện tại, chúng ta trả về một placeholder
    return jsonify({
        'message': 'Stats API endpoint placeholder'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)  # Chạy trên cổng 8080