import * as actionTypes from '../actionTypes/checkout';
import { updateObject } from '../utility'

const checkoutProduct = {
    products: [],
    billingAddress: null,
    shippingAddress:null,
    subtotal:0,
    discount:0,
    couponDiscount:0,
    tax:0,
    shipping:0,
    error:true,
    couponApplied:false,
    couponCode:'',
    cod:false,
    initialSubtotal:0
}



const checkoutProductReducer = (state = checkoutProduct, action) => {
    switch (action.type) {
        case actionTypes.CHECKOUT_PRODUCT:
            return updateObject(state, {
                products: action.payload.products,
                subtotal: action.payload.subtotal,
                initialSubtotal:action.payload.subtotal,
                discount: action.payload.discount,
                tax: action.payload.tax,
                shipping: action.payload.shipping,
                error:false,
                couponDiscount:0
            })
            case actionTypes.ADD_ADDRESS:
                return updateObject(state, {
                    billingAddress:action.billingAddress,
                    shippingAddress:action.shippingAddress,
                    error:false
                })
            case actionTypes.CHECKOUT_ERROR:
                return updateObject(state, {
                    error:true
                })
            case actionTypes.APPLY_COUPON:
                return updateObject(state,{
                    subtotal:action.payload.subtotal,
                    couponApplied:true,
                    couponDiscount:action.payload.couponDiscount,
                    couponCode:`(${action.payload.couponCode})`,
                    error:false
                })
            case actionTypes.REMOVE_COUPON:
                return updateObject(state,{
                    subtotal:action.payload.subtotal,
                    couponApplied:false,
                    couponDiscount:0,
                    couponCode:'',
                    error:false
                })
            case actionTypes.ENABLE_COD:
                return updateObject(state,{
                    cod:action.payload
                })
            case actionTypes.REMOVE_SHIPPING_CHARGES:
                return  updateObject(state,{
                    shipping:0,
                    subtotal:state.subtotal-49

                })
        default:
            return state
    }

}


export default checkoutProductReducer;