// components/LoadingSpinner.jsx
import React from 'react';

import classNames from 'classnames/bind';
import style from './LoadingSpinner.module.scss';
const cn = classNames.bind(style);

const LoadingSpinner = () => {
    return (
        <div className={cn("loading-overlay")}>
            <div className={cn("spinner")}></div>
            <p>Đang tạo code, vui lòng đợi...</p>
        </div>
    );
};

export default LoadingSpinner;