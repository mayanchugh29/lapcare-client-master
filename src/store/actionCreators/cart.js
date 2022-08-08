import request from '../../middlewares/axios/post'
import {
    ADD_TO_CART,
    INC_QUANTITY,
    DEC_QUANTITY,
    REMOVE_FROM_CART,
    MERGE_CART,
    UPDATE_CART_SUBTOTAL
} from '../actionTypes/product';
import {
    SET_TOASTIFY
} from '../actionTypes/toastify'
import deleteRequest from '../../middlewares/axios/delete';
import putRequest from '../../middlewares/axios/put';
import postRequest from '../../middlewares/axios/post'
import {
    encrypt
} from '../../middlewares/secure/encrypt';


export const mergeCart = (token,cartValue) => {
    let cartfromLocalStorage = JSON.parse(localStorage.getItem('cart'));

    if (cartfromLocalStorage) {
        const products = [];
        let populatedCartfromLocalStorage = [];
        const finalCart = [];
        let subtotal = 0;
        let tax = 0;
        let discount=0;

        cartfromLocalStorage = cartfromLocalStorage.filter( item=> {
            for( let i=0;i<cartValue.length; i++ ){
                if( cartValue[i].product._id === item.product ) {
                    return false;
                }
            }
            return true;
        });

        cartfromLocalStorage.forEach(cartItem => {
            products.push(cartItem.product);
        })

        return async dispatch => {
            const response = await request('/cart/guest', {
                products
            });
            if (response.status === 200) {
                cartfromLocalStorage.forEach((cartItem, i) => {
                    cartItem.product = response.data.products[i]
                    populatedCartfromLocalStorage.push(cartItem)
                })

                const mergedCart = [...populatedCartfromLocalStorage,...cartValue]

                mergedCart.map(cartItem => {
                    cartItem.productPrice = cartItem.product.sellingPrice * cartItem.quantity;
                    subtotal += cartItem.productPrice
                    discount = discount  + ((cartItem.product.costPrice-cartItem.product.sellingPrice)*cartItem.quantity)
                    tax = tax + ((Math.round((18/100)*cartItem.product.sellingPrice))*cartItem.quantity)
                    finalCart.push(cartItem)
                })

                dispatch({
                    type: MERGE_CART,
                    payload: {
                        cartProducts: finalCart,
                        subtotal: subtotal,
                        discount:discount,
                        tax:tax
                    }
                })
                localStorage.removeItem('cart')
                

            } else {
                dispatch({
                    type: SET_TOASTIFY,
                    payload: {
                        msg: 'Could not fetch your Cart!',
                        type: 'error',
                        open: true

                    }
                })

            }
            
            dispatch(setCartItems(token,cartfromLocalStorage))
            
        }

    } else {
        // For Authenticated users  
        const newArray = [];
        let subtotal = 0;
        let discount = 0;
        let tax= 0;
        cartValue.map(cartItem => {
            cartItem.productPrice = cartItem.product.sellingPrice * cartItem.quantity;
            subtotal += cartItem.productPrice
            discount = discount  + ((cartItem.product.costPrice-cartItem.product.sellingPrice)*cartItem.quantity)
            tax = tax + ((Math.round((18/100)*cartItem.product.sellingPrice))*cartItem.quantity)
            newArray.push(cartItem)
        })

        return dispatch => {
            dispatch({
                type: MERGE_CART,
                payload: {
                    cartProducts: newArray,
                    subtotal: subtotal,
                    discount:discount,
                    tax:tax
                }
            })
        }
    }

}



export const addToCart = (productObject, token) => {
    return async dispatch => {
        if (token) {
            // User is authenticated then add the product object to the cartValue of the user in the db
            const response = await request('/cart', {
                productId: productObject.product._id
            }, token)
            if (response.status === 200) {
                
                // If request is successful then save the productObject in the cartReducer Redux store locally
                dispatch({
                    type: ADD_TO_CART,
                    product: productObject
                })
                dispatch({
                    type: UPDATE_CART_SUBTOTAL
                })
                dispatch({
                    type: SET_TOASTIFY,
                    payload: {
                        msg: 'Added to Cart',
                        type: 'success',
                        open: true

                    }
                })
            } else {
                dispatch({
                    type: SET_TOASTIFY,
                    payload: {
                        msg: 'Failed to Add the Product to the Cart!',
                        type: 'error',
                        open: true

                    }
                })
            }
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: productObject
            })
            dispatch({
                type: UPDATE_CART_SUBTOTAL
            })
            dispatch({
                type: SET_TOASTIFY,
                payload: {
                    msg: 'Added to Cart',
                    type: 'success',
                    open: true

                }
            })
            // User isn't authenticated then push the productObject in the cartArray stored locally in browser
            const cartInLocalStorage = JSON.parse(localStorage.getItem('cart'));
            cartInLocalStorage !== null ? localStorage.setItem('cart', JSON.stringify([...cartInLocalStorage, {
                    quantity: productObject.quantity,
                    product: productObject.product._id
                }])) :
                localStorage.setItem('cart', JSON.stringify([{
                    quantity: productObject.quantity,
                    product: productObject.product._id
                }]))
        }

    }
}

export const removeFromCart = (productId, token) => {
    return async dispatch => {
        if (token) {
            const response = await deleteRequest(`/cart/${productId}`, token)
            if (response.status === 200) {
                dispatch({
                    type: REMOVE_FROM_CART,
                    product: productId
                })
                dispatch({
                    type: UPDATE_CART_SUBTOTAL
                })
                dispatch({
                    type: SET_TOASTIFY,
                    payload: {
                        msg: 'Product removed from your Cart!',
                        type: 'success',
                        open: true

                    }
                })
            } else {
                dispatch({
                    type: SET_TOASTIFY,
                    payload: {
                        msg: 'Product could not be removed!',
                        type: 'error',
                        open: true

                    }
                })
            }
        } else {
            dispatch({
                type: REMOVE_FROM_CART,
                product: productId
            })
            dispatch({
                type: UPDATE_CART_SUBTOTAL
            })
            dispatch({
                type: SET_TOASTIFY,
                payload: {
                    msg: 'Product removed from your Cart!',
                    type: 'success',
                    open: true

                }
            })
            const cartInLocalStorage = JSON.parse(localStorage.getItem('cart'));
            const updatedCart = cartInLocalStorage.filter(cartItem => {
                return cartItem.product !== productId
            })
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            encrypt(JSON.stringify(updatedCart))

        }

    }
}


export const updateCartQuantity = (productId, quantity, index, method, token) => {
    if (method === 'inc') {
        return async dispatch => {
            dispatch({
                type: INC_QUANTITY,
                payload: index
            })
            dispatch({
                type: UPDATE_CART_SUBTOTAL
            })
            if (token) {
                const response = putRequest('/cart', {
                    productId: productId,
                    quantity: quantity + 1
                }, token)
            } else {
                const cartInLocalStorage = JSON.parse(localStorage.getItem('cart'));
                const updatedCart = cartInLocalStorage.map((cartItem, i) => i === index ? {
                    ...cartItem,
                    quantity: cartItem.quantity += 1
                } : cartItem)
                localStorage.setItem('cart', JSON.stringify(updatedCart))
            }
        }


    } else {
        return async dispatch => {
            dispatch({
                type: DEC_QUANTITY,
                payload: index
            })
            dispatch({
                type: UPDATE_CART_SUBTOTAL
            })
            if (token) {
                const response = putRequest('/cart', {
                    productId: productId,
                    quantity: quantity - 1
                }, token)
            } else {
                const cartInLocalStorage = JSON.parse(localStorage.getItem('cart'));
                const updatedCart = cartInLocalStorage.map((cartItem, i) => i === index ? {
                    ...cartItem,
                    quantity: cartItem.quantity += -1
                } : cartItem)
                localStorage.setItem('cart', JSON.stringify(updatedCart))
            }
        }
    }
}


export const getCartfromLocalStorage = (cartValue) => {
    if (cartValue) {
        const products = [];
        const populatedCart = []
        let subtotal = 0;
        let tax=0;
        let discount = 0;
        cartValue.forEach(cartItem => {
            products.push(cartItem.product);
        })
        return async dispatch => {
            const response = await request('/cart/guest', {
                products
            });
            if (response.status === 200) {
                cartValue.forEach((cartItem, i) => {
                    cartItem.product = response.data.products[i]
                    cartItem.productPrice = cartItem.product.sellingPrice * cartItem.quantity;
                    subtotal += cartItem.productPrice
                    discount = discount  + ((cartItem.product.costPrice-cartItem.product.sellingPrice)*cartItem.quantity)
                    tax = tax + ((Math.round((18/100)*cartItem.product.sellingPrice))*cartItem.quantity)
                    populatedCart.push(cartItem)
                })
                dispatch({
                    type: MERGE_CART,
                    payload: {
                        cartProducts: populatedCart,
                        subtotal: subtotal,
                        tax:tax,
                        discount:discount
                    }
                })
            } else {
                dispatch({
                    type: SET_TOASTIFY,
                    payload: {
                        msg: 'Could not fetch your Cart!',
                        type: 'error',
                        open: true

                    }
                })
            }
        }
    } else {
        return dispatch => {
            dispatch({
                type: MERGE_CART,
                payload: {
                    cartProducts: [],
                    subtotal: 0
                }
            })
        }

    }

}

export const setCartItems = (token,cartValue)=>{
    return async dispatch =>{
        if(cartValue===undefined){
            const response  = await postRequest('/cart/set',{cartValue:[]},token)
            dispatch({
                type: MERGE_CART,
                payload: {
                    cartProducts: [],
                    subtotal: 0
                }
            })
        }else{
            const response  = await postRequest('/cart/set',{cartValue:cartValue},token)
        }
    }
}