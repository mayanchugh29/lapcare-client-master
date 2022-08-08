import React, { useState } from 'react'

import styles from '../../../styles/Dashboard.module.css';

import { Button, TextField, Typography } from '@material-ui/core';
import { DeleteOutline, AddRounded } from '@material-ui/icons';
import * as yup from 'yup';

import postRequest from '../../middlewares/axios/post';
import deleteRequest from '../../middlewares/axios/delete'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { SET_TOASTIFY } from '../../store/actionTypes/toastify';
import { ADD_NEW_ADDRESS,DELETE_ADDRESS } from '../../store/actionTypes/user';

const useRedux = () => {
    const dispatch = useDispatch()
    const savedAddresses = useSelector(state => state.userReducer.savedAddresses)
    const token = useSelector(state => state.authReducer.token)
    const setToastify = (msg, type) => {
        dispatch({
            type: SET_TOASTIFY,
            payload: {
                msg: msg,
                type: type,
                open: true

            }
        })
    }

    const addNewAddress = (payload)=>{
        dispatch({
            type:ADD_NEW_ADDRESS,
            payload
        })
    }
    const deleteAddress = (payload)=>{
        dispatch({
            type:DELETE_ADDRESS,
            payload
        })
    }
    return { setToastify, token , savedAddresses ,addNewAddress,deleteAddress}
}

const validationSchema = yup.object({
    fullName: yup
        .string('Enter your full name')
        .required('Name field is required'),
    addressLine1: yup
        .string('Enter Your Address')
        .required('Address Line 1 field is required'),
    addressLine2: yup 
        .string('Enter Address Line 2'),
    landmark: yup
        .string('Enter your landmark'),

    city: yup
        .string('Enter your city')
        .required('City is required'),
    state: yup
        .string('Select your State')
        .required('State is required'),
    pinCode: yup
        .number('Enter your Pin Code')
        .min(6,'Pin Code should be of 6 digits')
        .required('Pin Code is required'),
    phoneNumber:yup
        .number('Enter your Phone Number')
        .min(10,'Contact should be of 10 digits')
        .required('Contact is required')
});


const Address = () => {

    const { token, setToastify , savedAddresses , addNewAddress, deleteAddress} = useRedux()
    const [expandAddNewAddress, setexpandAddNewAddress] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            pinCode: '',
            phoneNumber: '',
            landmark: ''
        },
        validationSchema:validationSchema,
        onSubmit: async (values) => {
                const response = await postRequest('/address',values,token);
                if (response.status === 200) {
                    setexpandAddNewAddress(false);   
                    addNewAddress(response.data.savedAddresses)           
                    setToastify('New Address saved!', 'success');
                } else {
                    setToastify(response.data, 'error')
                }

        }
    });

    const handleDeleteAddress = async(id)=>{
        const response = await deleteRequest(`/address/${id}`,token)
        if (response.status === 200) { 
            deleteAddress(id)    
            setToastify(response.data.msg, 'success');
        } else {
            setToastify(response.data, 'error')
        }
    }



    return (
        <div className={styles.address_container}>
            <Typography variant="h6" gutterBottom>Manage Addressses</Typography>
            <div className={styles.add_new_address_container}>
                <div className={styles.add_new_address_header} onClick={() => setexpandAddNewAddress(!expandAddNewAddress)}>
                    <AddRounded color="primary" />
                    <p style={{ color: "#fcc101" }}>Add a New Address</p>
                </div>
                <div>
                    {expandAddNewAddress ?
                        <form noValidate autoComplete="off" style={{ marginTop: "1rem" }} onSubmit={formik.handleSubmit}>
                            <TextField 
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                size='small' 
                                label="Full name" 
                                variant="outlined"
                                spellCheck="false" 
                                className={styles.textField} 
                                style={{ margin: "0.5rem 0" }} 
                                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                helperText={formik.touched.fullName && formik.errors.fullName}
                            />
                            <TextField 
                                name ="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                spellCheck="false"
                                size='small' 
                                label="Contact" 
                                variant="outlined" 
                                className={styles.textField} 
                                style={{ margin: "0.5rem 0" }} 
                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            />
                            <TextField 
                                name="pinCode"
                                value={formik.values.pinCode}
                                onChange={formik.handleChange}
                                spellCheck="false" 
                                size='small' 
                                label="Pin Code" 
                                variant="outlined" 
                                className={styles.textField} 
                                style={{ margin: "0.5rem 0" }} 
                                error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                                helperText={formik.touched.pinCode && formik.errors.pinCode}
                            />
                            <TextField 
                                name="landmark"
                                value={formik.values.landmark}
                                onChange={formik.handleChange}
                                spellCheck="false"
                                size='small' 
                                label="Landmark" 
                                variant="outlined" 
                                className={styles.textField} 
                                style={{ margin: "0.5rem 0" }} 
                                error={formik.touched.landmark && Boolean(formik.errors.landmark)}
                                helperText={formik.touched.landmark && formik.errors.landmark}
                            />
                            <TextField 
                                name="addressLine1"
                                value={formik.values.addressLine1}
                                onChange={formik.handleChange}
                                spellCheck="false"
                                size='small' 
                                label="Address Line 1" 
                                variant="outlined" 
                                className={styles.textField} 
                                fullWidth 
                                style={{ margin: "0.5rem 0" }} 
                                error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
                                helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
                            />
                            <TextField 
                                name="addressLine2"
                                value={formik.values.addressLine2}
                                onChange={formik.handleChange}
                                spellCheck="false" 
                                size='small' 
                                label="Address Line 2" 
                                variant="outlined" 
                                className={styles.textField} 
                                fullWidth 
                                style={{ margin: "0.5rem 0" }} 
                                error={formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)}
                                helperText={formik.touched.addressLine2 && formik.errors.addressLine2}
                            />
                            <TextField 
                                name = "city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                spellCheck="false" 
                                size='small' 
                                label="City" 
                                variant="outlined" 
                                className={styles.textField} 
                                style={{ margin: "0.5rem 0" }} 
                                error={formik.touched.city && Boolean(formik.errors.city)}
                                helperText={formik.touched.city && formik.errors.city}
                            />
                            <TextField 
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                spellCheck="false"
                                size='small' 
                                label="State" 
                                variant="outlined" 
                                className={styles.textField} 
                                style={{ margin: "0.5rem 0" }} 
                                error={formik.touched.state && Boolean(formik.errors.state)}
                                helperText={formik.touched.state && formik.errors.state}
                            />

                            <div className={styles.action_buttons_container}>
                                <Button 
                                    variant="contained" 
                                    type="submit" 
                                    className={styles.action_button} 
                                    style={{ marginRight: "12px" }} 
                                    color="primary">  
                                    Save
                                </Button>
                                <Button  
                                    variant="outlined" 
                                    onClick={()=>setexpandAddNewAddress(false)} 
                                    className={styles.action_button} 
                                    style={{ marginLeft: "12px" }} 
                                    color="primary"> 
                                    Cancel
                                </Button>
                            </div>

                        </form> : null
                    }
                </div>

            </div>
            <div style={{margin:"1rem 0"}}>
                <Typography variant="h6" gutterBottom>Saved Addresses</Typography>
           {savedAddresses.map(data=>(
                <div style={{ border: "1px solid #e6e6e6", margin:"1rem 0",padding: "1rem"}} key={data._id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontWeight: "500", lineHeight: 2 }}>{data.fullName}  {data.phoneNumber}</p>
                        <DeleteOutline color="primary" onClick={()=>handleDeleteAddress(data._id)} />
                    </div>
                    <p>{data.addressLine1}, {data.addressLine2}, {data.city}, {data.state}- {data.pinCode}</p>
                </div>
            
           ))}
           </div>
        </div>
    )
}

export default Address
