import {SHA256} from 'crypto-js'
import crypto from 'crypto'


export const encrypt = (data)=>{
    console.log(SHA256(data));
}