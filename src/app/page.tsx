"use client";
import { StepLabel } from "@/components/form/step-label/step-label";
import { FourCirleIcon, OneCirleIcon, ThreeCirleIcon, TwoCirleIcon } from "@/components/shared/icons/icons";
import { AppSelect } from "@/components/shared/layout/app-select";
import { AppButton, AppButtonVariation } from "@/components/shared/layout/buttons";
import { SubHeading } from "@/components/text/subheading";
import { useCallback } from "react";
import styles from "./page.module.scss";
import { SelectOption, InputField } from "@/components/shared/layout/input-field";
import { AppCheckbox } from "@/components/shared/layout/app-checkbox";

export default function CheckoutPage() {

  const options: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const handleSelectChange = useCallback((selectedOption: SelectOption) => {
    "use client";
    console.log(selectedOption);
  }, []);

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
            <div className={styles["right-content-headings"]}>
              <SubHeading>Review</SubHeading>
              <p className={styles["heading-text"]}>
                Review the information to be sure they are accurate and if all is
                good click the checkbox below and click the button to checkout.
              </p>
            </div>

            <div>
              <div className={styles["form-content"]}>
                <AppCheckbox
                  label="I agree to the terms and conditions"
                  checked={false}
                  onChange={(checked) => console.log(checked)}
                />
              </div>
            </div>

            <div className={styles["button-wrapper"]}>
              <AppButton
                ariaLabel="Next button"
                variation={AppButtonVariation.whiteDefault}>
                Back
              </AppButton>
              <AppButton
                ariaLabel="Next button"
                variation={AppButtonVariation.primaryDefault}>
                Next
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


{/* <div className={styles["right-content"]}>
<div className={styles["right-content-headings"]}>
  <SubHeading>Payment Method</SubHeading>
  <p>Select the payment method.</p>
</div>

<div>
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
</div>

<div className={styles["button-wrapper"]}>
  <AppButton
    ariaLabel="Next button"
    variation={AppButtonVariation.whiteDefault}>
    Back
  </AppButton>
  <AppButton
    ariaLabel="Next button"
    variation={AppButtonVariation.primaryDefault}>
    Next
  </AppButton>
</div>
</div> */}

{/* <div className={styles["right-content"]}>
<div className={styles["right-content-headings"]}>
  <SubHeading>Shipping Address</SubHeading>
  <p>Enter the address you want your order to be shipped to</p>
</div>

<div>
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

    <div className={styles["shipping-group"]}>
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
</div>

<div className={styles["button-wrapper"]}>
  <AppButton
    ariaLabel="Next button"
    variation={AppButtonVariation.whiteDefault}>
    Back
  </AppButton>
  <AppButton
    ariaLabel="Next button"
    variation={AppButtonVariation.primaryDefault}>
    Next
  </AppButton>
</div>
</div> */}


// <div className={styles["right-content-headings"]}>
// <SubHeading>Personal Details</SubHeading>
// <p>Enter your perosnal information to continue to checkout.</p>
// </div>

// <div>
// <div className={styles["form-content"]}>
//   <InputField
//     name="firstName"
//     label="First Name"
//     required={true}
//   />
//   <InputField
//     name="lastName"
//     label="Last Name"
//     required={true}
//   />
//   <InputField
//     name="email"
//     label="Email Address"
//     required={true}
//   />

//   <InputField
//     name="phoneNumber"
//     label="Phone Number"
//     required={true}
//   />
// </div>
// </div>