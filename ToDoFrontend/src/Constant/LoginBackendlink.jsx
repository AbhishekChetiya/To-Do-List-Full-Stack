import axios from "axios"
const url = 'http://localhost:3000/Page/Login';
const url1 = 'http://localhost:3000/Page/register';


export const  Loginpost = async (data)=>{
    return (await axios.post(url,data));
} 

export const Registerpost = async (data) =>{
    return (await axios.post(url1,data));
}