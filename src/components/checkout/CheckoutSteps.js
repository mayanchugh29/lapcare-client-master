import React from 'react';
import styles from '../../../styles/Checkout.module.css';

const CheckoutSteps = ({ status }) => {
    return (
        <div>
            {status === 'information' ?
                <div className={styles.checkout_steps_container}>
                    <div className={styles.step_complete}>
                        <span className={styles.check_icon}></span>
                        <p className={styles.status_text}>Sign In</p>
                    </div>
                    <div className={styles.step_complete}>
                        <span className={styles.progress_icon}></span>
                        <p className={styles.status_text}>Information</p>
                    </div>
                    <div className={styles.step_incomplete}>
                        <span className={styles.unchecked_icon}></span>
                        <p className={styles.status_text}>Payment</p>
                    </div>
                </div> 
                :
                <div className={styles.checkout_steps_container}>
                    <div className={styles.step_complete}>
                        <span className={styles.check_icon}></span>
                        <p className={styles.status_text}>Sign In</p>
                    </div>
                    <div className={styles.step_complete}>
                        <span className={styles.check_icon}></span>
                        <p className={styles.status_text}>Information</p>
                    </div>
                    <div className={styles.step_complete}>
                        <span className={styles.progress_icon}></span>
                        <p className={styles.status_text}>Payment</p>
                    </div>
                </div>

            }
        </div>
    )
}

export default CheckoutSteps
