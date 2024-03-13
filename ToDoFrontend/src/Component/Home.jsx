import React from 'react'
import { useEffect } from 'react';
const Home = () => {
  useEffect(() => { // Import useEffect hook
    const user = localStorage.getItem("user");
    if (user) {
      // window.location.reload();
    }
  }, []);
  return (
    <div>
      home
    </div>
  )
}

export default Home