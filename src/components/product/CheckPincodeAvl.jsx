import React,{useState} from "react";
import InputBase from "@material-ui/core/InputBase";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {Button } from "@material-ui/core";
import request from '../../middlewares/axios/post';
import { useDispatch } from "react-redux";
import { SET_TOASTIFY } from "../../store/actionTypes/toastify";
import { useFormik } from "formik";


export default function CheckPincodeAvl(props) {
	const [deliveryAvailable, setdeliveryAvailable] = useState()
	const [deliveryTime, setdeliveryTime] = useState()
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues:{
			delivery_postcode:''
		},
		onSubmit: async(values)=>{
			if(values.delivery_postcode===''){
				dispatch({
					type: SET_TOASTIFY,
					payload: {
						type: "info",
						msg: "Please enter your pin code!",
						open: true,
					},
				});
			}else{
				const data ={
					delivery_postcode:values.delivery_postcode,
					product:{
						length:props.productDimension.length,
						breadth:props.productDimension.width,
						height:props.productDimension.height,
						weight:props.productWeight.value/1000
					}
				}
				const response = await request('/order/delivery',data);
				if(response.status===200){
					setdeliveryAvailable(true)
					setdeliveryTime(Number(response.data.data.available_courier_companies[0].estimated_delivery_days))
					
				}else{
					setdeliveryAvailable(false)
				}
			}
			
		}
	})

	return (
		<div>
		<form
			style={{
				display: "flex",
				justifyContent: "space-between",
				backgroundColor: "white",
				borderRadius: "5px",
				margin: "0.5rem 0",
			}}
			onSubmit={formik.handleSubmit}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "center",
					padding: "0.5rem",
				}}
			>
				<LocationOnIcon color="primary" />
				<InputBase
				    name="delivery_postcode"
					placeholder="Enter your Pincode"
					style={{ marginLeft: "3px" }}
					onChange={formik.handleChange}
				/>
			</div>
			<Button
			    type="submit"
				color="primary"
				style={{ backgroundColor: "#b8b8b8", color: "white" }}
			>
				Check
			</Button>
		</form>
		{
			deliveryAvailable!==undefined?
			<div>
				{deliveryAvailable?
				<p style={{color:"#49A5A2",fontWeight:"500",marginLeft:"7px",fontSize:"1rem"}}>Delivery in {deliveryTime-2}-{deliveryTime} days</p>:
				<p style={{color:"#ff6161",fontWeight:"500",marginLeft:"7px",fontSize:"1rem"}}>Delivery Not available</p>
				}
			</div>:null
		}
		</div>
	);
}