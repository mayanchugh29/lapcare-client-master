import {
    ADD_ADDRESS,
    CHECKOUT_ERROR,
    CHECKOUT_PRODUCT,
    ENABLE_COD
} from "../actionTypes/checkout";
import Cookies from 'js-cookie';
import request from '../../middlewares/axios/post'
import {
    SET_TOASTIFY
} from "../actionTypes/toastify";
import CryptoJS from 'crypto-js'
import { checkPinCodeAvaibility } from "../../helpers/checkPincode";
import { checkProductIsSoftware } from "../../helpers/checkProduct";

export const checkoutProducts = (payload) => {
    return dispatch => {
        dispatch({
            type: CHECKOUT_PRODUCT,
            payload
        })
    }
}

export const getCheckoutProductsfromCookie = () => {
    const encryptedCookie = Cookies.get('checkout');
    const shippingAddressfromCookies = Cookies.get('shippingAddress')
    const billingAddressfromCookies = Cookies.get('billingAddress')
    if (encryptedCookie) {

        const bytes = CryptoJS.AES.decrypt(encryptedCookie, 'encrypt241998');
        const checkoutfromCookies = bytes.toString(CryptoJS.enc.Utf8);

        const checkout = JSON.parse(checkoutfromCookies)
        const products = [];
        const populatedCheckoutData = [];
        let subtotal = 0;
        let discount = 0;
        let tax = 0;

        checkout.map(item => (
            products.push(item.product)
        ))
        return async dispatch => {
            const response = await request('/cart/guest', {
                products
            });
            if (response.status === 200) {
                checkout.forEach((item, i) => {
                    item.product = response.data.products[i]
                    item.productPrice = item.product.sellingPrice * item.quantity;
                    subtotal += item.productPrice
                    discount = discount + (item.product.costPrice - item.product.sellingPrice)*item.quantity
                    tax = tax + Math.round(((18 / 100) * item.product.sellingPrice))*item.quantity
                    populatedCheckoutData.push(item)
                })
                const payload = {
                    products: populatedCheckoutData,
                    subtotal: subtotal < 500 ? subtotal + 49 : subtotal,
                    discount,
                    tax,
                    shipping: subtotal < 500 ? 49 : 0
                }
                dispatch(checkoutProducts(payload))
                if (billingAddressfromCookies && shippingAddressfromCookies) {
                    const billingAddress = JSON.parse(billingAddressfromCookies)
                    const shippingAddress = JSON.parse(shippingAddressfromCookies)
                    dispatch({
                        type: ADD_ADDRESS,
                        shippingAddress,
                        billingAddress
                    })
                    const productIsSoftware = await checkProductIsSoftware(populatedCheckoutData)
                    const avaibility = await checkPinCodeAvaibility(shippingAddress.pinCode)
                    if(avaibility && payload.subtotal>500 && !productIsSoftware){
                        dispatch({
                            type:ENABLE_COD,
                            payload:true
                        })
                    }else{
                        dispatch({
                            type:ENABLE_COD,
                            payload:false
                        })
                    }
                } else{
                    dispatch({
                        type: ADD_ADDRESS,
                        shippingAddress: null,
                        billingAddress: null
                    })
                }
            } else {
                dispatch({
                    type: CHECKOUT_ERROR
                })
                dispatch({
                    type: SET_TOASTIFY,
                    payload: {
                        msg: 'Something went wrong!',
                        type: 'error',
                        open: true

                    }
                })
            }
        }
    } else {
        return dispatch => {
            dispatch({
                type: CHECKOUT_ERROR
            })
        }
    }


}