import { validateFirstName, validateLastName, validateEmail, validatePhoneNumber } from "@/app/validation-schema";
import { InputField } from "@/components/shared/layout/input-field";
import { SubHeading } from "@/components/text/subheading";
import styles from "./personal-details-form.module.scss"
import * as Yup from "yup";
import { ParentFormProps } from "@/app/page";

interface PersonalDetailsFormProps extends ParentFormProps {

}

PersonalDetailsForm.initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
}

PersonalDetailsForm.validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name").min(2, "Must be at least 2 characters").max(20, 'Must be 20 characters or less'),
    lastName: Yup.string().required("Please enter your last name").min(2, "Must be at least 2 characters").max(20, 'Must be 20 characters or less'),
    email: Yup.string().email().required("Please enter your email"),
    phoneNumber: Yup.string().matches(/^[0-9]{10}/, "Please enter a valid phone number"),
});

export function PersonalDetailsForm(props: PersonalDetailsFormProps) {
    const { formik } = props;
    return (
        <>
            <div className={styles["right-content-headings"]}>
                <SubHeading>Personal Details</SubHeading>
                <p>Enter your perosnal information to continue to checkout.</p>
            </div>

            <div>
                <div className={styles["form-content"]}>
                    <InputField
                        type="text"
                        name="firstName"
                        label="First Name"
                        required={true}
                        validate={validateFirstName}
                    />
                    <InputField
                        type="text"
                        name="lastName"
                        label="Last Name"
                        required={true}
                        validate={validateLastName}
                    />
                    <InputField
                        type="text"
                        name="email"
                        label="Email Address"
                        required={true}
                        validate={validateEmail}
                    />

                    <InputField
                        type="text"
                        name="phoneNumber"
                        label="Phone Number"
                        required={false}
                        validate={validatePhoneNumber}
                    />
                </div>
            </div>
        </>
    )
}

export function PersonalDetailsFormHeading() {
    return (
        <>
            <SubHeading>Step 1</SubHeading>
            <p>Enter your personal information to continue to checkout.</p>
        </>
    )
}