import React, { useState, useEffect, useRef } from 'react';
import arrowDown from '../../assets/icons/angle-down-solid.svg';
import arrowUp from '../../assets/icons/angle-up-solid.svg';

import classNames from 'classnames/bind';
import style from './Dropdown.module.scss'
const cn = classNames.bind(style)

const Dropdown = ({ options, defaultValue, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultValue ? defaultValue : options[0]);
    const dropdownRef = useRef(null);

    // Xử lý click bên ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Thêm event listener khi dropdown mở
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option);
        }
    };

    return (
        <div className={cn("dropdown-container")} ref={dropdownRef}>
            {label && <label className={cn("dropdown-label")}>{label}</label>}
            <div className={cn("dropdown")}>
                <div className={cn("dropdown-header")} onClick={handleToggle}>
                    {selectedOption.label || 'Select an option'}
                    <span className={cn('dropdown-arrow', { 'open': isOpen })}>
                        {
                            isOpen
                                ? <img src={arrowUp} alt="arrow-up" />
                                : <img src={arrowDown} alt="arrow-down" />
                        }
                    </span>
                </div>
                {isOpen && (
                    <ul className={cn("dropdown-menu")}>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={cn("dropdown-item")}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dropdown;