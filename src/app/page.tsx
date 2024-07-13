"use client";
import { PaymentDetailsForm, PaymentDetailsFormHeading } from "@/components/form/payment-details-form/payment-details-form";
import { PersonalDetailsForm, PersonalDetailsFormHeading } from "@/components/form/personal-details-form/personal-details-form";
import { ReviewForm, ReviewFormHeading } from "@/components/form/review-form/review-form";
import { ShippingAddressForm, ShippingDetailsFormHeading } from "@/components/form/shipping-address-form/shipping-address-form";
import { StepLabel } from "@/components/form/step-label/step-label";
import { FourCirleIcon, FourCirleIconDark, OneCirleIcon, OneCirleIconDark, ThreeCirleIcon, ThreeCirleIconDark, TwoCirleIcon, TwoCirleIconDark } from "@/components/shared/icons/icons";
import { AppButton, AppButtonVariation } from "@/components/shared/layout/buttons";
import { SubHeading } from "@/components/text/subheading";
import { AppConfetti } from "@/hooks/use-confetti";
import { paymentDetailsFormFields, personalDetailsFormValues, reviewFormFields, shippingAddressFormFields } from "@/models/form-field-model";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import { useMemo, useState } from "react";
import styles from "./page.module.scss";
import { RenderIf } from "./utils/render-if";

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
    heading: PersonalDetailsFormHeading
  },
  {
    title: "shipping-address-form",
    component: ShippingAddressForm,
    fields: shippingAddressFormFields,
    heading: ShippingDetailsFormHeading
  },
  {
    title: "payment-details-form",
    component: PaymentDetailsForm,
    fields: paymentDetailsFormFields,
    heading: PaymentDetailsFormHeading
  },
  {
    title: "review-form",
    component: ReviewForm,
    fields: reviewFormFields,
    initialValues: ReviewForm.initialValues,
    heading: ReviewFormHeading
  },
];

export enum FormState {
  idle,
  sending,
  success,
  error,
}

export default function CheckoutPage() {
  const steps = [...baseSteps];
  const [activeStep, setActiveStep] = useState(0);
  const [formState, setFormState] = useState(FormState.idle);
  const [isExploding, setIsExploding] = useState(false);
  const CurrentStep = steps[activeStep];

  const initialValues = steps.reduce((values, { initialValues: initValues }) => ({
    ...values,
    ...initValues,
  }), {});
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
    setFormState(FormState.success);
    setIsExploding(true);
    // setIsExploding(true) after 5 seconds
    setTimeout(() => {
      setIsExploding(false);
    }, 5000);

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
  const oneIcon = (activeStep === 0 || activeStep > 0) ? <OneCirleIconDark className={styles.icon} /> : <OneCirleIcon className={styles.icon} />;
  const twoIcon = activeStep > 0 ? <TwoCirleIconDark className={styles.icon} /> : <TwoCirleIcon className={styles.icon} />;
  const threeIcon = activeStep > 1 ? <ThreeCirleIconDark className={styles.icon} /> : <ThreeCirleIcon className={styles.icon} />;
  const fourIcon = activeStep > 2 ? <FourCirleIconDark className={styles.icon} /> : <FourCirleIcon className={styles.icon} />;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles["left-content"]}>
            <div className={styles["left-content-headings"]}>
              <CurrentStep.heading />
            </div>
            <div className={styles["step-label-container"]}>
              <StepLabel
                icon={oneIcon}
                label={"Personal Details"}
              />
              <StepLabel
                icon={twoIcon}
                label={"Shipping Address"}
              />

              <StepLabel
                icon={threeIcon}
                label={"Payment Method"}
              />
              <StepLabel
                icon={fourIcon}
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

      {/* Display Confetti when done */}
      {(formState === FormState.success) && <AppConfetti />}
      {/* {(formState === FormState.success && isExploding) && <AppConfetti />} */}
    </main >
  );
}


function StepLabelControl() {
  return (
    <>
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
    </>
  )
}