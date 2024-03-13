import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Component/Home.jsx';
import Login from './Component/Login.jsx';
import Register from './Component/Register.jsx';
import Header from './Component/Header.jsx';
import Footer from './Component/Footer.jsx';
import { useState } from 'react';

function App() {
  const storedData = localStorage.getItem('user');
  const [user, setUser] = useState(JSON.parse(storedData));

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register user={user} setUser={setUser}/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
