import React from "react";
import styles from "../../../styles/SingleOrder.module.css";
import CancelIcon from "@material-ui/icons/Cancel";

const statusData = [
  {
    id: 1,
    text: "Placed",
  },
  {
    id: 2,
    text: "Confirmed",
  },
  {
    id: 3,
    text: "Processing",
  },
  {
    id: 4,
    text: "Shipped",
  },
  {
    id: 5,
    text: "Delivered",
  },
];

const OrderTracking = (props) => {
  let paymentFailed;
  let orderCancelled = null;

  props.orderStatus.forEach((item) => {
    if (item.status === "Order Cancelled" || item.status === "RTO") {
      orderCancelled = item;
    }
  });

  if (
    props.orderStatus[0].status === "Payment Failed" ||
    props.orderStatus[0].status === "Payment Pending"
  ) {
    paymentFailed = true;
  } else {
    paymentFailed = false;
  }

  const orderStatusClass = (index) => {
    if (paymentFailed) {
      return index === 0
        ? styles.order_status_complete
        : styles.order_status_incomplete;
    } else {
      return index <= props.orderStatus.length - 1
        ? styles.order_status_complete
        : styles.order_status_incomplete;
    }
  };

  const checkCircleClass = (index) => {
    if (paymentFailed) {
      return styles.unchecked_icon;
    } else {
      return index <= props.orderStatus.length - 1
        ? styles.check_icon
        : styles.unchecked_icon;
    }
  };

  const renderDate = (index) => {
    if (paymentFailed) {
      return "";
    }
    if (!paymentFailed) {
      return props.orderStatus[index]
        ? props.orderStatus[index].date.slice(0, 10)
        : "";
    }
  };

  return (
    <div className={styles.order_tracking_parent_container}>
      {orderCancelled ? (
        <div className={styles.orderCancelledContainer}>
          <div>
            <CancelIcon fontSize="large" />
            <p className={styles.order_status_text}>
              Order Cancelled on {orderCancelled.date.slice(0, 10)}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.order_tracking_parent_container}>
          {statusData.map((item, index) => (
            <div className={orderStatusClass(index)} key={index}>
              <span className={checkCircleClass(index)}></span>
              <p className={styles.order_status_text}>
                {item.text}
                <br />
                <span className={styles.order_status_date}>
                  {renderDate(index)}
                </span>
              </p>
            </div>
          ))}
          {props.orderStatus.length > 5 ? (
            <>
              <div className={styles.order_status_return_complete}>
                <span className={styles.check_icon_return}></span>
                <p className={styles.order_status_text}>
                  Return
                  <br />
                  <span className={styles.order_status_date}>
                    {renderDate(5)}
                  </span>
                </p>
              </div>
              <div
                className={
                  props.orderStatus[props.orderStatus.length - 1].statusId ===
                  13
                    ? styles.order_status_return_complete
                    : styles.order_status_incomplete
                }
              >
                <span
                  className={
                    props.orderStatus[props.orderStatus.length - 1].statusId ===
                    13
                      ? styles.check_icon_return
                      : styles.unchecked_icon
                  }
                ></span>
                <p className={styles.order_status_text}>
                  Refund
                  <br />
                  <span className={styles.order_status_date}>
                    {renderDate(
                      props.orderStatus[props.orderStatus.length - 1]
                        .statusId === 13
                        ? props.orderStatus.length - 1
                        : null
                    )}
                  </span>
                </p>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
