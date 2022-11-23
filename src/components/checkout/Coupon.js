import { Button, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../styles/Checkout.module.css";
import request from "../../middlewares/axios/post";
import { APPLY_COUPON, REMOVE_COUPON } from "../../store/actionTypes/checkout";
import { SET_TOASTIFY } from "../../store/actionTypes/toastify";

const Coupon = (props) => {
  const dispatch = useDispatch();
  const [code, setcode] = useState("");
  const token = useSelector((state) => state.authReducer.token);
  const totalPrice = useSelector(
    (state) => state.checkoutProductReducer.subtotal
  );
  const initialSubtotal = useSelector(
    (state) => state.checkoutProductReducer.initialSubtotal
  );
  const products = useSelector(
    (state) => state.checkoutProductReducer.products
  );
  const newUser = useSelector((state) => state.userReducer.newUser);

  const couponApplied = useSelector(
    (state) => state.checkoutProductReducer.couponApplied
  );
  const applyDiscount = (coupon) => {
    if (coupon.type === 1) {
      const couponDiscount = Math.round(
        (coupon.discountValue / 100) * totalPrice
      );
      const finalPrice = Math.round(totalPrice - couponDiscount);
      dispatch({
        type: APPLY_COUPON,
        payload: {
          subtotal: finalPrice,
          couponDiscount: couponDiscount,
          couponCode: code,
        },
      });
    } else {
      const couponDiscount = coupon.discountValue;
      const finalPrice = Math.round(totalPrice - coupon.discountValue);
      dispatch({
        type: APPLY_COUPON,
        payload: {
          subtotal: finalPrice,
          couponDiscount: couponDiscount,
          couponCode: code,
        },
      });
    }
  };

  const handleCoupon = async () => {
    if (couponApplied) {
      dispatch({
        type: SET_TOASTIFY,
        payload: {
          msg: "You have already applied the coupon!",
          type: "info",
          open: true,
        },
      });
    } else {
      const cartProducts = [];
      products.map((item) =>
        cartProducts.push({
          productId: item.product._id,
          quantity: item.quantity,
        })
      );
      const response = await request(
        "/coupon",
        { code, products: cartProducts, totalPrice },
        token
      );
      if (response.status === 200) {
        applyDiscount(response.data.coupon);
        setcode("");
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: `Hurray! Coupon Applied!`,
            type: "success",
            open: true,
          },
        });
      } else {
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Coupon Code is not valid",
            type: "error",
            open: true,
          },
        });
      }
    }
  };

  return (
    <div className={styles.gift_card_container}>
      <TextField
        size="small"
        id="outlined-basic"
        label="coupon Code"
        helperText="*Coupon code should not contain any spaces"
        variant="outlined"
        inputProps={{ style: { textTransform: "uppercase" } }}
        fullWidth
        onChange={(e) => setcode(e.target.value.toUpperCase())}
      />
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={handleCoupon}
        style={{ marginLeft: "5px", marginBottom: "20px" }}
      >
        Apply
      </Button>
     
    </div>
    
    
  );
};

export default Coupon;
