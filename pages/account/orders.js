import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Order.module.css";

//Middlewares
import request from "../../src/middlewares/axios/get";
import withAuth from "../../src/middlewares/Auth/protect_page";
import { useSelector, useDispatch } from "react-redux";

//Material Ui Import
import { Container } from "@material-ui/core";

// Components
import AccBreadcrumbs from "../../src/components/common/breadcrumbs/AccBreadcrumbs";
import CircularIndeterminate from "../../src/components/common/spinner/Spinner";
import { SET_TOASTIFY } from "../../src/store/actionTypes/toastify";

const Orders = () => {
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const router = useRouter();
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      const response = await request("/orders", token);
      if (response.status === 200) {
        setorders(response.data.orders);
        setloading(false);
      } else {
        setloading(false);
        dispatch({
          type: SET_TOASTIFY,
          payload: {
            msg: "Failed to fetch your orders right now",
            open: true,
            type: "error",
          },
        });
      }
    };
    getOrders();
  }, []);

  const statusColor = (orderStatus) => {
    let style = {};
    if (orderStatus === "Payment Pending") {
      style = {
        color: "#e9c46a",
      };
    } else if (orderStatus === "Payment Failed") {
      style = {
        color: "#e63946",
      };
    } else if (orderStatus === "Order Cancelled") {
      style = {
        color: "#FF6161",
      };
    } else if (orderStatus === "Return Initiated" || orderStatus === "RTO") {
      style = {
        color: "#FF9F00",
      };
    } else if (orderStatus === "Refunded") {
      style = {
        color: "#FF9F00",
      };
    }
    return style;
  };

  return (
    <div>
      <AccBreadcrumbs
        breadcrumbs={[
          { routeName: "Home", route: "/" },
          { routeName: "Dashboard", route: "/dashboard" },
          { routeName: "Orders", route: "/account/orders" },
        ]}
      />

      <Container maxWidth="lg" style={{ padding: "0" }}>
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
          <div className={styles.orders_page_container}>
            {orders.length > 0 ? (
              <div>
                {orders.map((order) => (
                  <div
                    className={styles.order_cards}
                    key={order._id}
                    onClick={() =>
                      router.push(`/order-details/${order.orderId}`)
                    }
                  >
                    <div className={styles.productsContainer}>
                      {order.products.map((product) => (
                        <div
                          className={styles.productContainer}
                          key={product.productId._id}
                        >
                          <img
                            src={product.productId.images[0]}
                            className={styles.product_image}
                          />
                          <p className={styles.product_name}>
                            {product.productId.name}
                          </p>
                          <div className={styles.smaller_devices_container}>
                            <p
                              style={statusColor(
                                order.orderStatus[order.orderStatus.length - 1]
                                  .status
                              )}
                              className={styles.orderStatus_sm}
                            >
                              {
                                order.orderStatus[order.orderStatus.length - 1]
                                  .status
                              }
                            </p>
                            <p className={styles.product_name_sm}>
                              {product.productId.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className={styles.orderStatusContainer}>
                      <p className={styles.order_amount}>
                        &#8377;{order.totalPrice}
                      </p>
                      <p
                        style={statusColor(
                          order.orderStatus[order.orderStatus.length - 1].status
                        )}
                        className={styles.orderStatus}
                      >
                        {order.orderStatus[order.orderStatus.length - 1].status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.zeroOrdersContainer}>
                <img src="https://lapcare.sgp1.digitaloceanspaces.com/not-found.png" />
                <p>No Orders Yet</p>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default withAuth(Orders);
