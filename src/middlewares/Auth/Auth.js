import { useRouter } from 'next/router';
import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CircularIndeterminate from '../../components/common/spinner/Spinner';
import { getCartfromLocalStorage } from '../../store/actionCreators/cart';
import { loginUser } from '../../store/actionCreators/logIn';




const AuthFunction = ({ children }) => {
    const dispatch = useDispatch();
    
    const token = useSelector(state => state.authReducer.token)
    const [loading, setloading] = useState(true)
    useEffect(() => {
        if (!token) {
            // if token isn't in a redux store
            const tokenStoredInBrowser = localStorage.getItem('token');
            if (tokenStoredInBrowser) {
                // if token is there in local storage
                dispatch(loginUser( tokenStoredInBrowser));
                setloading(false)
                
            } else {
                // if token isn't in the local storage thenm user is umauthenticated
                const cart = JSON.parse(localStorage.getItem('cart'))
                dispatch(getCartfromLocalStorage(cart));
                setloading(false)
                
                    
            }
        }else{
            // if token is stored in redux store
            setloading(false)
        }
    }, [])

    return <>{loading?<div style={{height:"80vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}><CircularIndeterminate /></div>:children}</>
}

export default AuthFunction