import React, { useEffect, useState } from "react";
import styles from "../../styles/SingleOrder.module.css";
import { useRouter } from "next/router";

//Material Ui Imports
import { Typography, Container, Button } from "@material-ui/core";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

//Redux Imports
import { useSelector, useDispatch } from "react-redux";
import request from "../../src/middlewares/axios/get";
import { SET_TOASTIFY } from "../../src/store/actionTypes/toastify";

//Middlewares
import withAuth from "../../src/middlewares/Auth/protect_page";

//Page Components
import CircularIndeterminate from "../../src/components/common/spinner/Spinner";
import OrderTracking from "../../src/components/order/OrderTracking";
import OrderTrackingSm from "../../src/components/order/OrderTrackingSm";
import Breadcrumb from "../../src/components/common/breadcrumbs/AccBreadcrumbs";
import OrderCancel from "../../src/components/order/OrderCancel";
import TrackingStatus from "../../src/components/order/TrackingStatus";
import razorpayWindow from "../../src/middlewares/razorpay/config";


const useRedux = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.authReducer.token);
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
	return { token, setToastify };
};

const SingleOrder = (props) => {
	const router = useRouter();
	const { token, setToastify } = useRedux();
	const [data, setdata] = useState();
	const [loading, setloading] = useState(true);
	const [orderCancel, setorderCancel] = useState(false);
	const [tracking, settracking] = useState(false)
	const { id } = router.query;
	const orderStatus = ["Order Placed", "Payment Failed", "Payment Pending"];
	const antivirus = ['Ultimate Security', 'Lapscan AV Pro Cloud', 'Total Security Premium']

	let paymentFailed;
	let itemBeforeTax = 0;

	if (data) {
		let orderCancelled = false;
		data.orderStatus.forEach((item) => {
			if (item.status === "Order Cancelled") {
				orderCancelled = true;
			}
		});
		if (!orderCancelled) {
			if (data.orderStatus[0].status === "Payment Failed" || data.orderStatus[0].status === "Payment Pending") {
				paymentFailed = true;
			}
		}
		data.products.map(product => {
			itemBeforeTax += product.productId.costPrice
		})
	}

	useEffect(() => {
		const getOrderDetails = async () => {
			const response = await request(`/order/${id}`, token);
			if (response.status === 200) {
				setdata(response.data.orderData);
				setloading(false);
			} else {
				setToastify(response.data, "error");
			}
		};
		if (id && token) {
			getOrderDetails();
		}
	}, [token, id]);

	const cancelOrderClickHandler = () => {
		setorderCancel(true);
	};

	const handleRetryPayment = async () => {
		const response = await request(`/order/payment/${data.orderId}`, token);
		if (response.status === 200) {
			razorpayWindow(response.data.order, token, setToastify, router)
		} else {
			setToastify('Try again later', 'error')
		}
	};

	return (
		<div>
			<Breadcrumb
				breadcrumbs={[
					{ routeName: "Home", route: "/" },
					{ routeName: "Orders", route: "/account/orders" },
					{ routeName: `Order Details: ${id}`, route: `/order-details/${id}` },
				]}
			/>
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
					{data.is_shipped ? <TrackingStatus shipment={data.shipment} open={tracking} setopen={settracking} /> : null}
					{orderCancel ? (
						<OrderCancel id={data._id} data={data} setorderCancel={setorderCancel} />
					) : (
						<Container maxWidth="lg" className={styles.order_details_page}>
							<div className={styles.order_status_card}>
								{paymentFailed ? (
									<div className={styles.paymentFailedContainer}>
										<div>
											<InfoOutlinedIcon fontSize="large" />
											<p className={styles.order_status_text}>Your Payment for the Order is Pending/Failed. Please retry payment for your order within 24 hours otherwise your order will be cancelled! </p>
											<Button variant="contained" color="primary" onClick={handleRetryPayment} disableElevation style={{ marginTop: "14px" }}>
												Retry Payment
											</Button>
										</div>
									</div>
								) :
									<div>
										{antivirus.includes(data.products[0].productId.name) ?
											<div className={styles.paymentFailedContainer}>
												<div>
													<InfoOutlinedIcon fontSize="large" color="primary" />
													<p className={styles.order_status_text}>Dear Customer, Thank you for the purchase. Your activation code will be sent to you on your registered Email in 1-2 working days.</p>
												</div>
											</div>
											:
											<div>
												<OrderTracking orderStatus={data.orderStatus} />
												<OrderTrackingSm orderStatus={data.orderStatus}  />
											</div>
										}

									</div>

								}
								<div className={styles.product_container}>
									<Typography variant="h6" align="center" gutterBottom>
										Products in Your Order
									</Typography>
									{data.products.map((product) => (
										<div className={styles.product} key={product._id}>
											<img
												src={product.productId.images[0]}
												className={styles.product_image}
												height={100}
												width={100}
												alt="product"
											/>
											<p className={styles.product_name}>{product.productId.name}</p>
											<p className={styles.product_cost}>&#8377;{product.unitPrice !== undefined ? product.unitPrice : product.productId.sellingPrice}</p>
										</div>
									))}
								</div>
							</div>
							<div className={styles.order_details_container}>
								<div className={styles.cards}>
									<Typography variant="h6" gutterBottom>
										SHIPPING ADDRESS
									</Typography>
									<p>{data.shippingAddress.fullName}</p>
									<p>
										{data.shippingAddress.addressLine1}, {data.shippingAddress.addressLine2}
										<br />
										{data.shippingAddress.landmark}
										<br />
										{data.shippingAddress.city}, {data.shippingAddress.state}
										<br />
										{data.shippingAddress.pinCode}
										<br />
										{data.shippingAddress.phoneNumber}
									</p>
								</div>
								<div className={styles.cards}>
									<Typography variant="h6" gutterBottom>
										Order Summary
									</Typography>
									<div className={styles.pricing_info_container}>
										<p>Items:</p>
										<p>&#8377;{itemBeforeTax}</p>
									</div>
									<div className={styles.pricing_info_container}>
										<p>Tax:</p>
										<p>&#8377;{data.tax}</p>
									</div>
									<div className={styles.pricing_info_container}>
										<p>Shipping:</p>
										<p>&#8377;0</p>
									</div>
									<div className={styles.pricing_info_container}>
										<p>Promotion Applied:</p>
										<p>-&#8377;{data.couponDiscount ? data.discount + data.couponDiscount : data.discount}</p>
									</div>
									<div className={styles.pricing_info_container}>
										<p>Payment Method:</p>
										<p>{data.paymentMethod}</p>
									</div>
									<div className={styles.pricing_info_container}>
										<p style={{ fontWeight: "600", fontSize: "1rem" }}>Order Total:</p>
										<p style={{ fontWeight: "600", fontSize: "1rem" }}>&#8377;{data.totalPrice}</p>
									</div>
								</div>
								<div className={styles.cards}>
									<div>
										<Typography variant="h6" gutterBottom>
											More Actions
										</Typography>
										<div>
											<Button style={{ margin: "0.3rem 0" }} color="primary" variant="outlined" fullWidth disabled={!data.is_shipped} onClick={() => settracking(true)}>
												Track Order
											</Button>
											{antivirus.includes(data.products[0].productId.name) ? null :
												<Button
													style={{ margin: "0.3rem 0" }}
													color="primary"
													variant="outlined"
													fullWidth
													disabled={!orderStatus.includes(data.orderStatus[data.orderStatus.length - 1].status)}
													onClick={cancelOrderClickHandler}
												>
													Cancel Order
												</Button>}
											<Button style={{ margin: "0.3rem 0" }} color="primary" variant="outlined" fullWidth disabled>
												Request Return/Refund
											</Button>
											<Button style={{ margin: "0.3rem 0" }} color="primary" variant="contained" fullWidth disabled>
												Download Invoice
											</Button>
										</div>
									</div>
								</div>
							</div>
						</Container>
					)}
				</div>
			)}
		</div>
	);
};

export default withAuth(SingleOrder);
