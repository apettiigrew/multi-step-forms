import { ParentFormProps } from "@/app/page";
import { validateCountry, validatePostalCode, validateShippingAddress, validateShippingMethod, validateState } from "@/app/validation-schema";
import { AppSelect } from "@/components/shared/layout/app-select";
import { InputField } from "@/components/shared/layout/input-field";
import { SubHeading } from "@/components/text/subheading";
import * as Yup from "yup";
import styles from "./shipping-address-form.module.scss";

interface ShippingAddressFormProps extends ParentFormProps { }
export function ShippingAddressForm(props: ShippingAddressFormProps) {
    const countryOptions = [
        { label: "Jamaica", value: "JAM" },
        { label: "Canada", value: "CAN" },
        { label: "Nigeria", value: "NIG" },
        { label: "India", value: "IND" },
        { label: "United States of America", value: "USA" },
        { label: "Japan", value: "JAP" },
        { label: "Ghana", value: "GHA" },
        { label: "Ivory Coast", value: "ICT" },
        { label: "England", value: "ENG" },
    ];

    const shippingMethodOptions = [
        { label: 'Standard Shipping', value: 'standard' },
        { label: 'Express Shipping', value: 'express' },
        { label: 'Overnight Shipping', value: 'overnight' },
    ];
    
    return (
        <>
            <div className={styles["right-content-headings"]}>
                <SubHeading>Shipping Address</SubHeading>
                <p>Enter the address you want your order to be shipped to</p>
            </div>

            <div className={styles["form-content"]}>
                <InputField
                    type="text"
                    name="streetAddress"
                    label="Street Address"
                    required={true}
                    validate={validateShippingAddress}
                />

                <AppSelect
                    label="Country"
                    name="country"
                    required={true}
                    options={countryOptions}
                    validate={validateCountry}
                    placeholder="Click to select a country"
                />

                <InputField
                    type="text"
                    name="state"
                    label="State/Province"
                    required={true}
                    validate={validateState}
                />

                <div className={styles["input-group"]}>
                    <InputField
                        type="text"
                        name="postalCode"
                        label="ZIP / Postal Code"
                        required={true}
                        validate={validatePostalCode}
                    />

                    <AppSelect
                        label="Shipping Method"
                        name="shippingMethod"
                        required={true}
                        options={shippingMethodOptions}
                        validate={validateShippingMethod}
                        placeholder="Click to select"
                    />
                </div>
            </div>
        </>
    )
}

ShippingAddressForm.initialValues = {
    streetAddress: "",
    country: "",
    state: "",
    // postalCode: "",
    // shippingMethod: "",
}

ShippingAddressForm.validationSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Please enter a street address").min(2, "Must be at least 2 characters").max(100, 'Must be 100 characters or less'),
    country: Yup.string().required("Please select a country"),
    state: Yup.string().required("Please select a state"),
    // postalCode: Yup.string().required("Please enter a postal code"),
    // shippingMethod: Yup.string().required("Please select shipping method"),
});