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

const OrderTrackingSm = (props) => {
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

  const checkCircleClass = (index) => {
    if (paymentFailed) {
      return styles.unchecked_icon;
    } else {
      return index <= props.orderStatus.length - 1
        ? styles.check_icon
        : styles.unchecked_icon;
    }
  };

  const orderStatusClass = (index) => {
    if (paymentFailed) {
      return styles.order_track_status_line_incomplete;
    } else {
      return index <= props.orderStatus.length - 2
        ? styles.order_track_status_line
        : styles.order_track_status_line_incomplete;
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
    <div className={styles.order_tracking_container_sm}>
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
        <div className={styles.order_track}>
          {statusData.map((item, index) => (
            <div className={styles.order_track_step} key={index}>
              <div className={styles.order_track_status}>
                <span className={checkCircleClass(index)}></span>
                <span className={orderStatusClass(index)}></span>
              </div>
              <div className={styles.order_track_text}>
                <p className={styles.order_track_text_stat}>{item.text}</p>
                <span className={styles.order_track_text_sub}>
                  {renderDate(index)}
                </span>
              </div>
            </div>
          ))}
          {props.orderStatus.length > 5 ? (
            <>
              <div className={styles.order_track_step}>
                <div className={styles.order_track_status}>
                  <span className={styles.check_icon_return}></span>
                  <span
                    className={styles.order_track_status_return_line}
                  ></span>
                </div>
                <div className={styles.order_track_text}>
                  <p className={styles.order_track_text_stat}>Return</p>
                  <span className={styles.order_track_text_sub}>
                    {renderDate(5)}
                  </span>
                </div>
              </div>
              <div className={styles.order_track_step}>
                <div className={styles.order_track_status}>
                  <span
                    className={
                      props.orderStatus[props.orderStatus.length - 1]
                        .statusId === 13
                        ? styles.check_icon_return
                        : styles.unchecked_icon
                    }
                  ></span>
                  <span
                    className={
                      props.orderStatus[props.orderStatus.length - 1]
                        .statusId === 13
                        ? styles.order_track_status_return_line
                        : styles.order_track_status_line_incomplete
                    }
                  ></span>
                </div>
                <div className={styles.order_track_text}>
                  <p className={styles.order_track_text_stat}>Refund</p>
                  <span className={styles.order_track_text_sub}>
                    {renderDate(
                      props.orderStatus[props.orderStatus.length - 1]
                        .statusId === 13
                        ? props.orderStatus.length - 1
                        : null
                    )}
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default OrderTrackingSm;
