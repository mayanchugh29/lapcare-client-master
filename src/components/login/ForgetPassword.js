import React from 'react';
import { Button, Card, CardContent, Modal, TextField, Typography } from '@material-ui/core';
import styles from '../../../styles/Login.module.css';
import request from '../../middlewares/axios/post';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { SET_TOASTIFY } from '../../store/actionTypes/toastify';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required')
});

const ForgetPassword = (props) => {
    const dispatch = useDispatch()

    const handleClose = () => {
        props.setopen(false)
    }


    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const response = await request('/password/reset', values);
            if (response.status === 200) {
                dispatch({
                    type: SET_TOASTIFY,
                    payload: {
                        type: 'success',
                        msg: 'Password reset email has been sent to your registered email!',
                        open: true
                    }
                })

            } else {
                dispatch({
                    type: SET_TOASTIFY,
                    payload: {
                        type: 'error',
                        msg: `${response.data}`,
                        open: true
                    }
                })
            }
        }
    })


    return (
        <Modal open={props.open} onClose={handleClose} >
            <Card className={styles.forgetPasswordModal}>
                <CardContent >
                    <Typography variant='h6' gutterBottom align='center' style={{ marginBottom: "14px" }}>Forget Password</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            name="email"
                            color='primary'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            fullWidth
                            variant="outlined"
                            label="Email"
                            size="small"
                            style={{ marginBottom: "14px" }}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}

                        />
                        <Button variant="contained" type="submit" fullWidth disableElevation color="primary">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </Modal>
    )
};

export default ForgetPassword;




