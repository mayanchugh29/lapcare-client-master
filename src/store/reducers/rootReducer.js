import authReducer from './auth';
import cartReducer from './cart';
import checkoutProductReducer from './checkout';
import orderDetailsReducer from './order';
import {combineReducers} from 'redux';
import toastifyReducer from './toastify';
import userReducer from './user';
import categoryReducer from './category';


const rootReducer = combineReducers({authReducer,cartReducer,checkoutProductReducer,orderDetailsReducer,toastifyReducer,userReducer,categoryReducer});

export default rootReducer