import * as actionTypes from '../actionTypes/user';
import {
    updateObject
} from '../utility'

const initialState = {
    fname: '',
    lname: '',
    email: '',
    gender: '',
    contact: '',
    wishlist: '',
    savedAddresses: [],
    wishlist: [],
    newUser:false,

}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER:
            return updateObject(state, {
                fname: action.payload.fname,
                lname: action.payload.lname,
                email: action.payload.email,
                gender: action.payload.gender,
                contact: action.payload.contact,
                wishlist: action.payload.wishlist,
                savedAddresses: action.payload.savedAddresses,
                wishlist: action.payload.wishlist,
                newUser:action.payload.newUser
            })
        case actionTypes.LOGOUT_USER:
            return updateObject(state, {
                fname: '',
                lname: '',
                email: '',
                gender: '',
                contact: '',
                wishlist: '',
                savedAddresses: [],
                wishlist: [],
                newUser:false
            })
        case actionTypes.UPDATE_EMAIL:
           return updateObject(state,{
               email:action.payload
           })
        case actionTypes.ADD_NEW_ADDRESS:
            return updateObject(state,{
                savedAddresses:action.payload
            })
        case actionTypes.DELETE_ADDRESS:
            return updateObject(state,{
                savedAddresses: state.savedAddresses.filter((address) => address._id !== action.payload)
            })
        case actionTypes.UPDATE_PERSONAL_INFO:
            return updateObject(state,{
                fname:action.payload.fname,
                lname:action.payload.lname,
                gender:action.payload.gender,
                contact:action.payload.contact
            })
        default:
            return state


    }
}

export default userReducer;