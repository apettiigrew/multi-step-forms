"use client";
import { StepLabel } from "@/components/form/step-label/step-label";
import { FourCirleIcon, OneCirleIcon, ThreeCirleIcon, TwoCirleIcon } from "@/components/shared/icons/icons";
import { AppSelect } from "@/components/shared/layout/app-select";
import { AppButton, AppButtonVariation } from "@/components/shared/layout/buttons";
import { SubHeading } from "@/components/text/subheading";
import { useCallback, useMemo, useState } from "react";
import styles from "./page.module.scss";
import { SelectOption, InputField } from "@/components/shared/layout/input-field";
import { AppCheckbox } from "@/components/shared/layout/app-checkbox";
import { FormikProps, useFormik } from "formik";
import { RenderIf } from "./utils/render-if";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  streetAddress: string;
  country: string;
  state: string;
  postalCode: string;
  shippingMethod: string;
  cardType: string;
  cardNumber: string;
  expireMonthDate: number;
  expireMonthYear: number;
  cvv: string;
  termsAndConditions: boolean;
};

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      streetAddress: "",
      country: "",
      state: "",
      postalCode: "",
      shippingMethod: "",
      cardType: "",
      cardNumber: "",
      expireMonthDate: 0,
      expireMonthYear: 0,
      cvv: "",
      termsAndConditions: false,
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const nextStep = useCallback(() => setStep((prevStep) => prevStep + 1), []);
  const prevStep = useCallback(() => setStep((prevStep) => prevStep - 1), []);

  const isBackButtonVisible = useMemo(() => step > 1, [step]);
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
            <form onSubmit={formik.handleSubmit}>
              <FormContent step={step} formik={formik} />

              <div className={styles["button-wrapper"]}>

                <RenderIf isTrue={isBackButtonVisible}>
                  <AppButton
                    type="button"
                    ariaLabel="Next button"
                    variation={AppButtonVariation.whiteDefault}
                    onClick={prevStep}
                  >
                    Back
                  </AppButton>
                </RenderIf>
                <RenderIf isTrue={step < 4}>
                  <AppButton
                    type="button"
                    ariaLabel="Next button"
                    variation={AppButtonVariation.primaryDefault}
                    onClick={nextStep}
                  >
                    Next
                  </AppButton>
                </RenderIf>
                <RenderIf isTrue={step === 4}>
                  <AppButton
                    type="submit"
                    ariaLabel="Next button"
                    variation={AppButtonVariation.primaryDefault}
                  >
                    Submit
                  </AppButton>
                </RenderIf>
              </div>
            </form>

          </div>
        </div>
      </div>
    </main >
  );
}

interface ParentFormProps {
  formik: FormikProps<FormValues>;
}
interface FormContentProps extends ParentFormProps {
  step: number;
}
function FormContent(props: FormContentProps) {
  const { step, formik } = props;

  switch (step) {
    case 1:
      return <PersonalDetailsForm formik={formik} />;
    case 2:
      return <ShippingAddressForm formik={formik} />;
    case 3:
      return <PaymentMethodForm formik={formik} />;
    case 4:
      return <ReviewForm formik={formik} />;
    default:
      return null;;
  }

}

interface PersonalDetailsFormProps extends ParentFormProps {

}
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
            name="firstName"
            label="First Name"
            required={true}
          />
          <InputField
            name="lastName"
            label="Last Name"
            required={true}
          />
          <InputField
            name="email"
            label="Email Address"
            required={true}
          />

          <InputField
            name="phoneNumber"
            label="Phone Number"
            required={true}
          />
        </div>
      </div>
    </>
  )
}


interface ShippingAddressFormProps extends ParentFormProps {

}
function ShippingAddressForm(props: ShippingAddressFormProps) {


  const handleSelectChange = useCallback((selectedOption: SelectOption) => {
    console.log(selectedOption);
  }, []);

  const options: SelectOption[] = useMemo(() => {
    return [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];
  }, [])

  return (
    <>
      <div className={styles["right-content-headings"]}>
        <SubHeading>Shipping Address</SubHeading>
        <p>Enter the address you want your order to be shipped to</p>
      </div>

      <div className={styles["form-content"]}>
        <InputField
          name="streetAddress"
          label="Street Address"
          required={true}
        />

        <AppSelect
          label="Country"
          name="country"
          required={true}
          options={options}
          onChange={handleSelectChange}
          placeholder="Click to select a country"
        />

        <InputField
          name="state"
          label="State/Province"
          required={true}
        />

        <div className={styles["input-group"]}>
          <InputField
            name="zipCode"
            label="ZIP / Postal Code"
            required={true}
          />

          <AppSelect
            label="Shipping Method"
            name="shippingMethod"
            required={true}
            options={options}
            onChange={handleSelectChange}
            placeholder="Click to select"
          />
        </div>
      </div>
    </>
  )
}


interface PaymentMethodFormProps extends ParentFormProps {

}
function PaymentMethodForm(props: PaymentMethodFormProps) {
  const handleSelectChange = useCallback((selectedOption: SelectOption) => {
    console.log(selectedOption);
  }, []);

  const options: SelectOption[] = useMemo(() => {
    return [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];
  }, [])

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
          options={options}
          onChange={handleSelectChange}
          placeholder="Click to select card type"
        />

        <InputField
          name="cardNumber"
          label="Card Number"
          required={true}
        />

        <div className={styles["input-group"]}>
          <AppSelect
            label="Expiration Date"
            name="expireMonthDate"
            required={true}
            options={options}
            onChange={handleSelectChange}
            placeholder="Month"
          />

          <AppSelect
            name="expireMonthYear"
            required={true}
            options={options}
            onChange={handleSelectChange}
            placeholder="Year"
          />
        </div>

        <InputField
          name="cvv"
          label="CVV Number"
          required={true}
        />
      </div>

    </>
  )
}

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
