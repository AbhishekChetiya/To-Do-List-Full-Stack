import React, { useState ,useEffect } from 'react';
import './Login.css'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { Loginpost } from '../Constant/LoginBackendlink';

const Login = () => {
  // State variables to hold the input value
  const navigation = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.removeItem("user");
      window.location.reload();
    }
  }, []);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const result = await Loginpost(form);
    // Here you can add your login logic, such as sending the username and password to a server for authentication
    // Optionally, you can clear the input fields after submission
    if (result.status === 200) {
      if (result.data.status === 200) {
        // Set user data in localStorage when login is successful
        localStorage.setItem("user", JSON.stringify(result.data.data));
        console.log(result.data.data);
        tosti(result.data.message);
        navigation("/");
        window.location.reload();
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
