


import React from 'react';
import styles from "./app-checkbox.module.scss";

interface AppCheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function AppCheckbox(props: AppCheckboxProps) {
    const { label, checked, onChange } = props;
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <label className={styles.checkbox}>
            <input
                className={styles.input}
                type="checkbox"
                checked={checked}
                onChange={handleCheckboxChange}
            />
            <span className={styles["checkbox-label"]}>{label}</span>
        </label>
    );
};


