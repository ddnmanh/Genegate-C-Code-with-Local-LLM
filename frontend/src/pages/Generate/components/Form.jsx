// components/TestResults.jsx
import React, {useState} from 'react'; 
import mammoth from 'mammoth';
import jsonFileIMG from '../../../assets/icons/json.png';
import txtFileIMG from '../../../assets/icons/txt.png';
import docFileIMG from '../../../assets/icons/doc.png';

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


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const fileExtension = file.name.split('.').pop().toLowerCase();
    
        if (fileExtension === 'docx') {
            // Xử lý file .docx
            try {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.convertToHtml({ arrayBuffer });
                const parser = new DOMParser();
                const doc = parser.parseFromString(result.value, 'text/html'); 
                
                const formData = {
                    problem: '',
                    input_desc: '',
                    output_desc: '', 
                    test_case: []
                };

                // Đọc các phần mô tả
                const paragraphs = doc.querySelectorAll('p');

                let currentSection = '';
                let currentContent = '';

                for (let i = 0; i < paragraphs.length; i++) {
                    const text = paragraphs[i].textContent.trim();
                    
                    if (text === "Test Cases:") break;
                    
                    if (text.startsWith('Problem:')) {
                        if (currentSection && currentContent) {
                            formData[currentSection] = currentContent.trim();
                        }
                        currentSection = 'problem';
                        currentContent = text.replace('Problem:', '').trim();
                    } 
                    else if (text.startsWith('Input Desc:')) {
                        if (currentSection && currentContent) {
                            formData[currentSection] = currentContent.trim();
                        }
                        currentSection = 'input_desc';
                        currentContent = text.replace('Input Desc:', '').trim();
                    }
                    else if (text.startsWith('Output Desc:')) {
                        if (currentSection && currentContent) {
                            formData[currentSection] = currentContent.trim();
                        }
                        currentSection = 'output_desc';
                        currentContent = text.replace('Output Desc:', '').trim();
                    }
                    else if (currentSection) {
                        currentContent += '\n' + text;
                    }
                } 

                // Lưu nội dung của section cuối cùng
                if (currentSection && currentContent) {
                    formData[currentSection] = currentContent.trim();
                }

                // Đọc bảng test cases
                const tables = doc.querySelectorAll('table');
                tables.forEach(table => {
                    const rows = table.querySelectorAll('tr');

                    // Bỏ qua hàng header
                    for (let i = 1; i < rows.length; i++) {
                        const cells = rows[i].querySelectorAll('td');

                        if (cells.length >= 2) {

                            let pOnCell = cells[0].querySelectorAll('p'); 

                            let input = "";

                            if (pOnCell.length > 1) {
                                for (let j = 0; j < pOnCell.length; j++) { 
                                    input += pOnCell[j].textContent.trim();
                                    if (j < pOnCell.length - 1) {
                                        input += "\n";
                                    }
                                }
                            } else {
                                input = cells[0].textContent.trim();
                            }


                            pOnCell = cells[1].querySelectorAll('p'); 
                            let output = "";
                            
                            if (pOnCell.length > 1) {
                                for (let j = 0; j < pOnCell.length; j++) { 
                                    input += pOnCell[j].textContent.trim();
                                    if (j < pOnCell.length - 1) {
                                        input += "\n";
                                    }
                                }
                            } else {
                                output = cells[1].textContent.trim();
                            } 
                            
                            if (input && output) {
                                formData.test_case.push({
                                    id: formData.test_case.length + 1,
                                    is_delete: false,
                                    input: input,
                                    output: output
                                });
                            }
                        }
                    }
                });

                setFormData(formData);

            } catch (error) {
                console.error('Lỗi khi đọc file .docx:', error);
                alert('Không thể đọc file .docx. Vui lòng kiểm tra lại định dạng.');
            }
        } else {
            const reader = new FileReader();
            
            reader.onload = async (event) => {
                try {
                    let data;
                    if (fileExtension === 'json') {
                        // Xử lý file JSON
                        data = JSON.parse(event.target.result);
                        
                        const formattedTestCases = data.test_case.map((test, index) => ({
                            id: index + 1,
                            is_delete: false,
                            input: test.input,
                            output: test.output
                        }));
    
                        setFormData({
                            problem: data.problem || '',
                            input_desc: data.input_desc || '',
                            output_desc: data.output_desc || '',
                            test_case: formattedTestCases
                        });
    
                    } else if (fileExtension === 'txt') {
                        // Xử lý file text
                        const content = event.target.result;
                        const lines = content.split('\n');
                        
                        let problem = '';
                        let input_desc = '';
                        let output_desc = '';
                        let test_cases = [];
                        
                        lines.forEach(line => {
                            line = line.trim();
                            if (line.startsWith('__Problem:')) {
                                problem = line.replace('__Problem:', '').trim();
                            } else if (line.startsWith('__Input_Desc:')) {
                                input_desc = line.replace('__Input_Desc:', '').trim();
                            } else if (line.startsWith('__Output_Desc:')) {
                                output_desc = line.replace('__Output_Desc:', '').trim();
                            } else if (line.startsWith('__Test_Case:')) {
                                // Bỏ qua dòng tiêu đề
                            } else if (line.includes('->')) {
                                const [input, output] = line.split('->').map(s => s.trim());
                                test_cases.push({
                                    id: test_cases.length + 1,
                                    is_delete: false,
                                    input: input,
                                    output: output
                                });
                            }
                        });
    
                        setFormData({
                            problem: problem,
                            input_desc: input_desc,
                            output_desc: output_desc,
                            test_case: test_cases 
                        });
                    }
                } catch (error) {
                    console.error('Lỗi khi đọc file:', error);
                    alert('File không đúng định dạng. Vui lòng kiểm tra lại cấu trúc file.');
                }
            };
    
            reader.readAsText(file);
        }
    };


    return (
        <div className={cn("code-generation-container")}>

            <div className={cn("upload-section")}>
                <div className={cn("file-upload")}>
                    <input
                        type="file"
                        accept=".json,.txt,.docx"
                        onChange={(e) => handleFileUpload(e)}
                        id="file-upload"
                        className={cn("file-input")}
                    />
                    <label htmlFor="file-upload" className={cn("upload-label")}>
                        Tải lên file (.json, .txt, .docx)
                    </label>
                    <div className={cn("template")}>
                        <label>File mẫu cấu trúc đề bài</label>
                        <div className={cn("file-template_cluster")}>
                            <a href="/assets/files/problem-json-template.json" download="problem-json-template.json">
                                <img src={jsonFileIMG} alt="json-file" />
                            </a>
                            <a href="/assets/files/problem-txt-template.txt" download="problem-txt-template.txt">
                                <img src={txtFileIMG} alt="txt-file" />
                            </a>
                            <a href="/assets/files/problem-docx-template.docx" download="problem-docx-template.docx">
                                <img src={docFileIMG} alt="doc-file" />
                            </a>
                        </div>
                    </div>
                </div> 

            </div>

            <div className={cn("form-section")}>
                <div className={cn("form-group")}>
                    <label>Đề bài</label>
                    <textarea
                        value={formData.problem}
                        onChange={(e) => handleSetFormData("problem", e.target.value)}
                        placeholder="Write a program to calculate the sum of even numbers in a list of integers."
                        className={cn("form-input")}
                        rows={8}
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
                                    <textarea
                                        type="text"
                                        placeholder="4 7 4 6 2"
                                        value={testCase.input}
                                        onChange={(e) => handleInputTestCaseChange(testCase.id, 'input', e.target.value)}
                                        className={cn("form-input")}
                                        row={1}
                                    />
                                    <textarea
                                        type="text"
                                        placeholder="12"
                                        value={testCase.output}
                                        onChange={(e) => handleInputTestCaseChange(testCase.id, 'output', e.target.value)}
                                        className={cn("form-input")}
                                        row={1}
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
                                <span>Thêm</span>
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