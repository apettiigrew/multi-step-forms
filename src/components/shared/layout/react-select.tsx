import Select from "react-select";
import { SelectOption } from "./input-field";
import { Field, FormikProps, FormikValues, useField } from "formik";
import styles from "./react-select.module.scss";

interface SelectDropdownProps {
    name: string;
    label: string;
    options: SelectOption[];
    [key: string]: any;
}
export const SelectDropdown = (props: SelectDropdownProps) => {
    const { name, label, options, ...restOfProps } = props
    const [field, meta, helpers] = useField(name);
    return (
        <div className="form-control">
            <label htmlFor={name}>{label}</label>
            <Field
                name={name}
                {...restOfProps}
                options={options}
                component={SelectField}
            />
            {meta.error && meta.touched && (
                <small className={styles["error-text"]}>{meta.error}</small>
            )}
        </div>
    );
};


interface SelectFieldProps {
    options: SelectOption[];
    form: FormikProps<FormikValues>;
    field: any;
}
function SelectField(props: SelectFieldProps) {
    const { options, form, field } = props;
    return (
        <Select
            value={options ? options.find((option) => option.value === field.value) : ""}
            options={options}
            onChange={(selectedOption: SelectOption) => {
                form.setFieldValue(field.name, selectedOption.value);
            }}
        />
    );
};
