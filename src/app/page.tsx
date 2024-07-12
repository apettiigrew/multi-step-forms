"use client";
import { StepLabel } from "@/components/form/step-label/step-label";
import { FourCirleIcon, OneCirleIcon, ThreeCirleIcon, TwoCirleIcon } from "@/components/shared/icons/icons";
import { AppCheckbox } from "@/components/shared/layout/app-checkbox";
import { AppSelect } from "@/components/shared/layout/app-select";
import { AppButton, AppButtonVariation } from "@/components/shared/layout/buttons";
import { InputField } from "@/components/shared/layout/input-field";
import { SubHeading } from "@/components/text/subheading";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import { useMemo, useState } from "react";
import * as Yup from "yup";
import styles from "./page.module.scss";
import { RenderIf } from "./utils/render-if";

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  country: string;
  state: string;
  postalCode: string;
  shippingMethod: string;
  // cardType: string;
  // cardNumber: string;
  // expireMonthDate: number;
  // expireMonthYear: number;
  // cvv: string;
  // termsAndConditions: boolean;
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  streetAddress: "",
  country: "",
  state: "",
  postalCode: "",
  shippingMethod: "",
  // cardType: "",
  // cardNumber: "",
  // expireMonthDate: 0,
  // expireMonthYear: 0,
  // cvv: "",
  // termsAndConditions: false,
};

export default function CheckoutPage() {
  const steps = [PersonalDetailsForm, ShippingAddressForm, PaymentMethodForm, ReviewForm];
  const [activeStep, setActiveStep] = useState(0);
  const CurrentStep = steps[activeStep];
  const { validationSchema } = CurrentStep;

  const initialValues = steps.reduce((values, { initialValues: initValues }) => ({
    ...values,
    ...initValues,
  }), {});

  const isLastStep = () => activeStep === steps.length - 1;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const submitForm = async (values: FormikValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(JSON.stringify(values, null, 2));
  };

  const handleSubmit = async (values: FormikValues) => {
    if (!isLastStep()) {
      handleNext();
    } else {
      submitForm(values)
    }
  };

  const isBackButtonVisible = useMemo(() => activeStep > 0, [activeStep]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles["left-content"]}>
            <div className={styles["left-content-headings"]}>
              <SubHeading>Step 1</SubHeading>
              <p>Enter your personal information to continue to checkout.</p>
            </div>
            <div className={styles["step-label-container"]}>
              <StepLabel
                icon={<OneCirleIcon className={styles.icon} />}
                label={"Personal Details"}
              />
              <StepLabel
                icon={<TwoCirleIcon className={styles.icon} />}
                label={"Shipping Address"}
              />

              <StepLabel
                icon={<ThreeCirleIcon className={styles.icon} />}
                label={"Payment Method"}
              />
              <StepLabel
                icon={<FourCirleIcon className={styles.icon} />}
                label={"Review"}
              />

            </div>
          </div>
          <div className={styles["right-content"]}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form>
                  <CurrentStep />

                  <div className={styles["button-wrapper"]}>
                    <RenderIf isTrue={isBackButtonVisible}>
                      <AppButton
                        type="button"
                        ariaLabel="Next button"
                        variation={AppButtonVariation.whiteDefault}
                        onClick={handleBack}
                      >
                        Back
                      </AppButton>
                    </RenderIf>
                    <RenderIf isTrue={activeStep < 4}>
                      <AppButton
                        type="submit"
                        ariaLabel="Next button"
                        variation={AppButtonVariation.primaryDefault}
                      // onClick={handleNext}
                      >
                        Next
                      </AppButton>
                    </RenderIf>
                    <RenderIf isTrue={activeStep === 4}>
                      <AppButton
                        disabled={!formik.isValid}
                        type="submit"
                        ariaLabel="Next button"
                        variation={AppButtonVariation.primaryDefault}
                      >
                        Submit
                      </AppButton>
                    </RenderIf>
                  </div>
                </Form>

              )}
            </Formik>
          </div>
        </div>
      </div>
    </main >
  );
}

interface ParentFormProps {
  formik?: FormikProps<FormikValues>,
}
interface FormContentProps extends ParentFormProps {
  step: number;
}
function FormContent(props: FormContentProps) {
  const { step } = props;

  switch (step) {
    case 0:
      return <PersonalDetailsForm />;
    case 1:
      return <ShippingAddressForm />;
    case 2:
      return <PaymentMethodForm />;
    case 4:
      return <ReviewForm />;
    default:
      return null;;
  }

}

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

function PersonalDetailsForm(props: PersonalDetailsFormProps) {
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
          />
          <InputField
            type="text"
            name="lastName"
            label="Last Name"
            required={true}
          />
          <InputField
            type="text"
            name="email"
            label="Email Address"
            required={true}
          />

          <InputField
            type="text"
            name="phoneNumber"
            label="Phone Number"
            required={false}
          />
        </div>
      </div>
    </>
  )
}

interface ShippingAddressFormProps extends ParentFormProps { }
function ShippingAddressForm(props: ShippingAddressFormProps) {

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]

  const countryOptions = [
    { label: "Nigeria", value: "nigeria" },
    { label: "India", value: "india" },
    { label: "United States of America", value: "usa" },
    { label: "Japan", value: "japan" },
    { label: "Ghana", value: "ghana" },
    { label: "Ivory Coast", value: "ivorycoast" },
    { label: "England", value: "england" },
  ];

  const shippingMethodOptions = [
    { value: 'standard', label: 'Standard Shipping' },
    { value: 'express', label: 'Express Shipping' },
    { value: 'overnight', label: 'Overnight Shipping' },
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
        />

        <AppSelect
          label="Country"
          name="country"
          required={true}
          options={countryOptions}
          placeholder="Click to select a country"
        />

        <InputField
          type="text"
          name="state"
          label="State/Province"
          required={true}
        />

        <div className={styles["input-group"]}>
          <InputField
            type="text"
            name="postalCode"
            label="ZIP / Postal Code"
            required={true}
          />

          <AppSelect
            label="Shipping Method"
            name="shippingMethod"
            required={true}
            options={shippingMethodOptions}
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
  postalCode: "",
  shippingMethod: "",
}

ShippingAddressForm.validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Please enter a street address").min(2, "Must be at least 2 characters").max(100, 'Must be 100 characters or less'),
  country: Yup.string().required("Please select a country"),
  state: Yup.string().required("Please select a state"),
  postalCode: Yup.string().required("Please enter a postal code"),
  shippingMethod: Yup.string().required("Please select shipping method"),
});

interface PaymentMethodFormProps extends ParentFormProps { }
function PaymentMethodForm(props: PaymentMethodFormProps) {

  const cardTypesOptions = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'MasterCard' },
    { value: 'amex', label: 'American Express' },
    { value: 'discover', label: 'Discover' },
  ];

  const cardExpirationMonths = [
    { value: "1", label: 'January' },
    { value: "2", label: 'February' },
    { value: "3", label: 'March' },
    { value: "4", label: 'April' },
    { value: "5", label: 'May' },
    { value: "6", label: 'June' },
    { value: "7", label: 'July' },
    { value: "8", label: 'August' },
    { value: "9", label: 'September' },
    { value: "10", label: 'October' },
    { value: "11", label: 'November' },
    { value: "12", label: 'December' },
  ];

  const currentYear = new Date().getFullYear();
  const cardExpirationYears = Array.from({ length: 10 }, (_, i) => ({
    value: `${currentYear + i}`,
    label: `${currentYear + i}`,
  }));

  return (
    <>

      <div className={styles["right-content-headings"]}>
        <SubHeading>Payment Method</SubHeading>
        <p>Select the payment method.</p>
      </div>
      <div className={styles["form-content"]}>
        <AppSelect
          label="Card Type"
          name="cardType"
          required={true}
          options={cardTypesOptions}
          placeholder="Click to select card type"
        />

        <InputField
          type="text"
          name="cardNumber"
          label="Card Number"
          required={true}
        />

        <div className={styles["input-group"]}>
          <AppSelect
            label="Expiration Date"
            name="expirationDate.month"
            required={true}
            options={cardExpirationMonths}
            placeholder="Month"
          />

          <AppSelect
            name="expirationDate.year"
            required={true}
            options={cardExpirationYears}
            placeholder="Year"
          />
        </div>

        <InputField
          type="text"
          name="cvv"
          label="CVV Number"
          required={true}
        />
      </div>

    </>
  )
}

PaymentMethodForm.initialValues = {
  cardType: "",
  cardNumber: "",
  expireMonthDate: 0,
  expireMonthYear: 0,
  cvv: "",
}

PaymentMethodForm.validationSchema = Yup.object().shape({
  cardType: Yup.string().required("Please select a card type"),
  cardNumber: Yup.number()
    .typeError("Please enter a valid card number")
    .required("Please select a card number"),
  expirationDate: Yup.object().shape({
    month: Yup.string().required("Please select a month"),
    year: Yup.string().required("Please select a year"),
  }),
  cvv: Yup.number()
    .typeError("Please enter only digits")
    .required("Please enter your CVV Number"),
});

interface ReviewFormProps extends ParentFormProps {

}
function ReviewForm(props: ReviewFormProps) {

  return (
    <>

      <div className={styles["right-content-headings"]}>
        <SubHeading>Review</SubHeading>
        <p className={styles["heading-text"]}>
          Review the information to be sure they are accurate and if all is
          good click the checkbox below and click the button to checkout.
        </p>
      </div>


      <div className={styles["form-content"]}>
        <AppCheckbox
          label="I agree to the terms and conditions"
          checked={false}
          onChange={(checked) => console.log(checked)}
        />
      </div>
    </>
  );
}

ReviewForm.initialValues = {
  termsAndConditions: false,
}
ReviewForm.validationSchema = Yup.object().shape({
  agreement: Yup.boolean().oneOf(
    [true],
    "You must agree to this to continue"
  ),
});