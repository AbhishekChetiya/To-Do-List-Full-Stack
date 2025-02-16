import React, { useState ,useEffect ,useContext} from 'react';
import './Login.css'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { Loginpost } from '../Constant/LoginBackendlink';
import { AppContext } from './LoginContext';
const Login = () => {
  const { logoutUser , loginUser} = useContext(AppContext);
  const navigation = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.removeItem("user");
      logoutUser();
    }
  }, []);

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await Loginpost(form);
    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        loginUser(result.data.data);
        tosti(result.data.message);
        navigation("/");
        setUser(result.data.data);
      } else {
        tosti(result.data.message);
       
      }
    }
  };

  const tosti = (e) => {
    toast(e);
  }
  return (
    <div className='main' >
      <div className='login-form'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name='username'
              onChange={(e) => setForm({ ...form, "username": e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name='password'
              onChange={(e) => setForm({ ...form, "password": e.target.value })}
              required
            />
          </div>
          <button onClick={handleSubmit} type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer position="top-center" theme="light" />
    </div>
  );
};

export default Login;
