import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import request from "../../src/middlewares/axios/post";
import styles from "../../styles/Checkout.module.css";

// Redux Store imports
import { useDispatch, useSelector } from "react-redux";
import { SET_TOASTIFY } from "../../src/store/actionTypes/toastify";
import { setCartItems } from "../../src/store/actionCreators/cart";

//RazorPay Component
import razorpayWindow from "../../src/middlewares/razorpay/config";
import withAuth from "../../src/middlewares/Auth/protect_page";

//Material Ui imports
import { Button, Container } from "@material-ui/core";
import HttpsRoundedIcon from "@material-ui/icons/HttpsRounded";

//Page Components
import CheckoutSteps from "../../src/components/checkout/CheckoutSteps";
import OrderSummarySm from "../../src/components/checkout/OrderSummarySm";
import OrderSummary from "../../src/components/checkout/OrderSummary";
import ContactInfoCard from "../../src/components/checkout/ContactInfoCard";
import PaymentOptionsCard from "../../src/components/checkout/PaymentOptionsCard";
import CircularIndeterminate from "../../src/components/common/spinner/Spinner";
import ButtonSpinner from "../../src/components/common/spinner/ButtonSpinner";

const useRedux = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const checkout = useSelector((state) => state.checkoutProductReducer);
  const error = useSelector((state) => state.checkoutProductReducer.error);
  const billingAddress = useSelector(
    (state) => state.checkoutProductReducer.billingAddress
  );
  const shippingAddress = useSelector(
    (state) => state.checkoutProductReducer.shippingAddress
  );
  const email = useSelector((state) => state.userReducer.email);

  const setToastify = (msg, type) => {
    dispatch({
      type: SET_TOASTIFY,
      payload: {
        msg: msg,
        type: type,
        open: true,
      },
    });
  };
  return {
    token,
    error,
    checkout,
    shippingAddress,
    billingAddress,
    email,
    setToastify,
  };
};

const Payment = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const [captchaChecked, setcaptchaChecked] = useState(false);
  const [paymentButtonClicked, setpaymentButtonClicked] = useState(false);

  const {
    token,
    error,
    checkout,
    shippingAddress,
    billingAddress,
    setToastify,
    email,
  } = useRedux();
  const [paymentMode, setpaymentMode] = useState(false);

  useEffect(() => {
    if (checkout.products !== undefined) {
      setloading(false);
    }

    if (checkout.error) {
      setToastify("Checkout session expired!", "error");
      router.replace("/");
    }
  }, [checkout]);

  async function handlePayment() {
    setpaymentButtonClicked(true);

    if (paymentMode && !captchaChecked) {
      setToastify(`Captcha verification is required`, "error");
    } else {
      const products = [];
      checkout.products.map((item) =>
        products.push({
          productId: item.product._id,
          quantity: item.quantity,
          unitPrice: item.product.sellingPrice,
        })
      );
      const orderDetails = {
        billingAddress,
        shippingAddress,
        products,
        totalPrice: checkout.subtotal,
        tax: checkout.tax,
        discount: checkout.discount,
        paymentMethod: paymentMode ? "COD" : "Prepaid",
        couponDiscount: checkout.couponDiscount,
        shipping: checkout.shipping,
      };

      const response = await request("/orders", orderDetails, token);

      if (response.status === 200) {
        if (paymentMode === true) {
          router.push(`/order-details/${response.data.orderId}`);
        } else {
          razorpayWindow(response.data, token, setToastify, router);
        }
      } else {
        setToastify("Order could not be processed at the moment", "error");
      }
      dispatch(setCartItems(token));
      setpaymentButtonClicked(false);
    }
  }

  return (
    <div>
      {loading ? (
        <div
          style={{
            height: "80vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularIndeterminate />
        </div>
      ) : (
        <div>
          {/* OrderSummarySm will be viewable on smaller devices*/}
          <OrderSummarySm checkoutData={checkout} paymentMode={paymentMode} />

          <Container maxWidth="lg">
            <div className={styles.parent_container}>
              <div className={styles.left_container}>
                <div className={styles.logo_lg}>
                  <img
                    src="https://lapcare.sgp1.digitaloceanspaces.com/lapcare-logo-u.png"
                    width={220}
                    height={40}
                  />
                </div>

                <CheckoutSteps status="payment" />

                <ContactInfoCard
                  billingAddress={billingAddress}
                  shippingAddress={shippingAddress}
                  email={email}
                />

                <PaymentOptionsCard
                  paymentMode={paymentMode}
                  setpaymentMode={setpaymentMode}
                  setcaptchaChecked={setcaptchaChecked}
                  cod={checkout.cod}
                />

                <Button
                  variant="contained"
                  color="primary"
                  className={styles.submit_button_sm}
                  fullWidth
                  onClick={handlePayment}
                >
                  <HttpsRoundedIcon
                    style={{ display: "inline-block", marginRight: "5px" }}
                  />{" "}
                  pay securely
                </Button>
              </div>

              {/* Order Summary Right Container only viewable for large screen devices */}
              <div className={styles.right_container}>
                <div style={{ marginTop: "2rem" }}>
                  <OrderSummary
                    checkoutData={checkout}
                    paymentMode={paymentMode}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    style={{
                      fontSize: "1.1rem",
                      textTransform: "none",
                      fontWeight: "600",
                      margin: "1rem 0",
                    }}
                    fullWidth
                    onClick={handlePayment}
                    disabled={paymentButtonClicked}
                  >
                    {paymentButtonClicked ? (
                      <ButtonSpinner />
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <HttpsRoundedIcon style={{ marginRight: "5px" }} /> Pay
                        Securely{" "}
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default withAuth(Payment);
