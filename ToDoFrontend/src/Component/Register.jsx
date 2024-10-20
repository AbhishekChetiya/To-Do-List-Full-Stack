import React, { useState, useContext } from 'react';
import './Register.css';
import { Registerpost } from '../Constant/LoginBackendlink';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {AppContext} from './LoginContext.jsx';
const Register = () => {
  const { loginUser } = useContext(AppContext);
  const [form, setForm] = useState({
    name: "", // Added the new field for name
    username: "",
    email: "",
    password: "",
  });
  const navigation = useNavigate(); // Import useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can submit the form data to your backend or perform any other actions
    const result = await Registerpost(form);
    if (result.data == 200) {
      if (result.data.status == 200) {
        console.log('Form submitted:', form);
        toast(result.data.message)
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        loginUser(result.data.data);
      }
      else {
        toast(result.data.message)
      }
    }
    else
      toast("Some Things Went Wrong")
  }

  return (
    <div className="main">
      <div className='form-container'>
        <h2>Register Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer position="top-center" theme="light" />
    </div>

  );
};

export default Register;
