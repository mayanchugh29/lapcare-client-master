import Login from '../../../pages/login';
import { useDispatch, useSelector} from 'react-redux';

import { useRouter } from "next/router";
import { SET_TOASTIFY } from '../../store/actionTypes/toastify';


const useRedux = () => {
    const token = useSelector(state => state.authReducer.token);
    const error = useSelector(state => state.authReducer.error)
    return {token,error}
}
  


const withAuth = (WrappedComponent) => {

  
  return (props) => {
    // checks whether we are on client / browser or server
    if (typeof window !== "undefined") {
      const {error,token} = useRedux()
      const Router = useRouter();
      const dispatch = useDispatch()

      if (!token) {
        Router.push("/login");
        dispatch({
          type:SET_TOASTIFY,
          payload:{
            msg:'You need to login first!',
            type:'info',
            open:true
          }
        })
        return null;
      }

      if (error) {
        Router.push("/login");
        dispatch({
          type:SET_TOASTIFY,
          payload:{
            msg:'Session Expired!',
            type:'info',
            open:true
          }
        })
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;