import React, { useState } from "react";
import {
	Container,
	FormControl,
	Select,
	MenuItem,
	Button,
	Typography,
} from "@material-ui/core";
import styles from "../../../styles/CancelOrder.module.css";
import request from "../../middlewares/axios/delete";
import { useSelector,useDispatch } from "react-redux";
import {SET_TOASTIFY} from '../../store/actionTypes/toastify';
import { useRouter } from "next/router";

const OrderCancel = (props) => {
	const dispatch = useDispatch()
	const [cancellationReason, setCancellationReason] = useState(1);
	const token = useSelector((state) => state.authReducer.token);
	const router = useRouter()

	const handleOrderCancellation = async () => {
		const response = await request(`/order/${props.id}`, token);
		if(response.status === 200){
			dispatch({
				type: SET_TOASTIFY,
				payload: {
					open: true,
					type: "info",
					msg: 'Your Order is cancelled!',
				},
			});
		}else{
			dispatch({
				type: SET_TOASTIFY,
				payload: {
					open: true,
					type: "error",
					msg: 'We could not cancel your Order!',
				},
			});
			props.setorderCancel(false)
		}
		router.push('/account/orders')
		
	};
	return (
		<div>
			<Container maxWidth="lg" className={styles.parentContainer}>
				<div className={styles.cancelOrderMainContainer}>
						<FormControl fullWidth>
							<Typography variant="h6">Cancellation Reason</Typography>
							<Select
								value={1}
								className={styles.cancelReason}
								variant="outlined"
								id="reason"
								value={cancellationReason}
								onChange={(event) => {
									setCancellationReason(event.target.value);
								}}
								placeholder="Select"
							>
								<MenuItem value={1}>Delivery Time is too long.</MenuItem>
								<MenuItem value={2}>Product price is too high.</MenuItem>
								<MenuItem value={3}>You no longer want this product.</MenuItem>
								<MenuItem value={4}>You won't be able to recieve the delivery of the product.</MenuItem>
							</Select>

							<Button
								className={styles.requestCancellationButton}
								color="primary"
								variant="contained"
								onClick={handleOrderCancellation}
							>
								Request Cancellation
							</Button>
						</FormControl>
					</div>
			</Container>
		</div>
	);
};

export default OrderCancel;
