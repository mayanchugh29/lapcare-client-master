import React from 'react'
import request from '../../middlewares/axios/put';
import { useFormik } from 'formik';
import { useDispatch , useSelector } from 'react-redux'
import { SET_TOASTIFY } from '../../store/actionTypes/toastify';
import * as yup from 'yup';

import styles from '../../../styles/Dashboard.module.css';

import { Button, TextField, Typography } from '@material-ui/core';



const useRedux = () => {
    const dispatch = useDispatch()
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
    return { setToastify , token }
}

const validationSchema = yup.object({
    newPassword: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    newPassword1: yup
        .string().test('match', 'Passwords do not match', function(value){
        const { newPassword } = this.parent;
        return newPassword === value;
      })
        
        
});

const Password = () => {
    const { setToastify , token} = useRedux();

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            newPassword1:'',
        },
        validationSchema:validationSchema,
        onSubmit: async (values) => {
                const response = await request('/password',values,token);
                if (response.status === 200) {
                    setToastify('Password Changed!', 'success');
                    values.newPassword = '';
                    values.oldPassword = '',
                    values.newPassword1 = ''
                } else {
                    setToastify(response.data, 'error')
                }
            

        }
    });



    return (
        <form onSubmit={formik.handleSubmit}>
            <div className={styles.password_container}>

                <Typography variant="h6" gutterBottom>Change your Password</Typography>
                <TextField
                   value={formik.values.oldPassword}
                    name="oldPassword"
                    type="password"
                    autoComplete="off"
                    variant="outlined"
                    spellCheck="false"
                    label="Current Password"
                    size="small"
                    className={styles.textField}
                    style={{ margin: "0.5rem 0" }}
                    onChange={formik.handleChange}
                />
                <TextField
                    value={formik.values.newPassword}
                    name="newPassword"
                    type="password"
                    autoComplete="off"
                    variant="outlined"
                    spellCheck="false"
                    label="New Password"
                    size="small"
                    className={styles.textField}
                    style={{ margin: "0.5rem 0" }}
                    onChange={formik.handleChange}
                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                />
                <TextField
                    value={formik.values.newPassword1}
                    name="newPassword1"
                    type="password"
                    autoComplete="off"
                    variant="outlined"
                    spellCheck="false"
                    label="Confirm Password"
                    size="small"
                    onChange={formik.handleChange}
                    className={styles.textField}
                    style={{ margin: "0.5rem 0" }}
                    error={formik.touched.newPassword1 && Boolean(formik.errors.newPassword1)}
                    helperText={formik.touched.newPassword1 && formik.errors.newPassword1}
                />
                <div className={styles.action_buttons_container}>
                    <Button variant="contained" type="submit" className={styles.action_button} style={{ marginRight: "12px" }} color="primary">Save</Button>
                    <Button variant="outlined" className={styles.action_button} style={{ marginLeft: "12px" }} color="primary">Cancel</Button>
                </div>

            </div>
        </form>
    )
}

export default Password

