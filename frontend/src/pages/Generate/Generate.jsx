// Home.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { LoadingSpinner } from '../../components/index.js';
import Form from './components/Form.jsx';
import Result from './components/Result.jsx';
import Stats from './components/Stats.jsx';

import classNames from 'classnames/bind';
import style from './Generate.module.scss';
const cn = classNames.bind(style);


const API_URL = process.env.REACT_APP_DOMAIN_SERVER;

const result_test = {
  "error": "Could not generate code that passes all tests after 5 attempts",
  "finalCode": null,
  "history": [
    {
      "attempt": 1,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; ++i) {\n        int num;\n        cin >> num;\n        if (num < 10 || num % 10 == num / 10) {\n            cout << \"YES \";\n        } else {\n            cout << \"NO \";\n        }\n    }\n    return 0;\n}",
      "code_metrics": {
        "complexity_score": 5,
        "conditional_statements": 2,
        "functions": 1,
        "lines_of_code": 16,
        "loops": 1
      },
      "error": "Tests failed",
      "generation_stats": {
        "attempts": 1,
        "feedback_provided": false,
        "start_time": 1742844020.449141,
        "success": true,
        "tokens_used": 531,
        "total_duration": 18.794428825378418
      },
      "test_results": [
        {
          "actual": "NO NO NO NO",
          "error": "Output mismatch",
          "execution_time": 0.48726582527160645,
          "expected": "NO YES YES NO",
          "input": "4 58 626 131 891",
          "passed": false,
          "test_id": 1
        },
        {
          "actual": "NO NO NO",
          "error": null,
          "execution_time": 0.007945060729980469,
          "expected": "NO NO NO",
          "input": "3 697 67 67",
          "passed": true,
          "test_id": 2
        },
        {
          "actual": "YES NO NO NO NO NO NO NO",
          "error": "Output mismatch",
          "execution_time": 0.006599903106689453,
          "expected": "NO NO YES NO YES YES YES YES",
          "input": "8 0 87 333 98736 606 4444 3333 87928",
          "passed": false,
          "test_id": 3
        }
      ],
      "test_stats": {
        "compilation": {
          "duration": 0.7027430534362793,
          "error_message": null,
          "success": true
        },
        "failed_tests": 2,
        "pass_rate": 33.33333333333333,
        "passed_tests": 1,
        "start_time": 1742844039.243585,
        "success": false,
        "test_executions": [
          {
            "duration": 0.48726582527160645,
            "error_message": null,
            "success": true
          },
          {
            "duration": 0.007945060729980469,
            "error_message": null,
            "success": true
          },
          {
            "duration": 0.006599903106689453,
            "error_message": null,
            "success": true
          }
        ],
        "total_duration": 1.207340955734253
      }
    },
    {
      "attempt": 2,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; ++i) {\n        int num;\n        cin >> num;\n        if (num / 10 == 0 || (num % 10 == num / 10)) {\n            cout << \"YES \";\n        } else {\n            cout << \"NO \";\n        }\n    }\n    return 0;\n}",
      "code_metrics": {
        "complexity_score": 5,
        "conditional_statements": 2,
        "functions": 1,
        "lines_of_code": 16,
        "loops": 1
      },
      "error": "Tests failed",
      "generation_stats": {
        "attempts": 1,
        "feedback_provided": true,
        "start_time": 1742844040.451147,
        "success": true,
        "tokens_used": 670,
        "total_duration": 20.378437757492065
      },
      "test_results": [
        {
          "actual": "NO NO NO NO",
          "error": "Output mismatch",
          "execution_time": 0.4029979705810547,
          "expected": "NO YES YES NO",
          "input": "4 58 626 131 891",
          "passed": false,
          "test_id": 1
        },
        {
          "actual": "NO NO NO",
          "error": null,
          "execution_time": 0.011646032333374023,
          "expected": "NO NO NO",
          "input": "3 697 67 67",
          "passed": true,
          "test_id": 2
        },
        {
          "actual": "YES NO NO NO NO NO NO NO",
          "error": "Output mismatch",
          "execution_time": 0.009302139282226562,
          "expected": "NO NO YES NO YES YES YES YES",
          "input": "8 0 87 333 98736 606 4444 3333 87928",
          "passed": false,
          "test_id": 3
        }
      ],
      "test_stats": {
        "compilation": {
          "duration": 0.40539121627807617,
          "error_message": null,
          "success": true
        },
        "failed_tests": 2,
        "pass_rate": 33.33333333333333,
        "passed_tests": 1,
        "start_time": 1742844060.829592,
        "success": false,
        "test_executions": [
          {
            "duration": 0.4029979705810547,
            "error_message": null,
            "success": true
          },
          {
            "duration": 0.011646032333374023,
            "error_message": null,
            "success": true
          },
          {
            "duration": 0.009302139282226562,
            "error_message": null,
            "success": true
          }
        ],
        "total_duration": 0.8300149440765381
      }
    },
    {
      "attempt": 3,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    while (n--) {\n        int num, firstDigit, lastDigit;\n        cin >> num;\n        if (num == 0) {\n            cout << \"YES \";\n        } else {\n            lastDigit = num % 10;\n            firstDigit = num;\n            while (firstDigit >= 10) {\n                firstDigit /= 10;\n            }\n            cout << (firstDigit == lastDigit ? \"YES\" : \"NO\") << \" \";\n        }\n    }\n    return 0;\n}",
      "code_metrics": {
        "complexity_score": 7,
        "conditional_statements": 2,
        "functions": 1,
        "lines_of_code": 21,
        "loops": 2
      },
      "error": "Tests failed",
      "generation_stats": {
        "attempts": 1,
        "feedback_provided": true,
        "start_time": 1742844061.65981,
        "success": true,
        "tokens_used": 699,
        "total_duration": 24.39839005470276
      },
      "test_results": [
        {
          "actual": "NO YES YES NO",
          "error": null,
          "execution_time": 0.31551098823547363,
          "expected": "NO YES YES NO",
          "input": "4 58 626 131 891",
          "passed": true,
          "test_id": 1
        },
        {
          "actual": "NO NO NO",
          "error": null,
          "execution_time": 0.008864164352416992,
          "expected": "NO NO NO",
          "input": "3 697 67 67",
          "passed": true,
          "test_id": 2
        },
        {
          "actual": "YES NO YES NO YES YES YES YES",
          "error": "Output mismatch",
          "execution_time": 0.007745027542114258,
          "expected": "NO NO YES NO YES YES YES YES",
          "input": "8 0 87 333 98736 606 4444 3333 87928",
          "passed": false,
          "test_id": 3
        }
      ],
      "test_stats": {
        "compilation": {
          "duration": 0.6572983264923096,
          "error_message": null,
          "success": true
        },
        "failed_tests": 1,
        "pass_rate": 66.66666666666666,
        "passed_tests": 2,
        "start_time": 1742844086.058217,
        "success": false,
        "test_executions": [
          {
            "duration": 0.31551098823547363,
            "error_message": null,
            "success": true
          },
          {
            "duration": 0.008864164352416992,
            "error_message": null,
            "success": true
          },
          {
            "duration": 0.007745027542114258,
            "error_message": null,
            "success": true
          }
        ],
        "total_duration": 0.9901118278503418
      }
    },
    {
      "attempt": 4,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    while (n--) {\n        int num;\n        cin >> num;\n        int last_digit = num % 10;\n        while (num >= 10) {\n            num /= 10;\n        }\n        if (first_digit == last_digit) {\n            cout << \"YES \";\n        } else {\n            cout << \"NO \";\n        }\n    }\n    return 0;\n}",
      "code_metrics": {
        "complexity_score": 7,
        "conditional_statements": 2,
        "functions": 1,
        "lines_of_code": 20,
        "loops": 2
      },
      "error": "Tests failed",
      "generation_stats": {
        "attempts": 1,
        "feedback_provided": true,
        "start_time": 1742844087.0485692,
        "success": true,
        "tokens_used": 629,
        "total_duration": 19.335121870040894
      },
      "test_results": [
        {
          "actual": null,
          "error": "Compilation error: ./compiled_files/code.cpp:14:13: error: use of undeclared identifier 'first_digit'; did you mean 'last_digit'?\n   14 |         if (first_digit == last_digit) {\n      |             ^~~~~~~~~~~\n      |             last_digit\n./compiled_files/code.cpp:10:13: note: 'last_digit' declared here\n   10 |         int last_digit = num % 10;\n      |             ^\n./compiled_files/code.cpp:14:25: warning: self-comparison always evaluates to true [-Wtautological-compare]\n   14 |         if (first_digit == last_digit) {\n      |                         ^\n1 warning and 1 error generated.\n",
          "expected": null,
          "input": null,
          "test_id": 0
        }
      ],
      "test_stats": {
        "compilation": {
          "duration": 0.5423800945281982,
          "error_message": "./compiled_files/code.cpp:14:13: error: use of undeclared identifier 'first_digit'; did you mean 'last_digit'?\n   14 |         if (first_digit == last_digit) {\n      |             ^~~~~~~~~~~\n      |             last_digit\n./compiled_files/code.cpp:10:13: note: 'last_digit' declared here\n   10 |         int last_digit = num % 10;\n      |             ^\n./compiled_files/code.cpp:14:25: warning: self-comparison always evaluates to true [-Wtautological-compare]\n   14 |         if (first_digit == last_digit) {\n      |                         ^\n1 warning and 1 error generated.\n",
          "success": false
        },
        "failed_tests": 0,
        "pass_rate": 0,
        "passed_tests": 0,
        "start_time": 1742844106.3836951,
        "success": false,
        "test_executions": [],
        "total_duration": 0.5427968502044678
      }
    },
    {
      "attempt": 5,
      "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    while (n--) {\n        int num, first_digit, last_digit;\n        cin >> num;\n        last_digit = num % 10;\n        if (num >= 10) {\n            while (num >= 10) {\n                num /= 10;\n            }\n            first_digit = num;\n        } else {\n            first_digit = num;\n        }\n        cout << (first_digit == last_digit ? \"YES\" : \"NO\") << \" \";\n    }\n    return 0;\n}",
      "code_metrics": {
        "complexity_score": 7,
        "conditional_statements": 2,
        "functions": 1,
        "lines_of_code": 21,
        "loops": 2
      },
      "error": "Tests failed",
      "generation_stats": {
        "attempts": 1,
        "feedback_provided": true,
        "start_time": 1742844106.926599,
        "success": true,
        "tokens_used": 761,
        "total_duration": 23.195451021194458
      },
      "test_results": [
        {
          "actual": "NO YES YES NO",
          "error": null,
          "execution_time": 0.860767126083374,
          "expected": "NO YES YES NO",
          "input": "4 58 626 131 891",
          "passed": true,
          "test_id": 1
        },
        {
          "actual": "NO NO NO",
          "error": null,
          "execution_time": 0.006439924240112305,
          "expected": "NO NO NO",
          "input": "3 697 67 67",
          "passed": true,
          "test_id": 2
        },
        {
          "actual": "YES NO YES NO YES YES YES YES",
          "error": "Output mismatch",
          "execution_time": 0.004936933517456055,
          "expected": "NO NO YES NO YES YES YES YES",
          "input": "8 0 87 333 98736 606 4444 3333 87928",
          "passed": false,
          "test_id": 3
        }
      ],
      "test_stats": {
        "compilation": {
          "duration": 0.4906289577484131,
          "error_message": null,
          "success": true
        },
        "failed_tests": 1,
        "pass_rate": 66.66666666666666,
        "passed_tests": 2,
        "start_time": 1742844130.1220548,
        "success": false,
        "test_executions": [
          {
            "duration": 0.860767126083374,
            "error_message": null,
            "success": true
          },
          {
            "duration": 0.006439924240112305,
            "error_message": null,
            "success": true
          },
          {
            "duration": 0.004936933517456055,
            "error_message": null,
            "success": true
          }
        ],
        "total_duration": 1.3633742332458496
      }
    }
  ],
  "stats": {
    "attempts": 5,
    "code_generations": [
      {
        "attempts": 1,
        "feedback_provided": false,
        "start_time": 1742844020.449141,
        "success": true,
        "tokens_used": 531,
        "total_duration": 18.794428825378418
      },
      {
        "attempts": 1,
        "feedback_provided": true,
        "start_time": 1742844040.451147,
        "success": true,
        "tokens_used": 670,
        "total_duration": 20.378437757492065
      },
      {
        "attempts": 1,
        "feedback_provided": true,
        "start_time": 1742844061.65981,
        "success": true,
        "tokens_used": 699,
        "total_duration": 24.39839005470276
      },
      {
        "attempts": 1,
        "feedback_provided": true,
        "start_time": 1742844087.0485692,
        "success": true,
        "tokens_used": 629,
        "total_duration": 19.335121870040894
      },
      {
        "attempts": 1,
        "feedback_provided": true,
        "start_time": 1742844106.926599,
        "success": true,
        "tokens_used": 761,
        "total_duration": 23.195451021194458
      }
    ],
    "end_time": 1742844131.485586,
    "improvement_metrics": {
      "code_quality_improvement": 23.809523809523807,
      "pass_rate_improvement": 33.33333333333333
    },
    "normalization": {
      "attempts": 1,
      "start_time": 1742843977.410316,
      "success": true,
      "tokens_used": 639,
      "total_duration": 43.038596868515015
    },
    "request_id": "20250325021937",
    "start_time": 1742843977.410152,
    "success": false,
    "total_duration": 154.07543396949768
  },
  "testResults": [
    {
      "actual": "NO YES YES NO",
      "error": null,
      "execution_time": 0.860767126083374,
      "expected": "NO YES YES NO",
      "input": "4 58 626 131 891",
      "passed": true,
      "test_id": 1
    },
    {
      "actual": "NO NO NO",
      "error": null,
      "execution_time": 0.006439924240112305,
      "expected": "NO NO NO",
      "input": "3 697 67 67",
      "passed": true,
      "test_id": 2
    },
    {
      "actual": "YES NO YES NO YES YES YES YES",
      "error": "Output mismatch",
      "execution_time": 0.004936933517456055,
      "expected": "NO NO YES NO YES YES YES YES",
      "input": "8 0 87 333 98736 606 4444 3333 87928",
      "passed": false,
      "test_id": 3
    }
  ]
};

function Generate() {
  const [dataProblem, setDataProblem] = useState({
    problem: "",
    input_desc: "",
    output_desc: "",
    test_case: [
      { id: 1, is_delete: false, input: "", output: "" }
    ],
  });

  const [result, setResult] = useState(result_test); // use result_test to test


  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('form'); // form, results, statistics

  const handleSubmit = async (data) => {
    setDataProblem(data);
    setLoading(true);
    setResult(null);

    const testCaseUse = data.test_case.filter((testCase) => !testCase.is_delete);

    const testCaseModified = testCaseUse.map((testCase) => {
      return {
        input: testCase.input,
        output: testCase.output
      }
    });

    const formData = {
      problem: data.problem,
      inputDesc: data.input_desc,
      outputDesc: data.output_desc,
      testStr: JSON.stringify(testCaseModified),
    };

    try {
      const response = await axios.post('http://localhost:8080/api/generate', formData);
      setResult(response.data);
      setActiveTab('results');
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      alert('Đã xảy ra lỗi khi tạo code. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };



  const renderForm = () => <Form handleSubmit={handleSubmit} dataProblem={dataProblem} isLoading={loading} />;

  const renderResults = () => <Result result={result} />;

  const renderStatistics = () => <Stats result={result} />;

  return (
    <div className={cn("app-container")}>
      <header>
        <div className={cn("header-content")}>
          <h1>AI Generate CPP Code</h1>
          <nav>
            <button
              className={cn({ "active": activeTab === 'form' })}
              onClick={() => setActiveTab('form')}
            >
              Tạo code mới
            </button>
            <button
              className={cn({ "active": activeTab === 'results' })}
              onClick={() => setActiveTab('results')}
              disabled={!result}
            >
              Kết quả
            </button>
            <button
              className={cn({ "active": activeTab === 'statistics' })}
              onClick={() => setActiveTab('statistics')}
              disabled={!result}
            >
              Thống kê
            </button>
          </nav>
        </div>
      </header>

      <div className={cn("main-container")}>
        {loading && <LoadingSpinner />}
        {activeTab === 'form' && renderForm()}
        {activeTab === 'results' && renderResults()}
        {activeTab === 'statistics' && renderStatistics()}
      </div>

      <footer className={cn("footer")}>
        <div className={cn("footer-content")}>
          <h3 className={cn("footer-title")}>Code Generator with AI © 2025</h3>
          <div className={cn("footer-info")}>
            <p>Nguyen Duc Manh</p>
            <p>
              <a href="mailto:ducmanh.dnm@gmail.com">ducmanh.dnm@gmail.com</a>
            </p>
            <p>TVU University</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Generate;