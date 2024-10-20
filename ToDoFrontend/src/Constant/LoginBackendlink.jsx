import axios from "axios"
import { getLocalStorageItem } from "../helpers";
const url = 'https://to-do-list-full-stack.onrender.com/api/Login';
const url1 = 'https://to-do-list-full-stack.onrender.com/api/register';
const url2 = 'https://to-do-list-full-stack.onrender.com/api/createtodo';
const url3 = 'https://to-do-list-full-stack.onrender.com/api/MarkTodo';
const url4 = 'https://to-do-list-full-stack.onrender.com/api/Deletedto';
const url5 = 'https://to-do-list-full-stack.onrender.com/api/GetTodo';
export const  Loginpost = async (data)=>{
    return (await axios.post(url,data));
} 

export const Registerpost = async (data) =>{
    return (await axios.post(url1,data));
}

export const Createtodo = async (data) =>{
    return (await axios.post(url2,data, {
        headers: {
            Authorization: `Bearer ${getLocalStorageItem("user")?.token}`
        }
    }));
}

export const Gettodo = async() => {
    return ( await axios.get(url5, {
        headers: {
            Authorization: `Bearer ${getLocalStorageItem("user")?.token}`,
        }
    }));
}
export const deletetodo = async (data) =>{
    return (await axios.post(url4,data, {
        headers: {
            Authorization: `Bearer ${getLocalStorageItem("user")?.token}`
        }
    }));
}
export const marktodo = async (data) =>{
    return (await axios.post(url3,data, {
        headers: {
            Authorization: `Bearer ${getLocalStorageItem("user")?.token}`
        }
    }));
}
