import { Typography } from '@material-ui/core';
import React from 'react';
import styles from '../../../styles/Checkout.module.css';
import Coupon from './Coupon';

const OrderSummary = ({ checkoutData, paymentMode }) => {
    return (
        <div>
            <Typography variant="h5" gutterBottom>Order Summary</Typography>
            {checkoutData.products.map(item => (
                <div className={styles.checkout_products_container}  key={item.product._id}>
                    <div className={styles.checkout_product}>
                        <div style={{ display: 'flex', alignItems: "center", width: "90%" }}>
                            <img src={item.product.images[0]}
                                width={65}
                                height={65}
                                className={styles.product_image}
                            />
                            <p className={styles.product_name}>{item.product.name}</p>
                        </div>
                        <p>{item.product.costPrice}</p>
                    </div>
                </div>
            ))}
            <Coupon paymentMode={paymentMode} />
            <div className={styles.checkout_price_container}>
                <div>
                    <p>Shipping</p>
                    <p>&#8377; {checkoutData.shipping}</p>
                </div>
                <div>
                    <p>Tax</p>
                    <p>&#8377; {checkoutData.tax}</p>
                </div>
                <div>
                    <p>Discount</p>
                    <p>&#8377; {checkoutData.discount}</p>
                </div>
                <div>
                    <p>Coupon Discount {checkoutData.couponCode}</p>
                    <p>&#8377; {checkoutData.couponDiscount}</p>
                </div>
                <div style={{ height: "1px", backgroundColor: "#e6e6e6", width: "100%" }} />
                <div>
                    <p>Subtotal</p>
                    <p>&#8377; {checkoutData.subtotal}</p>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary
