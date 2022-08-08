import React from "react";
import { Typography, Checkbox } from "@material-ui/core";
import styles from "../../../styles/Checkout.module.css";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import ReCaptchaV2 from "react-google-recaptcha";

const PaymentOptionsCard = ({
  paymentMode,
  setpaymentMode,
  setcaptchaChecked,
  cod,
}) => {
  const handleCaptcha = (value) => {
    setcaptchaChecked(true);
  };
  return (
    <div>
      <Typography variant="h6">Payment</Typography>
      <span style={{ color: "grey", fontSize: "0.9rem" }}>
        All transactions are secured and encrypted
      </span>
      <div className={styles.payment_card}>
        <div className={styles.payment_card_child_div}>
          <p>Pay with Credit, Debit, NetBanking, UPI</p>
          <Checkbox
            checked={!paymentMode}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleCheckedFilled />}
            onChange={() => setpaymentMode(false)}
          />
        </div>
        {paymentMode ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem 0",
            }}
          >
            <ReCaptchaV2
              sitekey="6LemAf8cAAAAACO_gvD60WOV2hhk_wVJPVxsEU6s"
              onChange={handleCaptcha}
            />
          </div>
        ) : (
          <div className={styles.payment_card_info}>
            <p>
              After clicking “Pay Securely”, you will be redirected to RazorPay
              to complete your purchase securely.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptionsCard;
