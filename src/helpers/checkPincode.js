import request from '../middlewares/axios/post'

export const checkPinCodeAvaibility = async(pincode)=>{
    const data ={
        delivery_postcode:pincode,
        product:{}
    }
    const response = await request('/order/delivery',data);
    if(response.status===200){
        return true
    }else{
        return false
    }
}
