import React,{useState} from 'react';
import styles from '../../../styles/Checkout.module.css';

import {  ExpandLessRounded, ExpandMoreRounded } from '@material-ui/icons';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { TextField } from '@material-ui/core';
import Coupon from './Coupon';

const OrderSummary = ({checkoutData, paymentMode }) => {
    const [expandOrderSummary, setexpandOrderSummary] = useState(false)
    return (
        <div>
             <div className={styles.logo_sm}>
                        <img src='https://lapcare.sgp1.digitaloceanspaces.com/lapcare-logo-u.png'
                            width={150}
                            height={30}
                        />
                    </div>
                    <div className={styles.order_summary_container}>
                        <div className={styles.expandable_container} onClick={() => setexpandOrderSummary(!expandOrderSummary)}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <ShoppingCartOutlinedIcon />
                                <p style={{ fontsize: "0.9rem", marginLeft: "2px", marginRight: "2px" }}>Show Order Summary</p>
                                {expandOrderSummary ? <ExpandLessRounded /> :
                                    <ExpandMoreRounded />
                                }

                            </div>
                            <p style={{ fontSize: "1rem", fontWeight: "500" }}>&#8377;{checkoutData.subtotal}</p>
                        </div>
                        {expandOrderSummary ?
                            <div className={styles.order_summary__products_container}>
                                {checkoutData.products.map(item => (
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }} key={item.product._id}>
                                            <div style={{ display: "flex", alignItems: "center", width: "85%" }}>
                                                <img src={item.product.images[0]} height={50} width={50} alt="product image" />
                                                <p style={{ marginLeft: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block", width: "75%" }}>
                                                    {item.product.name}
                                                </p>
                                            </div>
                                            <p>&#8377;{item.product.costPrice}</p>
                                        </div>

                                ))}
                                <Coupon  paymentMode={paymentMode} />
                                <div className={styles.order_summary_price_container}>
                                    <div>
                                        <p>Shipping</p>
                                        <p>&#8377; {checkoutData.shipping}</p>
                                    </div>
                                    <div>
                                        <p>Tax</p>
                                        <p>&#8377;{checkoutData.tax}</p>
                                    </div>
                                    <div>
                                        <p>Discount</p>
                                        <p>&#8377;{checkoutData.discount}</p>
                                    </div>
                                    <div>
                                        <p>Coupon Discount {checkoutData.couponCode}</p>
                                        <p>&#8377;{checkoutData.couponDiscount}</p>
                                    </div>
                                    <div style={{ height: "1px", backgroundColor: "#e6e6e6", width: "100%" }} />
                                    <div>
                                        <p>Subtotal</p>
                                        <p>&#8377;{checkoutData.subtotal}</p>
                                    </div>
                                </div>
                            </div>
                            : null}
                    </div>
        </div>
    )
}

export default OrderSummary
