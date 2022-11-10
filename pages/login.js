import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import postRequest from '../src/middlewares/axios/post';
import * as gtag from '../src/helpers/gtag'

//Material Ui Imports
import { Typography, TextField, Button, Container } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';

//Redux Imports
import { useRouter } from 'next/router';
import { SET_TOASTIFY } from '../src/store/actionTypes/toastify';
import { useDispatch } from 'react-redux';
import { loginUser } from '../src/store/actionCreators/logIn'

//Formik imports
import { useFormik } from 'formik';
import { validationSchemaForLogin, validationSchemaforRegister } from '../src/helpers/yup/auth';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import ForgetPassword from '../src/components/login/ForgetPassword';





const useRedux = () => {
    const dispatch = useDispatch()
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
    return { setToastify }
}




const Login = (props) => {
    const { setToastify } = useRedux();
    const router = useRouter();
    const dispatch = useDispatch();
    const [showLoginCard, setshowLoginCard] = useState(true)
    const [openModal, setopenModal] = useState(false);

    const formikforLogin = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchemaForLogin,
        onSubmit: async (values) => {
            const response = await postRequest('/auth/login', values);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                dispatch(loginUser(response.data.token));
                setToastify('LogIn success!', 'success')
                gtag.event({
                    action:"login",
                    category:'ecommerce',
                    label:'User Login',
                    value:1
                })
                router.back()
            } else {
                setToastify(response.data, 'error')
            }
        }
    });


    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            password: '',
            contact: '',
        },
        validationSchema: validationSchemaforRegister,
        onSubmit: async (values) => {
            const response = await postRequest('/auth/register', values);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                dispatch(loginUser(response.data.token));
                setToastify('Account Created and you are now signed in!', 'success')
                gtag.event({
                    action:"sign_up",
                    category:'ecommerce',
                    label:'User Signup',
                    value:1
                })
                router.back()
            } else {
                setToastify(response.data, 'error')
            }
        }
    });



    const responseFacebook = async (response) => {
        const data = {
            token: response.accessToken,
            id: response.id,
            name:response.name,
            email:response.email
        }
        const res = await postRequest('/auth/facebook', data);
        if (res.status===200) {
            setToastify('Login with Facebook success!', 'success')
            localStorage.setItem('token', res.data.token)
            dispatch(loginUser(res.data.token));
            gtag.event({
                action:"login",
                category:'ecommerce',
                label:'User Login',
                value:1
            })
            router.back();
        } else {
            setToastify(res.data, 'error')
        }
    }

    const responseGoogle = async (response) => {
        const data = {
            token: response.tokenId,
            id: response.googleId
        }

        const res = await postRequest('/auth/google', data);
        if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            dispatch(loginUser(response.data.token));
            gtag.event({
                action:"login",
                category:'ecommerce',
                label:'User Login',
                value:1
            })
            router.back()
        } else {
            setToastify(res.data, 'error')
        }

    }



    return (
        <Container maxWidth="lg" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className={styles.parent_card}>
                <div className={styles.left_container}>
                    <img src="https://lapcareaws-static.s3.ap-south-1.amazonaws.com/lapscan/Lapscan+PC+Cleaner+popup+500+x+500.png" className={styles.image} />
                </div>

                {showLoginCard ?
                    <div className={styles.right_container}>
                        <Typography variant="h6" align="center" gutterBottom>ALREADY REGISTERED ?</Typography>
                        <form noValidate autoComplete="off" onSubmit={formikforLogin.handleSubmit} className={styles.form}>
                            <TextField
                                size="small"
                                label="Email"
                                variant="outlined"
                                name="email"
                                spellCheck="false"
                                onChange={formikforLogin.handleChange}
                                className={styles.textField}
                                style={{ margin: "0.5rem 0" }}
                                value={formikforLogin.values.email}
                                error={formikforLogin.touched.email && Boolean(formikforLogin.errors.email)}
                                helperText={formikforLogin.touched.email && formikforLogin.errors.email} />
                            <TextField
                                size="small"
                                label="Password"
                                variant="outlined"
                                name="password"
                                type="password"
                                spellCheck="false"
                                onChange={formikforLogin.handleChange}
                                className={styles.textField}
                                style={{ margin: "0.5rem 0" }}
                                value={formikforLogin.values.password}
                                error={formikforLogin.touched.password && Boolean(formikforLogin.errors.password)}
                                helperText={formikforLogin.touched.password && formikforLogin.errors.password}
                            />
                            <Button variant="contained" color="primary" disableElevation fullWidth type='submit' style={{ margin: "0.5rem 0" }}>Log In</Button>
                            <div onClick={() => setopenModal(true)} >
                                <p style={{ color: "#fcc101", cursor: "pointer", fontWeight: "500" }}>Forgotten password?</p>
                            </div>
                        </form>
                        <div className={styles.info}>
                            <p onClick={() => setshowLoginCard(false)}>Don't have an Account? <span style={{ color: "#fcc101", cursor: "pointer" }}>Create Now</span></p>
                        </div>
                        <div className={styles.social_login_container}>
                            <p>Or, Sign in with</p>
                            <FacebookLogin
                                appId="1102099647160796"
                                autoLoad={false}
                                fields="name,email,id"
                                callback={responseFacebook}
                                render={renderProps => (
                                    <Button variant='contained' disableElevation style={{backgroundColor:"#2b7aff",color:"#ffff",fontWeight:"600",textTransform:"capitalize",display:"flex",justifyContent:"space-between",alignItems:"center",margin:"7px 0",fontSize:"14px"}} onClick={renderProps.onClick}><FacebookIcon size="large" style={{borderRadius:"50%",marginRight:"10px"}} /> {"  "} Continue with Facebook</Button>
                                )}
                            />
                        </div>
                    </div> :
                    <div className={styles.right_container}>
                        <Typography variant="h6" align="center" gutterBottom>CREATE AN ACCOUNT</Typography>
                        <form noValidate onSubmit={formik.handleSubmit} autoComplete="off" className={styles.form}>
                            <TextField
                                size="small"
                                label="First Name"
                                variant="outlined"
                                name="fname"
                                spellCheck="false"
                                onChange={formik.handleChange}
                                className={styles.textField}
                                style={{ margin: "0.5rem 0" }}
                                autoComplete="false"
                                value={formik.values.fname}
                                error={formik.touched.fname && Boolean(formik.errors.fname)}
                                helperText={formik.touched.fname && formik.errors.fname}
                            />
                            <TextField
                                size="small"
                                label="Last Name"
                                variant="outlined"
                                name="lname"
                                spellCheck="false"
                                onChange={formik.handleChange}
                                className={styles.textField}
                                style={{ margin: "0.5rem 0" }}
                                value={formik.values.lname}
                                error={formik.touched.lname && Boolean(formik.errors.lname)}
                                helperText={formik.touched.lname && formik.errors.lname}
                            />
                            <TextField
                                size="small"
                                label="Email"
                                variant="outlined"
                                name="email"
                                spellCheck="false"
                                onChange={formik.handleChange}
                                className={styles.textField}
                                style={{ margin: "0.5rem 0" }}
                                value={formik.values.email}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                size="small"
                                label="Contact"
                                variant="outlined"
                                name="contact"
                                type="string"
                                spellCheck="false"
                                onChange={formik.handleChange}
                                className={styles.textField}
                                style={{ margin: "0.5rem 0" }}
                                value={formik.values.contact}
                                error={formik.touched.contact && Boolean(formik.errors.contact)}
                                helperText={formik.touched.contact && formik.errors.contact}
                            />
                            <TextField
                                size="small"
                                label="Password"
                                variant="outlined"
                                name="password"
                                type="password"
                                spellCheck="false"
                                onChange={formik.handleChange}
                                className={styles.textField}
                                style={{ margin: "0.5rem 0" }}
                                value={formik.values.password}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button variant="contained" color="primary" disableElevation fullWidth type="submit" style={{ margin: "0.5rem 0" }}>Register</Button>

                        </form>
                        <div className={styles.info}>
                            <p onClick={() => setshowLoginCard(true)}>Already Registered? <span style={{ color: "#fcc101", cursor: "pointer" }}>Log in</span></p>
                        </div>
                    </div>
                }

            </div>
            <ForgetPassword open={openModal} setopen={setopenModal} />
        </Container>
    )
}


export default Login

