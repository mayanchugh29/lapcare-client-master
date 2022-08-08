import React from 'react';
import styles from '../../styles/Login.module.css';
import request from '../../src/middlewares/axios/post';
import * as yup from 'yup';
import Link from 'next/link';

//Material Ui Imports
import { Typography, TextField, Button, Container } from '@material-ui/core';

//Redux Imports
import { SET_TOASTIFY } from '../../src/store/actionTypes/toastify';
import { useDispatch } from 'react-redux';

//Formik imports
import { useFormik } from 'formik';
import router from 'next/router';

const validationSchema = yup.object({
    newPassword: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string().test('match', 'Passwords do not match', function(value){
        const { newPassword } = this.parent;
        return newPassword === value;
      })
        
        
});

const PasswordReset = () => {
    const dispatch = useDispatch();
    const { token } = router.query;
    
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword:'',
        },
        validationSchema:validationSchema,
        onSubmit: async (values) => {
                const response = await request('/password/new',values,token);
                if (response.status === 200) {
                    dispatch({
                        type:SET_TOASTIFY,
                        payload:{
                            open:true,
                            msg:"Password changed!",
                            type:'success'
                        }
                    })
                    formik.resetForm()
                    router.push('/login')
                } else {
                    dispatch({
                        type:SET_TOASTIFY,
                        payload:{
                            open:true,
                            msg:`${response.data}`,
                            type:'error'
                        }
                    })
                }
            

        }
    });
    return (
        <Container maxWidth="lg" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className={styles.parent_card}>
                <div className={styles.left_container}>
                    <img src="https://lapcare.sgp1.digitaloceanspaces.com/email/forgot-password.png" className={styles.image} />
                </div>
                <div className={styles.right_container}>
                    <Typography variant="h6" align="center" gutterBottom style={{ marginBottom: "14px" }} >PASSWORD RESET</Typography>
                    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit} className={styles.form}>
                    <TextField
                            size="small"
                            label="New Password"
                            variant="outlined"
                            name="newPassword"
                            spellCheck="false"
                            fullWidth
                            onChange={formik.handleChange}
                            style={{ marginBottom: "14px" }}
                            value={formik.values.newPassword}
                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                        />
                        <TextField
                            size="small"
                            label=" Confirm Password"
                            variant="outlined"
                            name="confirmPassword"
                            type="password"
                            fullWidth
                            spellCheck="false"
                            onChange={formik.handleChange}
                            style={{ marginBottom: "14px" }}
                            value={formik.values.confirmPassword}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <Button variant="contained" color="primary" disableElevation fullWidth type='submit' style={{ marginBottom: "14px" }}>RESET PASSWORD</Button>
                    </form>
                    <div className={styles.info}>
                        <p>Already a customer? <span style={{ color: "#fcc101" }}><Link href="/login">Log in</Link></span></p>
                    </div>
                </div>

            </div>
        </Container>
    )
};

export default PasswordReset;
