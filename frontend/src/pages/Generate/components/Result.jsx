// components/CodeEditor.jsx
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, a11yDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Dropdown } from '../../../components';

import classNames from 'classnames/bind';
import style from './Result.module.scss';
const cn = classNames.bind(style);

const Result = ({ ...props }) => {

    console.log(props.results);


    const [selectedAttempt, setSelectedAttempt] = useState(props.result && props.result.history ? { value: props.result.history.length - 1, label: `Lần tạo ${props.result.history.length}` } : null);
    const [options, setOptions] = useState([]);

    const handleDropdownChange = (selected) => {
        setSelectedAttempt(selected);
    };

    useEffect(() => { 
        if (props.result && props.result.history && props.result.history.length > 0) {
            setOptions(props.result?.history.map((attempt, index) => ({
                value: index,
                label: `Lần tạo ${attempt.attempt} ${index === props.result.history.length - 1 ? '(Bản cuối)' : ''}`
            })));

            setSelectedAttempt({
                value: props.result.history.length - 1,
                label: `Lần tạo ${props.result.history.length} (Bản cuối)`
            });
        }
    }, [props.result]);


    if (!props.result) return <div>Chưa có kết quả. Vui lòng tạo code trước.</div>;

    return (
        <div className={cn("results-container")}> 
        {
            props.result.history[selectedAttempt.value] && (
                <>
                    <div className={cn("code-display")}>
                        <div className={cn("code-display_head")}>
                            <h3>Code C++ đã tạo</h3>
                            <Dropdown
                                options={options}
                                onChange={handleDropdownChange}
                                defaultValue={selectedAttempt}
                            ></Dropdown>
                        </div>
                        {/* <CodeEditor code={props.result.history[selectedAttempt.value].code || 'Không có code'} /> */}
                        {
                            props.result.history[selectedAttempt.value].code 
                            &&
                            <div className={cn("code-editor-container")}>
                                <SyntaxHighlighter
                                    language="cpp"
                                    style={prism}
                                    showLineNumbers={false}
                                    wrapLines={true}  
                                >
                                    {props.result.history[selectedAttempt.value].code}
                                </SyntaxHighlighter>
                            </div>
                            ||
                            <div className={cn("no-code")}>Không có code được tạo</div>
                        }
                    </div>

                    <div className={cn("test-results")}>
                        <div className={cn("test-results_head")}>
                            <h3>Kết quả kiểm thử</h3>
                        </div> 
                        {
                            (!props.result.history[selectedAttempt.value].test_results || props.result.history[selectedAttempt.value].test_results.length === 0)
                            &&
                            <div className={cn("no-results")}>Không có kết quả test nào.</div>
                            ||
                            (props.result.history[selectedAttempt.value].test_results.length === 1 && props.result.history[selectedAttempt.value].test_results[0].test_id === 0)
                            &&
                            <div className={cn("compilation-error")}>
                                <h4>Lỗi biên dịch:</h4>
                                <pre>{props.result.history[selectedAttempt.value].test_results[0].error}</pre>
                            </div>
                            ||
                            props.result.history[selectedAttempt.value].test_results.length > 0
                            &&
                            <div className={cn("test-results_container")}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Đầu vào</th>
                                            <th>KQ mong muốn</th>
                                            <th>KQ thực tế</th>
                                            <th>Trạng thái</th>
                                            <th>Thời gian</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.result.history[selectedAttempt.value].test_results?.map((result) => (
                                            <tr key={result.test_id} className={ cn({"passed": result.passed}, {"failed": !result.passed}) }>
                                                <td>{result.test_id}</td>
                                                <td><code>{result.input}</code></td>
                                                <td><code>{result.expected}</code></td>
                                                <td><code>{result.actual || '—'}</code></td>
                                                <td>
                                                    {result.passed
                                                        ? <span className={cn("status-passed")}>Pass</span>
                                                        : <span className={cn("status-failed")}>Failed {result.error ? ` (${result.error})` : ''}</span>}
                                                </td>
                                                <td>{result.execution_time ? `${result.execution_time.toFixed(4)}s` : '—'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </>
            )
        }

        {props.result.error && (
            <div className={cn("error-message")}>
                <h3>Lỗi</h3>
                <pre>{props.result.error}</pre>
            </div>
        )}
    </div>
    );
};

export default Result; 