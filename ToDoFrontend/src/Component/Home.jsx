
import React from 'react';
import { useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import './Home.css';
import { Createtodo, Gettodo, deletetodo, marktodo } from '../Constant/LoginBackendlink';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import moment from 'moment';
import { AppContext } from './LoginContext.jsx';

const Home = () => {
  const { loginUser,logoutUser } = useContext(AppContext);
  const [works, setWorks] = useState([]);
  const [newWork, setNewWork] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem("user");
      if (!user || user === "undefined") {
        navigation("/login");
        loginUser();
      } else {
        try {
          const res = await Gettodo();
          const obj = res.data.data;
          if (Array.isArray(obj)) {
            setWorks(obj);
          } else {
            setWorks([]); 
          }
        } catch (error) {
          console.log(error);
          toast("Failed to load todos");
        }
        
      }
    };

    fetchData();
  }, []);

  const addWork = async () => {
    if (newWork.trim() !== "") {
      const result = await Createtodo({ "Todo": newWork });
      if (result.data.status === 200) {
        const res = await Gettodo();
        const obj = res.data.data;
        if (Array.isArray(obj)) {
          setWorks(obj);
        } else {
          toast("Failed to add todo");
        }
      } else {
        toast(result.data.message);
      }
    }
  };

  const toggleCompleted = async (todos) => {
    const getuser = localStorage.getItem("user");
    const useid = JSON.parse(getuser);
    await marktodo({
      todo_id: todos._id,
      userId: useid.userId,
    });
    const res = await Gettodo();
    const obj = res.data.data;
    if (Array.isArray(obj)) {
      setWorks(obj);
    } else {
      toast("Failed to mark todo");
    }
  };

  const deleteWork = async (todos) => {
    const getuser = localStorage.getItem("user");
    const useid = JSON.parse(getuser);
    await deletetodo({
      todo_id: todos._id,
      userId: useid.userId,
    });
    const res = await Gettodo();
    const obj = res.data.data;
    if (Array.isArray(obj)) {
      setWorks(obj);
    } else {
      toast("Failed to delete todo");
    }
  };

  const blurstate = () => {
    let blur = document.getElementById("Blur");
    blur.classList.toggle('active');
    let box = document.getElementById("popup");
    box.classList.toggle('active');
  };

  const canclebut = () => {
    addWork();
    blurstate();
  };

  return (
    <div className='cantain-everything'>
      <div className="todo-list" id='Blur'>
        <div className='Addwork'>
          <button onClick={() => blurstate()}>Add</button>
        </div>
        {works.map((todos, i) => (
          <div key={i} className={todos.isCompleted ? "completed" : "work-item"}>
            <div className="work-content">
              <div className='data'>{todos.Todo}</div>
              <div className="work-icons">
                <span>{moment(todos.data).fromNow()}</span>
                {todos.isCompleted ? <RxCross2 onClick={() => toggleCompleted(todos)} /> : <IoCheckmarkDoneSharp onClick={() => toggleCompleted(todos)} />}
                <MdDelete onClick={() => deleteWork(todos)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="main-add" id='popup'>
        <textarea className="big-textarea" placeholder="Add work..."
          value={newWork}
          onChange={(e) => setNewWork(e.target.value)}></textarea>
        <div className="button-container">
          <button onClick={canclebut}>Add</button>
          <button onClick={() => blurstate()}>Cancel</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
