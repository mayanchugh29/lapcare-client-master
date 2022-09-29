import React, { useEffect, useState } from 'react';
import styles from '../styles/Cart.module.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import * as gtag from '../src/helpers/gtag'


//Redux store Imports
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../src/store/actionCreators/cart';
import { checkoutProducts } from '../src/store/actionCreators/checkout';

//Material Ui Imports
import { Button,Container, Typography } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

//Page Components
import AccBreadcrumbs from '../src/components/common/breadcrumbs/AccBreadcrumbs';
import CircularIndeterminate from '../src/components/common/spinner/Spinner';
import { SET_TOASTIFY } from '../src/store/actionTypes/toastify';
import { checkProductIsSoftware } from '../src/helpers/checkProduct';



const Cart = () => {
    const [loading, setloading] = useState(true)
    const router = useRouter();
    const dispatch = useDispatch()
    const token = useSelector(state => state.authReducer.token)
    const cart = useSelector((state) => state.cartReducer)

    
    useEffect(() => {
        if (cart.products !== undefined) {
            setloading(false);
        }
    }, [cart])



    const handleCheckout = async() => {
        let subtotal = cart.subtotal;
        let shipping = 0;
        const productIsSoftware = await checkProductIsSoftware(cart.products)
        if(productIsSoftware && cart.products.length===1){
            subtotal = cart.subtotal;
            shipping = 0;
        }else{
            subtotal= cart.subtotal<500?(cart.subtotal+49):cart.subtotal
            shipping=cart.subtotal<500?49:0
        }
        const payload = {
            products: cart.products,
            subtotal: subtotal,
            tax:Math.round(cart.tax),
            discount:cart.discount,
            shipping:shipping
        }
        const products = [];
        payload.products.map(item => (
            products.push({ quantity: item.quantity, product: item.product._id })
        ))

        dispatch(checkoutProducts(payload));
        const encryptedCookie = CryptoJS.AES.encrypt(JSON.stringify(products), 'encrypt241998').toString();
        const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
        Cookies.set('checkout', encryptedCookie, { expires: inFifteenMinutes })
        gtag.event({
            action:"begin_checkout",
            category:'ecommerce',
            label:'Initiated checkout',
            value:`${cart.subtotal}`
        })
        router.push('/checkout/address')
    }

    const handleChangeQuantity = (productId, quantity, index, method) => {
        if(method==='dec' && quantity===1){
            dispatch({
                type:SET_TOASTIFY,
                payload:{
                    type:'info',
                    open:true,
                    msg:"Already selected the minimum quanitity of the Product!"
                }
            })
        }else{
            dispatch(updateCartQuantity(productId, quantity, index, method, token))
        }
    }



    return (
        <div>
            <AccBreadcrumbs breadcrumbs={[{ routeName: 'Home', route: '/' }, { routeName: 'Cart', route: '/cart' }]} />
            <Container maxWidth="lg">
                <div className={styles.cart_container}>
                    {loading ?
                        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CircularIndeterminate />
                        </div>
                        :
                        <div>
                            <div className={styles.cart_header}>
                                <Typography variant="h5" style={{ fontWeight: "500" }} align="center">My Cart</Typography>
                                {cart.products.length !== 0?
                                    <Button variant="contained" color="primary" disableElevation onClick={() => handleCheckout()}>Checkout</Button>:null
                                }
                                
                            </div>
                            {cart.products.length !== 0 ?
                                <div>
                                    {cart.products.map((cartItem, i) => (
                                        <div className={styles.cart_items_container} key={i}>
                                            <div className={styles.product_container}>
                                                <img src={cartItem.product.images[0]} alt="product image" height={65} width={65} />
                                                <p className={styles.product_name}>{cartItem.product.name}</p>
                                            </div>

                                            <div className={styles.product_quantity_container}>
                                                <AddCircleOutlineOutlinedIcon
                                                    onClick={() => handleChangeQuantity(cartItem.product._id, cartItem.quantity, i, 'inc')}
                                                    style={{ marginRight: "5px", color: "grey", cursor: "pointer" }}
                                                />
                                                <p className={styles.product_quantity}>{cartItem.quantity}</p>
                                                <RemoveCircleOutlineOutlinedIcon
                                                    onClick={() => handleChangeQuantity(cartItem.product._id, cartItem.quantity, i, 'dec')}
                                                    style={{ marginLeft: "5px", color: "grey", cursor: "pointer" }}
                                                />
                                            </div>
                                            <p className={styles.product_price}>&#8377;{cartItem.productPrice}</p>
                                            <ClearRoundedIcon onClick={() => {dispatch(removeFromCart(cartItem.product._id, token)); gtag.event({action:"remove_from_cart",category:'ecommerce',label:'Product removed from cart',value:1})}} style={{cursor:"pointer"}} />
                                        </div>

                                    ))}
                                    <div style={{ padding: "0.8rem" }}>
                                        <p className={styles.cart_subtotal_text}>Subtotal  ({cart.products.length +' ' +'Products'}): {'   '+cart.subtotal}</p>
                                    </div>
                                </div> :
                                <div className={styles.cart_empty_container}>
                                    <img src="https://lapcare-static.s3.ap-south-1.amazonaws.com/home/cart.png" alt="cart-empty" height={65} width={65} className={styles.cart_image} />
                                    <p>Your cart is empty!</p>
                                    <p style={{ fontSize: "0.9rem", fontWeight: "400", color: "grey" }}>Add items to it now.</p>
                                    <Button variant="outlined" color="primary" onClick={() => router.push('/')}>Shop Now</Button>
                                </div>
                            }
                        </div>

                    }


                </div>
            </Container >
        </div>
    )
}

export default Cart