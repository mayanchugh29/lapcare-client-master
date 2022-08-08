import React from 'react'


import request from '../../middlewares/axios/put';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { SET_TOASTIFY } from '../../store/actionTypes/toastify';
import * as yup from 'yup';

import styles from '../../../styles/Dashboard.module.css';

import { Button, TextField, Typography } from '@material-ui/core';
import { UPDATE_EMAIL } from '../../store/actionTypes/user';

const useRedux = () => {
    const dispatch = useDispatch()
    const email = useSelector(state => state.userReducer.email)
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
    const updateEmailState = (payload)=>{
        dispatch({
            type:UPDATE_EMAIL,
            payload
        })
    }

    return { setToastify , token ,email,updateEmailState}
}

const validationSchema = yup.object({
    newEmail: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

const EditEmail = () => {

    const { setToastify , token , email, updateEmailState} = useRedux();

    const formik = useFormik({
        initialValues: {
            oldEmail:email,
            newEmail:''
        },
        validationSchema:validationSchema,
        onSubmit: async (values) => {
                const response = await request('/edit/email',values,token);
                if (response.status === 200) {
                    updateEmailState(values.newEmail)
                    values.oldEmail = values.newEmail
                    values.newEmail = ''
                    setToastify('Email updated!', 'success');

                } else {
                    setToastify(response.data, 'error')
                }

        }
    });


    return (
        <form onSubmit={formik.handleSubmit}>
        <div className={styles.email_container}>
                            <Typography variant="h6" gutterBottom>Change your Email</Typography>
                            <TextField
                                value={formik.values.oldEmail}
                                name="oldEmail"
                                type="email"
                                autoComplete="off"
                                variant="outlined"
                                spellCheck="false"
                                label="Current Email"
                                size="small"
                                className={styles.textField}
                                style={{ margin: "0.5rem 0" }}
                            />
                            <TextField
                               onChange={formik.handleChange}
                               value={formik.values.newEmail}
                                name="newEmail"
                                type="email"
                                autoComplete="off"
                                variant="outlined"
                                spellCheck="false"
                                label="Enter New Email"
                                size="small"
                                className={styles.textField}
                                style={{ margin: "0.5rem 0" }}
                                error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
                                helperText={formik.touched.newEmail && formik.errors.newEmail}
                            />
                            <div className={styles.action_buttons_container}>
                                <Button variant="contained" type="submit" className={styles.action_button} style={{ marginRight: "12px" }} color="primary">Save</Button>
                                <Button variant="outlined" className={styles.action_button} style={{ marginLeft: "12px" }} color="primary">Cancel</Button>
                            </div>
                        </div> 
                        </form>
    )
}

export default EditEmail
