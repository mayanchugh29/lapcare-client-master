import React from 'react';
import styles from '../../../styles/Checkout.module.css';

const ContactInfoCard = ({ shippingAddress, billingAddress,email }) => {
    return (
        <div className={styles.contact_info_card}>
            <div className={styles.contact_info_card_child_div}>
                <p style={{ color: "grey" }}>Contact</p>
                <p className={styles.contact_info_card_child_div__p}>{email}</p>
            </div>
            <div className={styles.contact_info_card_child_div}>
                <p style={{ color: "grey", verticalAlign: "bottom" }}>Shipping Address</p>
                <p className={styles.contact_info_card_child_div__p}>
                    {shippingAddress.fullName}, {shippingAddress.addressLine1}, {shippingAddress.addressLine2},
                    {shippingAddress.pinCode}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.phoneNumber}
                </p>
            </div>
            <div className={styles.contact_info_card_child_div}>
                <p style={{ color: "grey" }}>Billing Address</p>
                <p className={styles.contact_info_card_child_div__p}>
                    {billingAddress.fullName}, {billingAddress.addressLine1}, {billingAddress.addressLine2},
                    {billingAddress.pinCode}, {billingAddress.city}, {billingAddress.state}, {billingAddress.phoneNumber}
                </p>
            </div>
        </div>
    )
}

export default ContactInfoCard
