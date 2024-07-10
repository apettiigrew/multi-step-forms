import { SubHeading } from "@/components/text/subheading";
import styles from "./page.module.scss";
import { StepLabel } from "@/components/form/step-label/step-label";
import { FourCirleIcon, OneCirleIcon, ThreeCirleIcon, TwoCirleIcon } from "@/components/shared/icons/icons";
import { InputField } from "@/components/form/input-elements/input-field";


export default function CheckoutPage() {
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
          </div>
        </div>
      </div>
    </main>
  );
}