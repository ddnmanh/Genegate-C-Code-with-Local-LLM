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

    const [result, setResult] = useState(null);

    
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