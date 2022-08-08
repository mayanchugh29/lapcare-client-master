import * as actionTypes from '../actionTypes/product';
import { updateObject } from '../utility'

const cartInitialState = {
    products:[],
    subtotal:0,
    tax:0,
    discount:0,
}

const updateCartSubtotal = (cartProducts)=>{
    let subtotal=0;
    cartProducts.map(cartItem=>{
        subtotal+=cartItem.productPrice
    })
    return subtotal
}

const updateCartTax = (cartProducts)=>{
    let tax = 0;
    cartProducts.map(cartItem=>{
        tax += ((Math.round((18/100)*cartItem.product.sellingPrice))*cartItem.quantity)
    })
    return tax
}

const updateCartDiscount = (cartProducts)=>{
    let discount=0;
    cartProducts.map(cartItem=>{
        discount = discount+ ((cartItem.product.costPrice-cartItem.product.sellingPrice)*cartItem.quantity)
    })
    return discount
}







const cartReducer = (state = cartInitialState, action) => {
    const newList = state.products ? [...state.products] : [];
    switch (action.type) {
        case actionTypes.MERGE_CART:
            return updateObject(state,{
                products:action.payload.cartProducts,
                subtotal:action.payload.subtotal,
                tax:action.payload.tax,
                discount:action.payload.discount

            })
        case actionTypes.ADD_TO_CART:
            return updateObject(state,{
                products:[action.product,...newList],
            })
        case actionTypes.REMOVE_FROM_CART:
            return updateObject(state, {
                products: newList.filter(cartItem=>{
                    return cartItem.product._id !== action.product
                })
            })
        case actionTypes.INC_QUANTITY:
            return updateObject(state, { 
                products: newList.map((cartItem, i) => 
                           i === action.payload ? {...cartItem, quantity:cartItem.quantity+= 1,productPrice:(cartItem.product.sellingPrice*cartItem.quantity)}: cartItem),       
            })

            
        case actionTypes.DEC_QUANTITY:
            return updateObject(state, { 
                products: newList.map((cartItem, i) => 
                           i === action.payload ? {...cartItem, quantity:cartItem.quantity+= -1,productPrice:(cartItem.product.sellingPrice*cartItem.quantity)}: cartItem)
            })
        case actionTypes.UPDATE_CART_SUBTOTAL:
            return updateObject(state,{
                subtotal:updateCartSubtotal(newList),
                tax:updateCartTax(newList),
                discount:updateCartDiscount(newList)
            })
        default:
            return state

    }

}


export default cartReducer