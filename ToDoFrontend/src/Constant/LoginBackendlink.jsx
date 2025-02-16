import axios from "axios"
import { getLocalStorageItem } from "../helpers";

const url = `${import.meta.env.VITE_BACKEND_URL}/Login`;
const url1 = `${import.meta.env.VITE_BACKEND_URL}/register`;
const url2 = `${import.meta.env.VITE_BACKEND_URL}/createtodo`;
const url3 = `${import.meta.env.VITE_BACKEND_URL}/MarkTodo`;
const url4 = `${import.meta.env.VITE_BACKEND_URL}/Deletedto`;
const url5 = `${import.meta.env.VITE_BACKEND_URL}/GetTodo`;
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
