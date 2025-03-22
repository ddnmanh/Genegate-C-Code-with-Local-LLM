
import React from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import style from './Introduction.module.scss';
const cn = classNames.bind(style);

function Introduction() {

    const navigate = useNavigate();


    return (
        <div className={cn('container')}>
            <div className={cn('content')}>
                <h3 className={cn('subheading')}>Hello guys!</h3>
                <h1 className={cn('heading')}>Generate Code</h1>
                <p className={cn('description')}>Help your work with AI, relax.</p>
                <button className={cn('button')} 
                    onClick={() => navigate('/generate')}
                >
                    Get Started <span>&rarr;</span>
                </button>
            </div>
        </div>
    );
}

export default Introduction;
