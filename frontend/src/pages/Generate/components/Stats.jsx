// components/StatsOverview.jsx
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import arrowLeft from '../../../assets/icons/angle-left-solid.svg';
import arrowRight from '../../../assets/icons/angle-right-solid.svg';

import classNames from 'classnames/bind';
import style from './Stats.module.scss';
const cn = classNames.bind(style);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Stats = ({ ...props }) => {
    
    const [selectedAttempt, setSelectedAttempt] = useState({ value: 0, label: 'Lần 1' });

    useEffect(() => { 
        if (props.result && props.result.history && props.result.history.length > 0) { 
            setSelectedAttempt({
                value: props.result.history.length - 1,
                label: `Lần tạo ${props.result.history.length} (Bản cuối)`
            });
        }
    }, [props.result]);

    const changeSelectAttempt = (type) => () => {
        console.log('changeSelectAttempt', type);
        

        if (type === "prev") {
            setSelectedAttempt({
                value: (selectedAttempt.value - 1) < 0 ? 0 : selectedAttempt.value - 1,
                label: `Lần tạo ${(selectedAttempt.value - 1) < 0 ? 0 : selectedAttempt.value}`
            });
        } else {
            setSelectedAttempt({
                value: (selectedAttempt.value + 1) >= props.result.history.length ? props.result.history.length - 1 : selectedAttempt.value + 1,
                label: `Lần tạo ${(selectedAttempt.value + 1) >= props.result.history.length ? props.result.history.length - 1 : selectedAttempt.value + 1} (Bản cuối)`
            });
        }
    }

    // Dữ liệu cho biểu đồ tỉ lệ vượt qua test
    const getPassRateData = () => {
        if (!props.result || !props.result.history) return [];
        return props.result.history.map((attempt, index) => ({
            name: `Lần ${attempt.attempt}`,
            passRate: attempt.test_stats ? attempt.test_stats.pass_rate : 0
        }));
    };

    // Dữ liệu cho biểu đồ thời gian tạo code
    const getGenerationTimeData = () => {
        if (!props.result || !props.result.history) return [];
        return props.result.history.map((attempt, index) => ({
            name: `Lần ${attempt.attempt}`,
            time: attempt.generation_stats ? attempt.generation_stats.total_duration : 0
        }));
    };

    // Dữ liệu cho biểu đồ thống kê test
    const getTestResultsPieData = () => {
        if (!props.result || !props.result.history || !props.result.history[selectedAttempt.value] || !props.result.history[selectedAttempt.value].test_stats) {
            return [];
        }
        const stats = props.result.history[selectedAttempt.value].test_stats;
        return [
            { name: 'Thành công', value: stats.passed_tests },
            { name: 'Thất bại', value: stats.failed_tests }
        ];
    };

    // Dữ liệu cho biểu đồ độ phức tạp code
    const getCodeComplexityData = () => {
        if (!props.result || !props.result.history) return [];
        return props.result.history.map((attempt, index) => {
            const metrics = attempt.code_metrics || { complexity_score: 0, lines_of_code: 0 };
            return {
                name: `Lần ${attempt.attempt}`,
                complexity: metrics.complexity_score,
                lines: metrics.lines_of_code
            };
        });
    };

    if (!props.result || !props.result.stats) return <div>Chưa có thống kê. Vui lòng tạo code trước.</div>;

    return (
        <div className={cn("statistics-container")}>
            <div className={cn("stats-overview-container")}>
                <h2>Tổng quan thống kê</h2>

                <div className={cn("stats-cards")}>
                    <div className={cn("stats-card")}>
                        <h3>Tổng quan quy trình</h3>
                        <div className={cn("stats-info")}>
                            <div className={cn("stats-item")}>
                                <span className={cn("label")}>Số lần thử:</span>
                                <span className={cn("value")}>{props.result?.stats?.attempts}</span>
                            </div>
                            <div className={cn("stats-item")}>
                                <span className={cn("label")}>Tổng thời gian:</span>
                                <span className={cn("value")}>{props.result?.stats?.total_duration.toFixed(2)} giây</span>
                            </div>
                            <div className={cn("stats-item")}>
                                <span className={cn("label")}>Kết quả:</span>
                                <span className={cn("value", {"success": props.result?.stats?.success}, {"failure": !props.result?.stats?.success})}> 
                                    {props.result?.stats?.success ? 'Thành công' : 'Thất bại'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={cn("stats-card")}>
                        <h3>Chuẩn hóa yêu cầu</h3>
                        <div className={cn("stats-info")}>
                            <div className={cn("stats-item")}>
                                <span className={cn("label")}>Trạng thái:</span> 
                                <span className={cn("value", {"success": props.result?.stats?.normalization?.success}, {"failure": !props.result?.stats?.normalization?.success})}>
                                    {props.result?.stats?.normalization?.success ? 'Thành công' : 'Thất bại'}
                                </span>
                            </div>
                            <div className={cn("stats-item")}>
                                <span className={cn("label")}>Thời gian:</span>
                                <span className={cn("value")}>{props.result?.stats?.normalization?.total_duration.toFixed(2)} giây</span>
                            </div>
                            <div className={cn("stats-item")}>
                                <span className={cn("label")}>Số token:</span>
                                <span className={cn("value")}>{props.result?.stats?.normalization?.tokens_used || 0}</span>
                            </div>
                        </div>
                    </div>

                    {props.result?.stats?.improvement_metrics && (
                        <div className={cn("stats-card")}>
                            <h3>Cải thiện</h3>
                            <div className={cn("stats-info")}>
                                <div className={cn("stats-item")}>
                                    <span className={cn("label")}>Cải thiện tỉ lệ pass:</span>
                                    <span className={cn("value")}>{props.result?.stats?.improvement_metrics.pass_rate_improvement.toFixed(2)}%</span>
                                </div>
                                <div className={cn("stats-item")}>
                                    <span className={cn("label")}>Cải thiện chất lượng code:</span>
                                    <span className={cn("value")}>{props.result?.stats?.improvement_metrics.code_quality_improvement.toFixed(2)}%</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={cn("charts-grid")}>
                <div className={cn("chart-container")}>
                    <div className={cn('chart-container_head')}>
                        <h3>Tỉ lệ vượt qua test theo thời gian</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={getPassRateData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                            <Legend />
                            <Line type="monotone" dataKey="passRate" stroke="#8884d8" name="Tỉ lệ thành công (%)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={cn("chart-container")}>
                    <div className={cn('chart-container_head')}>
                        <h3>Thời gian tạo code</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getGenerationTimeData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${value.toFixed(2)} giây`} />
                            <Legend />
                            <Bar dataKey="time" fill="#82ca9d" name="Thời gian (giây)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={cn("chart-container")}>
                    <div className={cn('chart-container_head')}>
                        <button onClick={changeSelectAttempt("prev")} disabled={selectedAttempt.value === 0}>
                            <img src={arrowLeft} alt="arrow-left" />
                        </button>
                        <h3>Kết quả test Lần {props.result.history[selectedAttempt.value]?.attempt}</h3>
                        <button onClick={changeSelectAttempt("next")} disabled={selectedAttempt.value === props.result.history.length - 1}>
                            <img src={arrowRight} alt="arrow-right" />
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={300} >
                        <PieChart>
                            <Pie
                                animationDuration={500}
                                data={getTestResultsPieData()}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {getTestResultsPieData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} test`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className={cn("chart-container")}> 
                    <div className={cn('chart-container_head')}>
                        <h3>Độ phức tạp của code</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getCodeComplexityData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" orientation="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Bar yAxisId="left" dataKey="complexity" fill="#8884d8" name="Độ phức tạp" />
                            <Bar yAxisId="right" dataKey="lines" fill="#82ca9d" name="Số dòng code" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className={cn("process-timeline-container")}>
                <h3>Dòng thời gian xử lý</h3>

                <div className={cn("timeline")}>
                    <div className={cn("timeline-item")}>
                        <div className={cn("timeline-marker","success")}></div>
                        <div className={cn("timeline-content")}>
                            <h4>Bắt đầu quy trình</h4>
                            <p>Thời gian: {new Date(props.result?.stats.start_time * 1000).toLocaleTimeString()}</p>
                        </div>
                    </div>

                    <div className={cn("timeline-item")}>
                        <div className={cn("timeline-marker",  {'success': props.result?.stats.normalization?.success}, {'failure': !props.result?.stats.normalization?.success} )}></div>
                        <div className={cn("timeline-content")}>
                            <h4>Chuẩn hóa yêu cầu</h4>
                            <p>Trạng thái: {props.result?.stats.normalization?.success ? 'Thành công' : 'Thất bại'}</p>
                            <p>Thời gian: {props.result?.stats.normalization?.total_duration.toFixed(2)} giây</p>
                            <p>Số lần thử: {props.result?.stats.normalization?.attempts}</p>
                        </div>
                    </div>

                    {props.result?.history.map((attempt, index) => (
                        <div className={cn("timeline-item")} key={index}>
                            <div className={cn("timeline-marker",  {'success': attempt.error == null}, {'failure': attempt.error != null} )}></div>
                            <div className={cn("timeline-content")}>
                                <h4>Lần thử {attempt.attempt}</h4>
                                <p>Trạng thái: {attempt.error ? 'Thất bại' : 'Thành công'}</p>
                                <p>Thời gian tạo code: {attempt.generation_stats?.total_duration.toFixed(2)} giây</p>
                                {attempt.test_stats && (
                                    <>
                                        <p>Tỉ lệ vượt qua test: {attempt.test_stats.pass_rate.toFixed(2)}%</p>
                                        <p>Số test thành công: {attempt.test_stats.passed_tests}</p>
                                        <p>Số test thất bại: {attempt.test_stats.failed_tests}</p>
                                    </>
                                )}
                                {attempt.code_metrics && (
                                    <p>Độ phức tạp code: {attempt.code_metrics.complexity_score},
                                        Số dòng: {attempt.code_metrics.lines_of_code}</p>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className={cn("timeline-item")}>
                        <div className={cn("timeline-marker",  {'success': props.result?.stats.success}, {'failure': !props.result?.stats.success} )}></div>
                        <div className={cn("timeline-content")}>
                            <h4>Kết thúc quy trình</h4>
                            <p>Thời gian: {new Date(props.result?.stats.end_time * 1000).toLocaleTimeString()}</p>
                            <p>Tổng thời gian: {props.result?.stats.total_duration.toFixed(2)} giây</p>
                            <p>Kết quả: {props.result?.stats.success ? 'Thành công' : 'Thất bại'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;