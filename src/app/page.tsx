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
import { validateEmail, validateFirstName, validateLastName, validatePhoneNumber, validationSchema } from "./validation-schema";
import { PersonalDetailsForm } from "@/components/form/personal-details-form/personal-details-form";
import { paymentDetailsFormFields, personalDetailsFormValues, reviewFormFields, shippingAddressFormFields } from "@/models/form-field-model";
import { ShippingAddressForm } from "@/components/form/shipping-address-form/shipping-address-form";
import { PaymentDetailsForm } from "@/components/form/payment-details-form/payment-details-form";
import { ReviewForm } from "@/components/form/review-form/review-form";

export interface ParentFormProps {
  formik?: FormikProps<FormikValues>,
}

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
  cardType: "",
  cardNumber: "",
  expireMonthDate: 0,
  expireMonthYear: 0,
  cvv: "",
  termsAndConditions: false,
};

const baseSteps = [
  {
    title: "persona-details-form",
    component: PersonalDetailsForm,
    fields: personalDetailsFormValues,
    initialValues: PersonalDetailsForm.initialValues,
  },
  {
    title: "shipping-address-form",
    component: ShippingAddressForm,
    fields: shippingAddressFormFields,
  },
  {
    title: "payment-details-form",
    component: PaymentDetailsForm,
    fields: paymentDetailsFormFields,
  },
  {
    title: "review-form",
    component: ReviewForm,
    fields: reviewFormFields,
    initialValues: ReviewForm.initialValues,
  },

];

export default function CheckoutPage() {
  const steps = [...baseSteps];
  const [activeStep, setActiveStep] = useState(0);
  const CurrentStep = steps[activeStep];

  const initialValues = steps.reduce((values, { initialValues: initValues }) => ({
    ...values,
    ...initValues,
  }), {});

  console.log("Form Inital Values", initialValues);
  const isLastStep = useMemo(() => {
    return activeStep === steps.length - 1;
  }, [activeStep]);

  const handleNext = async (formik: FormikProps<FormikValues>) => {
    const formFields = steps[activeStep].fields;
    const errors: Array<{ key: string; error: any }> = [];
    for (const [key, value] of Object.entries(formFields)) {
      const result = await formik.validateField(key);
      if (result !== undefined) {

        errors.push({ key, error: result });
        formik.getFieldHelpers(key).setTouched(true, false);
      }
    }
    if (errors.length === 0) {
      setActiveStep((prevActiveStep) => ++prevActiveStep);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const submitForm = async (values: FormikValues) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values)
    alert(JSON.stringify(values, null, 2));
  };

  const handleSubmit = async (formik: FormikProps<FormikValues>) => {

    // validate the current step
    const formFields = steps[activeStep].fields;
    const errors: Array<{ key: string; error: any }> = [];
    for (const [key, value] of Object.entries(formFields)) {
      const result = await formik.validateField(key);
      if (result !== undefined) {

        errors.push({ key, error: result });
        formik.getFieldHelpers(key).setTouched(true, false);
      }
    }

    if (errors.length === 0) {
      submitForm(formik.values);
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
              onSubmit={() => { }}
              validateOnMount={true}
            >
              {(formik) => (
                <Form>
                  <CurrentStep.component />

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
                    <RenderIf isTrue={!isLastStep}>
                      <AppButton
                        type="button"
                        ariaLabel="Next button"
                        variation={AppButtonVariation.primaryDefault}
                        onClick={() => { handleNext(formik) }}
                      >
                        Next
                      </AppButton>
                    </RenderIf>
                    <RenderIf isTrue={isLastStep}>
                      <AppButton
                        disabled={!formik.isValid}
                        type="button"
                        ariaLabel="Submit button"
                        variation={AppButtonVariation.primaryDefault}
                        onClick={() => { handleSubmit(formik) }}
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



// interface FormContentProps extends ParentFormProps {
//   step: number;
// }
// function FormContent(props: FormContentProps) {
//   const { step } = props;

//   switch (step) {
//     case 0:
//       return <PersonalDetailsForm />;
//     case 1:
//       return <ShippingAddressForm />;
//     case 2:
//       return <PaymentMethodForm />;
//     case 4:
//       return <ReviewForm />;
//     default:
//       return null;;
//   }

// }


