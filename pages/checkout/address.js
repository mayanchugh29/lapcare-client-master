import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Checkout.module.css';
import Cookies from 'js-cookie';
import * as gtag from '../../src/helpers/gtag'

//formik imports
import { useFormik } from 'formik';
import { validationSchemaforCheckout, validationSchemaforCheckoutWithBillingAddress } from '../../src/helpers/yup/checkout';

// Redux Store imports
import { SET_TOASTIFY } from '../../src/store/actionTypes/toastify';
import * as actionTypes from '../../src/store/actionTypes/checkout'
import { useDispatch, useSelector } from 'react-redux';

//Middlewares
import withAuth from '../../src/middlewares/Auth/protect_page';
import request from '../../src/middlewares/axios/post';

//Material Ui Components
import PaymentRoundedIcon from '@material-ui/icons/PaymentRounded';
import { AddRounded } from '@material-ui/icons';
import { Typography, Button, Container, Checkbox, FormControlLabel, Radio } from '@material-ui/core';

//Page Components
import OrderSummarySm from '../../src/components/checkout/OrderSummarySm';
import OrderSummary from '../../src/components/checkout/OrderSummary';
import CheckoutSteps from '../../src/components/checkout/CheckoutSteps';
import ShippingAddress from '../../src/components/checkout/ShippingAddress';
import BillingAddress from '../../src/components/checkout/BillingAddress';
import CircularIndeterminate from '../../src/components/common/spinner/Spinner';
import { checkPinCodeAvaibility } from '../../src/helpers/checkPincode';
import { checkProductIsSoftware } from '../../src/helpers/checkProduct';




const useRedux = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.authReducer.token)
    const checkout = useSelector((state) => state.checkoutProductReducer);
    const savedAddresses = useSelector(state => state.userReducer.savedAddresses)

    const addAddress = (shippingAddress, billingAddress) =>
        dispatch({
            type: actionTypes.ADD_ADDRESS,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress

        })
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
    const enableCod = (boolean)=>{
        dispatch({
            type:actionTypes.ENABLE_COD,
            payload:boolean
        })
    }
    return { checkout, savedAddresses, addAddress, token,setToastify , enableCod}
}



const Address = () => {
    const { checkout, addAddress, savedAddresses,token, setToastify,enableCod } = useRedux();
    const [showBillingAddress, setshowBillingAddress] = useState(false);
    const [loading, setloading] = useState(true)
    const [showAddNewAddress, setshowAddNewAddress] = useState();
    const [selectedAddressId, setselectedAddressId] = useState();
    const router = useRouter()
    const dispatch = useDispatch()

    const handleSelectAddress = (address) => {
        setselectedAddressId(address._id);
        setFormikValues(address)
        setshowAddNewAddress(false)
    }

    const setFormikValues = (data) => {
        formik.values.shippingAddress.fullName = data.fullName
        formik.values.shippingAddress.addressLine1 = data.addressLine1
        formik.values.shippingAddress.addressLine2 = data.addressLine2
        formik.values.shippingAddress.city = data.city
        formik.values.shippingAddress.state = data.state
        formik.values.shippingAddress.pinCode = data.pinCode
        formik.values.shippingAddress.phoneNumber = data.phoneNumber
        formik.values.shippingAddress.landmark = data.landmark

    }

    const handleShowAddNewAddressContainer = () => {
        setselectedAddressId('')
        setFormikValues({ fullName: '', addressLine1: '', addressLine2: '', city: '', state: "Maharashtra", pinCode: '', phoneNumber: '', landmark: '' })
        setshowAddNewAddress(true)
    }

    useEffect(() => {
        if(checkout.products !== undefined){
            setloading(false);
        }
        
        if(checkout.error){
            setToastify('Checkout session expired!','error')
            router.replace('/')
        }

        if (savedAddresses !== undefined && selectedAddressId === undefined) {
            setshowAddNewAddress(savedAddresses.length === 0 ? true : false);
            setselectedAddressId(savedAddresses.length !== 0 ? savedAddresses[0]._id : '')
            savedAddresses.length !== 0 ? setFormikValues(savedAddresses[0]) : null
        }

    }, [checkout, savedAddresses])


    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                fullName: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: 'Maharashtra',
                pinCode: '',
                phoneNumber: '',
                landmark: ''
            },
            billingAddress: {
                fullName: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: 'Maharashtra',
                pinCode: '',
                phoneNumber: '',
                landmark: ''
            }
        },
        validationSchema: showBillingAddress ? validationSchemaforCheckoutWithBillingAddress : validationSchemaforCheckout,
        onSubmit: async (values) => {
            if (showBillingAddress === false) {
                values.billingAddress = values.shippingAddress
            }
            Cookies.set('billingAddress', JSON.stringify(values.billingAddress), { expires: 1/48 }),
            Cookies.set('shippingAddress', JSON.stringify(values.shippingAddress), { expires: 1/48 })
            addAddress(values.shippingAddress, values.billingAddress);
            const productIsSoftware = await checkProductIsSoftware(checkout.products)
            const avaibility = await checkPinCodeAvaibility(values.shippingAddress.pinCode)
            if(avaibility && checkout.subtotal>500 && !productIsSoftware){
                enableCod(true)
            }else{
                enableCod(false)
            }
            if (showAddNewAddress) {
                const response = await request('/address', values.shippingAddress, token);
                if (response.status === 200) {
                    setToastify('Address Saved to your Account', 'success')
                }
            } else {
                setToastify('Address Saved for your Order!', 'success')
            }
            gtag.event({
                action:"add_shipping_info",
                category:'ecommerce',
                label:'Added shipping info',
                value:1
            })
            router.push('/checkout/payment')
        }
    });


    return (
        <div>
            {loading ?
                <div style={{ height: "80vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularIndeterminate />
                </div>
                :

                <div>

                    {/* OrderSummarySm will be viewable on smaller devices*/}
                    <OrderSummarySm checkoutData={checkout} />

                    <Container maxWidth="lg">

                        <form onSubmit={formik.handleSubmit}>
                            <div className={styles.parent_container}>
                                <div className={styles.left_container}>
                                    <div className={styles.logo_lg}>
                                        <img src='https://lapcare.sgp1.digitaloceanspaces.com/lapcare-logo-u.png'
                                            width={220}
                                            height={40}
                                        />
                                    </div>

                                    {/* Checkout Steps Component */}
                                    <CheckoutSteps status='information' />
                                    {savedAddresses !== undefined && savedAddresses.length !==0 ?
                                        <div style={{ margin: "2rem 0" }}>
                                            <Typography variant="h6" gutterBottom>Saved Addresses</Typography>
                                            {savedAddresses.map(data => (
                                                <div style={{ border: "1px solid #e6e6e6", margin: "1rem 0", padding: "1rem", display: 'flex', flexFlow: "row nowrap" }} key={data._id}>
                                                    <Radio
                                                        checked={selectedAddressId === data._id}
                                                        onChange={() => handleSelectAddress(data)}
                                                        style={{ marginRight: '14px' }}
                                                        value="a"
                                                        name="radio-button-demo"
                                                        inputProps={{ 'aria-label': 'A' }}
                                                    />
                                                    <div>
                                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                            <p style={{ fontWeight: "500", lineHeight: 2 }}>{data.fullName}  {data.phoneNumber}</p>
                                                        </div>
                                                        <p>{data.addressLine1}, {data.addressLine2}, {data.city}, {data.state}- {data.pinCode}</p>
                                                    </div>
                                                </div>

                                            ))}
                                        </div> : null}

                                    {savedAddresses !== undefined && savedAddresses.length !== 0 ?
                                        <Button onClick={handleShowAddNewAddressContainer} color="primary" variant="outlined" disableElevation>
                                            <AddRounded />
                                            <p>Add a New Address</p>
                                        </Button>
                                        : null}

                                    {showAddNewAddress ?
                                        <div>
                                            <ShippingAddress formik={formik} />

                                            <div>
                                                <FormControlLabel checked={!showBillingAddress} style={{ margin: "14px 0" }}
                                                    control={<Checkbox checked={!showBillingAddress} onClick={() => setshowBillingAddress(!showBillingAddress)} />}
                                                    label="Billing Address Same as Shipping Address"
                                                />
                                                {showBillingAddress ?
                                                    <BillingAddress formik={formik} /> : null
                                                }
                                            </div>
                                        </div>
                                        : null}



                                    <Button variant="contained" color="primary" disableElevation type="submit" fullWidth style={{ marginTop: "1.5rem" }} className={styles.submit_button_sm}>
                                        Continue to payment method
                                    </Button>

                                </div>

                                {/* Order Summary Right Container only viewable for large screen devices */}
                                <div className={styles.right_container}>
                                    <div style={{ marginTop: "2rem" }}>
                                        <OrderSummary checkoutData={checkout} />

                                        <Button variant="contained" color="primary" disableElevation type="submit" style={{ fontSize: "1.1rem", textTransform: "none", fontWeight: "600", margin: "1rem 0" }} fullWidth>
                                            <PaymentRoundedIcon style={{ display: "inline-block", marginRight: "5px" }} /> Payment Methods
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </form>

                    </Container>
                </div>
            }
        </div>


    )
}


export default withAuth(Address)