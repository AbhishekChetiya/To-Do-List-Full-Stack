import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import todoicon from '../assets/todoicon.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setUser(userData);
    if(userData){
      toast("Welcome To Your Worksheet")
    }
  }, []); // Add user to the dependency array

  return (
    <div>
      <nav>
        <img src={todoicon} alt="todoicon" />
        <h3>ToDoList</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>
            <Link to="/login">
              {user ? "Logout" : "Login"}
            </Link>
          </li>
          <li><Link to={user ? "/" : "/register"}>{user ? "" : "Resgister"}</Link></li>
        </ul>
      </nav>
      <ToastContainer/>
    </div>
  );
};

export default Header;
