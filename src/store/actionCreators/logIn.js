import {LOGIN_USER, LOGOUT_USER} from '../actionTypes/user';
import {AUTH_FAILURE, AUTH_SUCCESS,RESET_TOKEN} from '../actionTypes/auth'
import request from '../../middlewares/axios/get'
import { mergeCart } from './cart';
import { MERGE_CART } from '../actionTypes/product';
import { getCheckoutProductsfromCookie } from './checkout';

export const loginUser = (token) => {

    return async dispatch => {
        dispatch({
            type: AUTH_SUCCESS,
            token: token
        })
        const response = await request(`/me`,token)
            if(response.status ===200){
                dispatch({
                    type: LOGIN_USER,
                    payload: response.data.userData
                });
                dispatch(getCheckoutProductsfromCookie())
                dispatch(mergeCart(token,response.data.userData.cartValue))
            }else{
                localStorage.removeItem('token');
                dispatch({
                    type:RESET_TOKEN
                })
                dispatch({
                    type:AUTH_FAILURE,
                    error:true
                })
                dispatch({
                    type: MERGE_CART,
                    payload: {
                        cartProducts: [],
                        subtotal: 0
                    }
                })
            }
    };
};