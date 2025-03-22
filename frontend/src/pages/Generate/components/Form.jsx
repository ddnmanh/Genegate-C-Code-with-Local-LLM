// components/TestResults.jsx
import React, {useState} from 'react';
import classNames from 'classnames/bind';
import style from './Form.module.scss';
const cn = classNames.bind(style);

const Form = ({ ...props }) => { 

    const [formData, setFormData] = useState({
        problem: props.dataProblem.problem || "",
        input_desc: props.dataProblem.input_desc || "",
        output_desc: props.dataProblem.output_desc || "",
        test_case: props.dataProblem.test_case || [
            { id: 1, is_delete: false, input: '', output: '' },
        ],
    });

    const handleSetFormData = (key, value) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    }

    const handleCreateNewTestCase = () => { 
        setFormData({ ...formData, test_case: [...formData.test_case, { id: formData.test_case.length + 1, is_delete: false, input: '', output: '' }] });
    };

    const handleInputTestCaseChange = (id, field, value) => {
        const updatedTestCases = formData.test_case.map((testCase) =>
            testCase.id === id ? { ...testCase, [field]: value } : testCase
        );
        
        setFormData({ ...formData, test_case: updatedTestCases });
    };

    const handleRemoveTestCase = (id) => {
        const updatedTestCases = formData.test_case.map((testCase) => {
            if (testCase.id === id) {
                return { ...testCase, is_delete: true };
            }
            return testCase;
        });

        setFormData({ ...formData, test_case: [...updatedTestCases] });
    };

    const isAcceptAddNewTestCase = () => {
        for (let i = formData.test_case.length - 1; i >= 0; i--) {
            if (!formData.test_case[i].is_delete && (formData.test_case[i].input.trim() === '' || formData.test_case[i].output.trim() === '')) {
                return false;
            }
        } 
        return true;
    }

    const isAcceptSubmit = () => { 

        let testCases = formData.test_case.filter((testCase) => (testCase.is_delete === false && testCase.input.trim() !== '' && testCase.output.trim() !== ''));

        if (
            formData.problem.trim() === "" ||
            formData.input_desc.trim() === "" ||
            formData.output_desc.trim() === "" ||
            testCases.length == 0
        ) {
            return false;
        }

        return true;
    }

    return (
        <div className={cn("code-generation-container")}>

            <div className={cn("form-section")}>
                <div className={cn("form-group")}>
                    <label>Đề bài</label>
                    <textarea
                        value={formData.problem}
                        onChange={(e) => handleSetFormData("problem", e.target.value)}
                        placeholder="Write a program to calculate the sum of even numbers in a list of integers."
                        className={cn("form-input")}
                        rows={6}
                    ></textarea>
                </div>
                <div className={cn("form-group")}>
                    <label>Mô tả dữ liệu đầu vào</label>
                    <textarea
                        value={formData.input_desc}
                        onChange={(e) => handleSetFormData("input_desc", e.target.value)}
                        placeholder="The input data is a sequence of numbers, the first number is the number of elements in the list, the remaining numbers are the numbers in the list."
                        className={cn("form-input")}
                        rows={6}
                    ></textarea>
                </div>
                <div className={cn("form-group")}>
                    <label>Mô tả dữ liệu đầu ra</label>
                    <textarea
                        value={formData.output_desc}
                        onChange={(e) => handleSetFormData("output_desc", e.target.value)}
                        placeholder="The output is a single integer representing the sum of all even numbers in the list."
                        className={cn("form-input")}
                        rows={6}
                    ></textarea>
                </div>
                <div className={cn("form-group")}>
                    <label>Các bộ dữ liệu mẫu</label>
                    <div className={cn("test-case-container")}>
                        {
                            formData.test_case.map((testCase) => (
                                testCase.is_delete === false
                                &&
                                <div className={cn("test-inputs")} key={testCase.id}>
                                    <input
                                        type="text"
                                        placeholder="4 7 4 6 2"
                                        value={testCase.input}
                                        onChange={(e) => handleInputTestCaseChange(testCase.id, 'input', e.target.value)}
                                        className={cn("form-input")}
                                    />
                                    <input
                                        type="text"
                                        placeholder="12"
                                        value={testCase.output}
                                        onChange={(e) => handleInputTestCaseChange(testCase.id, 'output', e.target.value)}
                                        className={cn("form-input")}
                                    />
                                    <button
                                        disabled={formData.test_case.filter((testCase) => testCase.is_delete === false).length > 1 ? false : true}
                                        className={cn("remove-btn")}
                                        onClick={() => {
                                            formData.test_case.filter((testCase) => testCase.is_delete === false).length > 1 && handleRemoveTestCase(testCase.id);
                                        }}

                                    >
                                        <ion-icon name="remove-outline"></ion-icon>
                                    </button>
                                </div>
                            ))
                        }
                        <div className={cn("btn-cluster")}>
                            <button 
                                className={cn("add-test-btn")} 
                                onClick={handleCreateNewTestCase}
                                disabled={
                                    props.isLoading 
                                    || 
                                    isAcceptAddNewTestCase() === false
                                }
                            >
                                <ion-icon name="add-outline"></ion-icon>
                                <span>More test</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className={cn("generate-btn")}
                onClick={() => props?.handleSubmit(formData)}
                disabled={
                    props.isLoading
                    ||
                    isAcceptSubmit() === false
                }
            >
                {props.isLoading ? 'Đang tạo code...' : 'Tạo code'}
            </button>
        </div>
    );
};

export default Form;