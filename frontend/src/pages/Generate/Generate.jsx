// Home.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './Generate.scss';
import { LoadingSpinner } from '../../components/index.js';
import Form from './components/Form.jsx';
import Result from './components/Result.jsx';
import Stats from './components/Stats.jsx';

// import classNames from 'classnames/bind';
// import style from './Dropdown.module.scss';
// const cn = classNames.bind(style);


const API_URL = process.env.REACT_APP_DOMAIN_SERVER;

function Generate() { 
    const [dataProblem, setDataProblem] = useState({
        problem: "",
        input_desc: "",
        output_desc: "",
        test_case: [
            { id: 1, is_delete: false, input: "", output: "" }
        ],
    });
    // const [dataProblem, setDataProblem] = useState({
    //     problem: "Write a complete C++ program that reads an integer n (1 ≤ n ≤ 10⁶), followed by n integers representing an array A. The program must find the largest element in the array and print the index of its last occurrence (0-based index).",
    //     input_desc: "The input consists of a sequence of integers separated by spaces. The first integer is n, representing the number of elements in the array. The next n integers are the elements of array A, where each element satisfies |A[i]| ≤ 10⁹. Input is read from standard input (cin).",
    //     output_desc: "Print exactly one integer, which is the index of the last occurrence of the largest element in the array. No extra text, no explanations, only the integer.",
    //     test_case: [
    //         { id: 1, is_delete: false, input: '5 1 3 2 4 0', output: '3' }, 
    //         { id: 2, is_delete: false, input: '5 9 -9 12 -7 3', output: '2' }, 
    //         { id: 3, is_delete: false, input: '6 1 -4 9 2 9 4', output: '4' }, 
    //         { id: 4, is_delete: false, input: '9 14 8 -12 14 13 2 14 -9 3', output: '6' }, 
    //         { id: 5, is_delete: false, input: '6 -99 -75 -8 -13 -8 -39', output: '4' }
    //     ],
    // });

    // const [result, setResult] = useState(null);

    // 1 - easy
    // const [result, setResult] = useState({
    //     "error": null,
    //     "finalCode": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, sum = 0;\n    cin >> n; // read the number of elements in list\n    \n    vector<int> v(n);   // create a vector to store numbers from input\n    for (int i = 0; i < n; ++i) {\n        cin >> v[i]; // read an element and save it into the vector\n    }\n    \n    for (auto& num: v) {\n        if (num % 2 == 0) sum += num;   // calculate the sum of even numbers\n    }\n    cout << sum; // print result\n}",
    //     "history": [
    //         {
    //             "attempt": 1,
    //             "code": "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n, sum = 0;\n    cin >> n; // read the number of elements in list\n    \n    vector<int> v(n);   // create a vector to store numbers from input\n    for (int i = 0; i < n; ++i) {\n        cin >> v[i]; // read an element and save it into the vector\n    }\n    \n    for (auto& num: v) {\n        if (num % 2 == 0) sum += num;   // calculate the sum of even numbers\n    }\n    cout << sum; // print result\n}",
    //             "code_metrics": {
    //                 "complexity_score": 7,
    //                 "conditional_statements": 1,
    //                 "functions": 2,
    //                 "lines_of_code": 15,
    //                 "loops": 2
    //             },
    //             "error": null,
    //             "generation_stats": {
    //                 "attempts": 1,
    //                 "feedback_provided": false,
    //                 "start_time": 1742232522.106004,
    //                 "success": true,
    //                 "tokens_used": 504,
    //                 "total_duration": 10.639655828475952
    //             },
    //             "test_results": [
    //                 {
    //                     "actual": "2",
    //                     "error": null,
    //                     "execution_time": 0.3849790096282959,
    //                     "expected": "2",
    //                     "input": "3 1 2 3",
    //                     "passed": true,
    //                     "test_id": 1
    //                 },
    //                 {
    //                     "actual": "0",
    //                     "error": null,
    //                     "execution_time": 0.01009988784790039,
    //                     "expected": "0",
    //                     "input": "5 3 5 7 9 1",
    //                     "passed": true,
    //                     "test_id": 2
    //                 },
    //                 {
    //                     "actual": "12",
    //                     "error": null,
    //                     "execution_time": 0.010612249374389648,
    //                     "expected": "12",
    //                     "input": "4 3 2 4 6",
    //                     "passed": true,
    //                     "test_id": 3
    //                 }
    //             ],
    //             "test_stats": {
    //                 "compilation": {
    //                     "duration": 0.6022298336029053,
    //                     "error_message": null,
    //                     "success": true
    //                 },
    //                 "failed_tests": 0,
    //                 "pass_rate": 100.0,
    //                 "passed_tests": 3,
    //                 "start_time": 1742232532.745845,
    //                 "success": true,
    //                 "test_executions": [
    //                     {
    //                         "duration": 0.3849790096282959,
    //                         "error_message": null,
    //                         "success": true
    //                     },
    //                     {
    //                         "duration": 0.01009988784790039,
    //                         "error_message": null,
    //                         "success": true
    //                     },
    //                     {
    //                         "duration": 0.010612249374389648,
    //                         "error_message": null,
    //                         "success": true
    //                     }
    //                 ],
    //                 "total_duration": 1.0104708671569824
    //             }
    //         }
    //     ],
    //     "stats": {
    //         "attempts": 1,
    //         "code_generations": [
    //             {
    //                 "attempts": 1,
    //                 "feedback_provided": false,
    //                 "start_time": 1742232522.106004,
    //                 "success": true,
    //                 "tokens_used": 504,
    //                 "total_duration": 10.639655828475952
    //             }
    //         ],
    //         "end_time": 1742232533.756917,
    //         "improvement_metrics": {
    //             "code_quality_improvement": 0,
    //             "pass_rate_improvement": 0
    //         },
    //         "normalization": {
    //             "attempts": 1,
    //             "start_time": 1742232511.150896,
    //             "success": true,
    //             "tokens_used": 463,
    //             "total_duration": 10.954852819442749
    //         },
    //         "request_id": "20250318002831",
    //         "start_time": 1742232511.150883,
    //         "success": true,
    //         "total_duration": 22.60603404045105
    //     },
    //     "testResults": [
    //         {
    //             "actual": "2",
    //             "error": null,
    //             "execution_time": 0.3849790096282959,
    //             "expected": "2",
    //             "input": "3 1 2 3",
    //             "passed": true,
    //             "test_id": 1
    //         },
    //         {
    //             "actual": "0",
    //             "error": null,
    //             "execution_time": 0.01009988784790039,
    //             "expected": "0",
    //             "input": "5 3 5 7 9 1",
    //             "passed": true,
    //             "test_id": 2
    //         },
    //         {
    //             "actual": "12",
    //             "error": null,
    //             "execution_time": 0.010612249374389648,
    //             "expected": "12",
    //             "input": "4 3 2 4 6",
    //             "passed": true,
    //             "test_id": 3
    //         }
    //     ]
    // });

    // 2 - easy
    const [result, setResult] = useState({
        "error": null,
        "finalCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int A[n];\n    for (int i = 0; i < n; ++i) {\n        cin >> A[i];\n    }\n    \n    int maxVal = A[0];\n    int lastIndex = 0;\n    \n    for (int i = 1; i < n; ++i) {\n        if (A[i] >= maxVal) {\n            maxVal = A[i];\n            lastIndex = i;\n        }\n    }\n    \n    cout << lastIndex << endl;\n    return 0;\n}",
        "history": [
            {
                "attempt": 1,
                "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int max_val = INT_MIN;\n    int last_index = -1;\n    for (int i = 0; i < n; ++i) {\n        int val;\n        cin >> val;\n        if (val > max_val) {\n            max_val = val;\n            last_index = i;\n        }\n    }\n    cout << last_index << endl;\n    return 0;\n}",
                "code_metrics": {
                    "complexity_score": 4,
                    "conditional_statements": 1,
                    "functions": 1,
                    "lines_of_code": 18,
                    "loops": 1
                },
                "error": "Tests failed",
                "generation_stats": {
                    "attempts": 1,
                    "feedback_provided": false,
                    "start_time": 1742317331.128116,
                    "success": true,
                    "tokens_used": 523,
                    "total_duration": 9.514888048171997
                },
                "test_results": [
                    {
                        "actual": "3",
                        "error": null,
                        "execution_time": 0.4894139766693115,
                        "expected": "3",
                        "input": "5 1 3 2 4 0",
                        "passed": true,
                        "test_id": 1
                    },
                    {
                        "actual": "2",
                        "error": "Output mismatch",
                        "execution_time": 0.00865483283996582,
                        "expected": "4",
                        "input": "6 1 -4 9 2 9 4",
                        "passed": false,
                        "test_id": 2
                    },
                    {
                        "actual": "2",
                        "error": null,
                        "execution_time": 0.0059661865234375,
                        "expected": "2",
                        "input": "5 9 -9 12 -7 3",
                        "passed": true,
                        "test_id": 3
                    }
                ],
                "test_stats": {
                    "compilation": {
                        "duration": 0.6489160060882568,
                        "error_message": null,
                        "success": true
                    },
                    "failed_tests": 1,
                    "pass_rate": 66.66666666666666,
                    "passed_tests": 2,
                    "start_time": 1742317340.643071,
                    "success": false,
                    "test_executions": [
                        {
                            "duration": 0.4894139766693115,
                            "error_message": null,
                            "success": true
                        },
                        {
                            "duration": 0.00865483283996582,
                            "error_message": null,
                            "success": true
                        },
                        {
                            "duration": 0.0059661865234375,
                            "error_message": null,
                            "success": true
                        }
                    ],
                    "total_duration": 1.1543989181518555
                }
            },
            {
                "attempt": 2,
                "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int max_val = INT_MIN;\n    int last_index = -1;\n    for (int i = 0; i < n; ++i) {\n        int num;\n        cin >> num;\n        if (num > max_val) {\n            max_val = num;\n            last_index = i;\n        }\n    }\n    cout << last_index << endl;\n    return 0;\n}",
                "code_metrics": {
                    "complexity_score": 4,
                    "conditional_statements": 1,
                    "functions": 1,
                    "lines_of_code": 18,
                    "loops": 1
                },
                "error": "Tests failed",
                "generation_stats": {
                    "attempts": 1,
                    "feedback_provided": true,
                    "start_time": 1742317341.7981398,
                    "success": true,
                    "tokens_used": 577,
                    "total_duration": 7.7651519775390625
                },
                "test_results": [
                    {
                        "actual": "3",
                        "error": null,
                        "execution_time": 0.1334242820739746,
                        "expected": "3",
                        "input": "5 1 3 2 4 0",
                        "passed": true,
                        "test_id": 1
                    },
                    {
                        "actual": "2",
                        "error": "Output mismatch",
                        "execution_time": 0.0030417442321777344,
                        "expected": "4",
                        "input": "6 1 -4 9 2 9 4",
                        "passed": false,
                        "test_id": 2
                    },
                    {
                        "actual": "2",
                        "error": null,
                        "execution_time": 0.0030350685119628906,
                        "expected": "2",
                        "input": "5 9 -9 12 -7 3",
                        "passed": true,
                        "test_id": 3
                    }
                ],
                "test_stats": {
                    "compilation": {
                        "duration": 0.3411290645599365,
                        "error_message": null,
                        "success": true
                    },
                    "failed_tests": 1,
                    "pass_rate": 66.66666666666666,
                    "passed_tests": 2,
                    "start_time": 1742317349.563401,
                    "success": false,
                    "test_executions": [
                        {
                            "duration": 0.1334242820739746,
                            "error_message": null,
                            "success": true
                        },
                        {
                            "duration": 0.0030417442321777344,
                            "error_message": null,
                            "success": true
                        },
                        {
                            "duration": 0.0030350685119628906,
                            "error_message": null,
                            "success": true
                        }
                    ],
                    "total_duration": 0.4814269542694092
                }
            },
            {
                "attempt": 3,
                "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int max_val = INT_MIN;\n    int last_index = -1;\n    for (int i = 0; i < n; ++i) {\n        int num;\n        cin >> num;\n        if (num > max_val) {\n            max_val = num;\n            last_index = i;\n        }\n    }\n    cout << last_index << endl;\n    return 0;\n}",
                "code_metrics": {
                    "complexity_score": 4,
                    "conditional_statements": 1,
                    "functions": 1,
                    "lines_of_code": 18,
                    "loops": 1
                },
                "error": "Tests failed",
                "generation_stats": {
                    "attempts": 1,
                    "feedback_provided": true,
                    "start_time": 1742317350.045006,
                    "success": true,
                    "tokens_used": 577,
                    "total_duration": 7.599458932876587
                },
                "test_results": [
                    {
                        "actual": "3",
                        "error": null,
                        "execution_time": 0.13320183753967285,
                        "expected": "3",
                        "input": "5 1 3 2 4 0",
                        "passed": true,
                        "test_id": 1
                    },
                    {
                        "actual": "2",
                        "error": "Output mismatch",
                        "execution_time": 0.002410888671875,
                        "expected": "4",
                        "input": "6 1 -4 9 2 9 4",
                        "passed": false,
                        "test_id": 2
                    },
                    {
                        "actual": "2",
                        "error": null,
                        "execution_time": 0.0018770694732666016,
                        "expected": "2",
                        "input": "5 9 -9 12 -7 3",
                        "passed": true,
                        "test_id": 3
                    }
                ],
                "test_stats": {
                    "compilation": {
                        "duration": 0.336453914642334,
                        "error_message": null,
                        "success": true
                    },
                    "failed_tests": 1,
                    "pass_rate": 66.66666666666666,
                    "passed_tests": 2,
                    "start_time": 1742317357.644598,
                    "success": false,
                    "test_executions": [
                        {
                            "duration": 0.13320183753967285,
                            "error_message": null,
                            "success": true
                        },
                        {
                            "duration": 0.002410888671875,
                            "error_message": null,
                            "success": true
                        },
                        {
                            "duration": 0.0018770694732666016,
                            "error_message": null,
                            "success": true
                        }
                    ],
                    "total_duration": 0.47504115104675293
                }
            },
            {
                "attempt": 4,
                "code": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    int A[n];\n    for (int i = 0; i < n; ++i) {\n        cin >> A[i];\n    }\n    \n    int maxVal = A[0];\n    int lastIndex = 0;\n    \n    for (int i = 1; i < n; ++i) {\n        if (A[i] >= maxVal) {\n            maxVal = A[i];\n            lastIndex = i;\n        }\n    }\n    \n    cout << lastIndex << endl;\n    return 0;\n}",
                "code_metrics": {
                    "complexity_score": 6,
                    "conditional_statements": 1,
                    "functions": 1,
                    "lines_of_code": 20,
                    "loops": 2
                },
                "error": null,
                "generation_stats": {
                    "attempts": 1,
                    "feedback_provided": true,
                    "start_time": 1742317358.1197782,
                    "success": true,
                    "tokens_used": 602,
                    "total_duration": 9.862790822982788
                },
                "test_results": [
                    {
                        "actual": "3",
                        "error": null,
                        "execution_time": 0.3595890998840332,
                        "expected": "3",
                        "input": "5 1 3 2 4 0",
                        "passed": true,
                        "test_id": 1
                    },
                    {
                        "actual": "4",
                        "error": null,
                        "execution_time": 0.008592844009399414,
                        "expected": "4",
                        "input": "6 1 -4 9 2 9 4",
                        "passed": true,
                        "test_id": 2
                    },
                    {
                        "actual": "2",
                        "error": null,
                        "execution_time": 0.005280971527099609,
                        "expected": "2",
                        "input": "5 9 -9 12 -7 3",
                        "passed": true,
                        "test_id": 3
                    }
                ],
                "test_stats": {
                    "compilation": {
                        "duration": 0.36704421043395996,
                        "error_message": null,
                        "success": true
                    },
                    "failed_tests": 0,
                    "pass_rate": 100.0,
                    "passed_tests": 3,
                    "start_time": 1742317367.982712,
                    "success": true,
                    "test_executions": [
                        {
                            "duration": 0.3595890998840332,
                            "error_message": null,
                            "success": true
                        },
                        {
                            "duration": 0.008592844009399414,
                            "error_message": null,
                            "success": true
                        },
                        {
                            "duration": 0.005280971527099609,
                            "error_message": null,
                            "success": true
                        }
                    ],
                    "total_duration": 0.7415640354156494
                }
            }
        ],
        "stats": {
            "attempts": 4,
            "code_generations": [
                {
                    "attempts": 1,
                    "feedback_provided": false,
                    "start_time": 1742317331.128116,
                    "success": true,
                    "tokens_used": 523,
                    "total_duration": 9.514888048171997
                },
                {
                    "attempts": 1,
                    "feedback_provided": true,
                    "start_time": 1742317341.7981398,
                    "success": true,
                    "tokens_used": 577,
                    "total_duration": 7.7651519775390625
                },
                {
                    "attempts": 1,
                    "feedback_provided": true,
                    "start_time": 1742317350.045006,
                    "success": true,
                    "tokens_used": 577,
                    "total_duration": 7.599458932876587
                },
                {
                    "attempts": 1,
                    "feedback_provided": true,
                    "start_time": 1742317358.1197782,
                    "success": true,
                    "tokens_used": 602,
                    "total_duration": 9.862790822982788
                }
            ],
            "end_time": 1742317368.7244039,
            "improvement_metrics": {
                "code_quality_improvement": 22.22222222222223,
                "pass_rate_improvement": 33.33333333333334
            },
            "normalization": {
                "attempts": 1,
                "start_time": 1742317311.280129,
                "success": true,
                "tokens_used": 602,
                "total_duration": 19.84731912612915
            },
            "request_id": "20250319000151",
            "start_time": 1742317311.280116,
            "success": true,
            "total_duration": 57.44428777694702
        },
        "testResults": [
            {
                "actual": "3",
                "error": null,
                "execution_time": 0.3595890998840332,
                "expected": "3",
                "input": "5 1 3 2 4 0",
                "passed": true,
                "test_id": 1
            },
            {
                "actual": "4",
                "error": null,
                "execution_time": 0.008592844009399414,
                "expected": "4",
                "input": "6 1 -4 9 2 9 4",
                "passed": true,
                "test_id": 2
            },
            {
                "actual": "2",
                "error": null,
                "execution_time": 0.005280971527099609,
                "expected": "2",
                "input": "5 9 -9 12 -7 3",
                "passed": true,
                "test_id": 3
            }
        ]
    }
    );

    // 3 - easy
    // const [result, setResult] = useState({
    //     "error": null,
    //     "finalCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    string input;\n    for (int i = 0; i < n; ++i) {\n        cin >> input;\n        if (input[0] == input.back()) {\n            cout << \"YES \";\n        } else {\n            cout << \"NO \";\n        }\n    }\n    return 0;\n}",
    //     "history": [
    //         {
    //             "attempt": 1,
    //             "code": "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int n; // Number of integers to be checked for luckiness.\n    string input, first_digit, last_digit;\n    \n    cin >> n; // Read the number of numbers in a row from keyboard.\n        \n    while (n > 0) { // Check each integer for luckyness until all are processed.\n        getline(cin, input); // Read an integer as a string from keyboard.\n        if (!input.empty()) { // If the line is not empty, there was at least one digit read.\n            first_digit = input[0] != ' ' ? input : \"\";\n            last_digit   = input[input.length() - 1] != ' '? input[input.length() - 1] : \"\";\n            \n            if (first_digit == last_digit) // If the first and last digit match, then it is a lucky number.\n                cout << \"YES \";\n            else \n                cout << \"NO \";\n        }\n        \n        n--; // Decrement the counter for each integer processed.\n    }\n    \n    return 0;\n}",
    //             "code_metrics": {
    //                 "complexity_score": 12,
    //                 "conditional_statements": 3,
    //                 "functions": 1,
    //                 "lines_of_code": 21,
    //                 "loops": 4
    //             },
    //             "error": "Tests failed",
    //             "generation_stats": {
    //                 "attempts": 1,
    //                 "feedback_provided": false,
    //                 "start_time": 1742237404.310622,
    //                 "success": true,
    //                 "tokens_used": 750,
    //                 "total_duration": 18.03610897064209
    //             },
    //             "test_results": [
    //                 {
    //                     "actual": null,
    //                     "error": "Compilation error: code.cpp:14:60: error: incompatible operand types ('value_type' (aka 'char') and 'const char *')\n   14 |             last_digit   = input[input.length() - 1] != ' '? input[input.length() - 1] : \"\";\n      |                                                            ^ ~~~~~~~~~~~~~~~~~~~~~~~~~   ~~\n1 error generated.\n",
    //                     "expected": null,
    //                     "input": null,
    //                     "test_id": 0
    //                 }
    //             ],
    //             "test_stats": {
    //                 "compilation": {
    //                     "duration": 0.5125420093536377,
    //                     "error_message": "code.cpp:14:60: error: incompatible operand types ('value_type' (aka 'char') and 'const char *')\n   14 |             last_digit   = input[input.length() - 1] != ' '? input[input.length() - 1] : \"\";\n      |                                                            ^ ~~~~~~~~~~~~~~~~~~~~~~~~~   ~~\n1 error generated.\n",
    //                     "success": false
    //                 },
    //                 "failed_tests": 0,
    //                 "pass_rate": 0,
    //                 "passed_tests": 0,
    //                 "start_time": 1742237422.3468149,
    //                 "success": false,
    //                 "test_executions": [],
    //                 "total_duration": 0.5133211612701416
    //             }
    //         },
    //         {
    //             "attempt": 2,
    //             "code": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    string input;\n    for (int i = 0; i < n; ++i) {\n        cin >> input;\n        if (input[0] == input.back()) {\n            cout << \"YES \";\n        } else {\n            cout << \"NO \";\n        }\n    }\n    return 0;\n}",
    //             "code_metrics": {
    //                 "complexity_score": 5,
    //                 "conditional_statements": 2,
    //                 "functions": 1,
    //                 "lines_of_code": 17,
    //                 "loops": 1
    //             },
    //             "error": null,
    //             "generation_stats": {
    //                 "attempts": 1,
    //                 "feedback_provided": true,
    //                 "start_time": 1742237422.860501,
    //                 "success": true,
    //                 "tokens_used": 722,
    //                 "total_duration": 7.5674097537994385
    //             },
    //             "test_results": [
    //                 {
    //                     "actual": "NO YES YES NO",
    //                     "error": null,
    //                     "execution_time": 0.4404926300048828,
    //                     "expected": "NO YES YES NO",
    //                     "input": "4 673 5875 666 708",
    //                     "passed": true,
    //                     "test_id": 1
    //                 },
    //                 {
    //                     "actual": "NO NO",
    //                     "error": null,
    //                     "execution_time": 0.009641170501708984,
    //                     "expected": "NO NO",
    //                     "input": "2 1978 8080",
    //                     "passed": true,
    //                     "test_id": 2
    //                 },
    //                 {
    //                     "actual": "NO NO YES YES YES YES",
    //                     "error": null,
    //                     "execution_time": 0.008018016815185547,
    //                     "expected": "NO NO YES YES YES YES",
    //                     "input": "6 779 897 63686 101501 373 66666666",
    //                     "passed": true,
    //                     "test_id": 3
    //                 }
    //             ],
    //             "test_stats": {
    //                 "compilation": {
    //                     "duration": 0.3636631965637207,
    //                     "error_message": null,
    //                     "success": true
    //                 },
    //                 "failed_tests": 0,
    //                 "pass_rate": 100.0,
    //                 "passed_tests": 3,
    //                 "start_time": 1742237430.428055,
    //                 "success": true,
    //                 "test_executions": [
    //                     {
    //                         "duration": 0.4404926300048828,
    //                         "error_message": null,
    //                         "success": true
    //                     },
    //                     {
    //                         "duration": 0.009641170501708984,
    //                         "error_message": null,
    //                         "success": true
    //                     },
    //                     {
    //                         "duration": 0.008018016815185547,
    //                         "error_message": null,
    //                         "success": true
    //                     }
    //                 ],
    //                 "total_duration": 0.823091983795166
    //             }
    //         }
    //     ],
    //     "stats": {
    //         "attempts": 2,
    //         "code_generations": [
    //             {
    //                 "attempts": 1,
    //                 "feedback_provided": false,
    //                 "start_time": 1742237404.310622,
    //                 "success": true,
    //                 "tokens_used": 750,
    //                 "total_duration": 18.03610897064209
    //             },
    //             {
    //                 "attempts": 1,
    //                 "feedback_provided": true,
    //                 "start_time": 1742237422.860501,
    //                 "success": true,
    //                 "tokens_used": 722,
    //                 "total_duration": 7.5674097537994385
    //             }
    //         ],
    //         "end_time": 1742237431.251292,
    //         "improvement_metrics": {
    //             "code_quality_improvement": 100,
    //             "pass_rate_improvement": 100.0
    //         },
    //         "normalization": {
    //             "attempts": 1,
    //             "start_time": 1742237383.968958,
    //             "success": true,
    //             "tokens_used": 727,
    //             "total_duration": 20.341289043426514
    //         },
    //         "request_id": "20250318014943",
    //         "start_time": 1742237383.968951,
    //         "success": true,
    //         "total_duration": 47.28234100341797
    //     },
    //     "testResults": [
    //         {
    //             "actual": "NO YES YES NO",
    //             "error": null,
    //             "execution_time": 0.4404926300048828,
    //             "expected": "NO YES YES NO",
    //             "input": "4 673 5875 666 708",
    //             "passed": true,
    //             "test_id": 1
    //         },
    //         {
    //             "actual": "NO NO",
    //             "error": null,
    //             "execution_time": 0.009641170501708984,
    //             "expected": "NO NO",
    //             "input": "2 1978 8080",
    //             "passed": true,
    //             "test_id": 2
    //         },
    //         {
    //             "actual": "NO NO YES YES YES YES",
    //             "error": null,
    //             "execution_time": 0.008018016815185547,
    //             "expected": "NO NO YES YES YES YES",
    //             "input": "6 779 897 63686 101501 373 66666666",
    //             "passed": true,
    //             "test_id": 3
    //         }
    //     ]
    // });

    // 4 - easy
    // const [result, setResult] = useState({
    //     "error": null,
    //     "finalCode": "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<int> input;\n    int num;\n\n    // Read integers from the keyboard until a 0 is encountered.\n    while (std::cin >> num && num != 0) {\n        input.push_back(num);\n    }\n\n    if (!input.empty()) {\n        // List negative numbers in the order they were entered\n        std::vector<int> negatives;\n        for (auto& i : input) {\n            if (i < 0) {\n                negatives.push_back(i);\n            }\n        }\n\n        // Check if any negative numbers are present\n        std::string result = \"NOT FOUND\";\n        if (!negatives.empty()) {\n            result = std::to_string(negatives[0]);\n            for (size_t i = 1; i < negatives.size(); ++i) {\n                result += \" \" + std::to_string(negatives[i]);\n            }\n        }\n\n        // Print the result as a valid JSON string.\n        std::cout << \"{\\\"type\\\": \\\"string\\\", \\\"value\\\": \\\"\" << result << \"\\\"}\" << std::endl;\n    } else {\n        std::cout << \"{\\\"type\\\": \\\"string\\\", \\\"value\\\": \\\"NOT FOUND\\\"}\" << std::endl;\n    }\n\n    return 0;\n}",
    //     "history": [
    //         {
    //             "attempt": 1,
    //             "code": "#include <iostream>\n#include <vector>\n#include <string>\n\nint main() {\n    std::vector<int> input;\n    int num;\n\n    // Read integers from the keyboard until a 0 is encountered.\n    while (std::cin >> num && num != 0) {\n        input.push_back(num);\n    }\n\n    if (!input.empty()) {\n        // List negative numbers in the order they were entered\n        std::vector<int> negatives;\n        for (auto& i : input) {\n            if (i < 0) {\n                negatives.push_back(i);\n            }\n        }\n\n        // Check if any negative numbers are present\n        std::string result = \"NOT FOUND\";\n        if (!negatives.empty()) {\n            result = std::to_string(negatives[0]);\n            for (size_t i = 1; i < negatives.size(); ++i) {\n                result += \" \" + std::to_string(negatives[i]);\n            }\n        }\n\n        // Print the result as a valid JSON string.\n        std::cout << \"{\\\"type\\\": \\\"string\\\", \\\"value\\\": \\\"\" << result << \"\\\"}\" << std::endl;\n    } else {\n        std::cout << \"{\\\"type\\\": \\\"string\\\", \\\"value\\\": \\\"NOT FOUND\\\"}\" << std::endl;\n    }\n\n    return 0;\n}",
    //             "code_metrics": {
    //                 "complexity_score": 12,
    //                 "conditional_statements": 5,
    //                 "functions": 1,
    //                 "lines_of_code": 33,
    //                 "loops": 3
    //             },
    //             "error": null,
    //             "generation_stats": {
    //                 "attempts": 1,
    //                 "feedback_provided": false,
    //                 "start_time": 1742149269.8546681,
    //                 "success": true,
    //                 "tokens_used": 652,
    //                 "total_duration": 13.201632976531982
    //             },
    //             "test_results": [
    //                 {
    //                     "actual": "{\"type\": \"string\", \"value\": \"-1 -2 -4\"}",
    //                     "error": null,
    //                     "execution_time": 0.544666051864624,
    //                     "expected": {
    //                         "type": "string",
    //                         "value": "-1 -2 -4"
    //                     },
    //                     "input": "-1 3 -2 5 -4 0",
    //                     "passed": true,
    //                     "test_id": 1
    //                 },
    //                 {
    //                     "actual": "{\"type\": \"string\", \"value\": \"NOT FOUND\"}",
    //                     "error": null,
    //                     "execution_time": 0.009382963180541992,
    //                     "expected": {
    //                         "type": "string",
    //                         "value": "NOT FOUND"
    //                     },
    //                     "input": "1 2 3 4 0",
    //                     "passed": true,
    //                     "test_id": 2
    //                 },
    //                 {
    //                     "actual": "{\"type\": \"string\", \"value\": \"-3\"}",
    //                     "error": null,
    //                     "execution_time": 0.006955146789550781,
    //                     "expected": {
    //                         "type": "string",
    //                         "value": "-3"
    //                     },
    //                     "input": "9 9 -3 0 -2 6 -1 -1 8 0 9",
    //                     "passed": true,
    //                     "test_id": 3
    //                 }
    //             ],
    //             "test_stats": {
    //                 "compilation": {
    //                     "duration": 0.6186649799346924,
    //                     "error_message": null,
    //                     "success": true
    //                 },
    //                 "failed_tests": 0,
    //                 "pass_rate": 100.0,
    //                 "passed_tests": 3,
    //                 "start_time": 1742149283.056394,
    //                 "success": true,
    //                 "test_executions": [
    //                     {
    //                         "duration": 0.544666051864624,
    //                         "error_message": null,
    //                         "success": true
    //                     },
    //                     {
    //                         "duration": 0.009382963180541992,
    //                         "error_message": null,
    //                         "success": true
    //                     },
    //                     {
    //                         "duration": 0.006955146789550781,
    //                         "error_message": null,
    //                         "success": true
    //                     }
    //                 ],
    //                 "total_duration": 1.1815106868743896
    //             }
    //         }
    //     ],
    //     "stats": {
    //         "attempts": 1,
    //         "code_generations": [
    //             {
    //                 "attempts": 1,
    //                 "feedback_provided": false,
    //                 "start_time": 1742149269.8546681,
    //                 "success": true,
    //                 "tokens_used": 652,
    //                 "total_duration": 13.201632976531982
    //             }
    //         ],
    //         "end_time": 1742149284.238554,
    //         "improvement_metrics": {
    //             "code_quality_improvement": 0,
    //             "pass_rate_improvement": 0
    //         },
    //         "normalization": {
    //             "attempts": 1,
    //             "start_time": 1742149257.6194198,
    //             "success": true,
    //             "tokens_used": 580,
    //             "total_duration": 12.235183238983154
    //         },
    //         "request_id": "20250317012057",
    //         "start_time": 1742149257.6194072,
    //         "success": true,
    //         "total_duration": 26.619146823883057
    //     },
    //     "testResults": [
    //         {
    //             "actual": "{\"type\": \"string\", \"value\": \"-1 -2 -4\"}",
    //             "error": null,
    //             "execution_time": 0.544666051864624,
    //             "expected": {
    //                 "type": "string",
    //                 "value": "-1 -2 -4"
    //             },
    //             "input": "-1 3 -2 5 -4 0",
    //             "passed": true,
    //             "test_id": 1
    //         },
    //         {
    //             "actual": "{\"type\": \"string\", \"value\": \"NOT FOUND\"}",
    //             "error": null,
    //             "execution_time": 0.009382963180541992,
    //             "expected": {
    //                 "type": "string",
    //                 "value": "NOT FOUND"
    //             },
    //             "input": "1 2 3 4 0",
    //             "passed": true,
    //             "test_id": 2
    //         },
    //         {
    //             "actual": "{\"type\": \"string\", \"value\": \"-3\"}",
    //             "error": null,
    //             "execution_time": 0.006955146789550781,
    //             "expected": {
    //                 "type": "string",
    //                 "value": "-3"
    //             },
    //             "input": "9 9 -3 0 -2 6 -1 -1 8 0 9",
    //             "passed": true,
    //             "test_id": 3
    //         }
    //     ]
    // });
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('form'); // form, results, statistics

    const handleSubmit = async (data) => {
        console.log(data);

        setDataProblem(data);
        setLoading(true);
        setResult(null);

        const formData = {
            problem: data.problem,
            inputDesc: data.input_desc,
            outputDesc: data.output_desc,
            testStr: JSON.stringify(data.test_case),
        };

        console.log(formData);


        try {
            const response = await axios.post('http://localhost:8080/api/generate', formData);
            console.log("response", response.data);
            setResult(response.data);
            setActiveTab('results'); 
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            alert('Đã xảy ra lỗi khi tạo code. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    

    const renderForm = () => <Form handleSubmit={handleSubmit} dataProblem={dataProblem} isLoading={loading}/>;

    const renderResults = () => <Result result={result} />;

    const renderStatistics = () => <Stats result={result} />;

    return (
        <div className="app-container">
            <header>
                <h1>AI Generate CPP Code</h1>
                <nav>
                    <button
                        className={activeTab === 'form' ? 'active' : ''}
                        onClick={() => setActiveTab('form')}
                    >
                        Tạo code mới
                    </button>
                    <button
                        className={activeTab === 'results' ? 'active' : ''}
                        onClick={() => setActiveTab('results')}
                        disabled={!result}
                    >
                        Kết quả
                    </button>
                    <button
                        className={activeTab === 'statistics' ? 'active' : ''}
                        onClick={() => setActiveTab('statistics')}
                        disabled={!result}
                    >
                        Thống kê
                    </button>
                </nav>
            </header>

            <main>
                {loading && <LoadingSpinner />}
                {activeTab === 'form' && renderForm()}
                {activeTab === 'results' && renderResults()}
                {activeTab === 'statistics' && renderStatistics()}
            </main>

            <footer>
                <p>Code Generator Dashboard © 2025</p>
            </footer>
        </div>
    );
}

export default Generate;