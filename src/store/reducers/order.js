import * as actionTypes from '../actionTypes/order';
import { updateObject } from '../utility';

const orderDetails = {
    data:null
}

const orderDetailsReducer = (state = orderDetails, action) => {
    switch (action.type) {
        case actionTypes.ADD_ORDER_DETAILS:
            return updateObject(state, {
                orderDetails: action.payload
            })
        default:
            return state
    }

}


export default orderDetailsReducer