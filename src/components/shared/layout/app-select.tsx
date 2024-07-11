"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from "./app-select.module.scss";
interface Option {
    value: string;
    label: string;
}

interface AppSelectProps {
    label?: string;
    name: string;
    required: boolean;
    options: Option[];
    onChange: (selectedOption: Option) => void;
    placeholder?: string;
}

export function AppSelect(props: AppSelectProps) {
    const { label, required, name, options, onChange, placeholder } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    };

    const handleDocumentClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const labelText = useMemo(() => {
        if (!label) {
            "&N"
            return <small style={{ display: "hidden" }}>&nbsp;</small>;
        }

        return required ? `${label}*` : label;
    }, [label, required]);

    return (
        <div className={styles["custom-select"]} ref={dropdownRef}>
            <label htmlFor={name} className={styles.label}>
                {labelText}
            </label>
            <div className={styles["select-input"]} onClick={() => setIsOpen(!isOpen)}>
                {selectedOption ? selectedOption.label : placeholder || 'Select an option'}
            </div>
            {isOpen && (
                <div className={styles["select-dropdown"]}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={styles["select-option"]}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
};

