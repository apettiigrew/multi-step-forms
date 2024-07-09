import { ErrorMessage, Field, FieldAttributes } from "formik";
import React, { FC } from "react";
import CustomErrorMessage from "../error-message/custom-error-message";



// Define the prop types
interface InputFieldProps {
    name: string;
    label: string;
    [key: string]: any;
}

export function InputField(props: InputFieldProps) {
    const { name, label, ...restOfProps } = props;
    return (
        <div className="form-control">
            <label htmlFor={name}>{label}</label>
            <Field name={name} {...restOfProps} />
            <ErrorMessage name={name} component={CustomErrorMessage} />
        </div>
    );
};

