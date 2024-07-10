import { SubHeading } from "@/components/text/subheading";
import styles from "./page.module.scss";


export default function CheckoutFormPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles["left-content"]}>
            <SubHeading>Step 1</SubHeading>
            <p>Enter your personal information to continue to checkout.</p>
          </div>
          <div className={styles["right-content"]}></div>
        </div>
      </div>
    </main>
  );
}