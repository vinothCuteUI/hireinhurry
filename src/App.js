import './App.css';
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
      const userToken = localStorage.getItem('user-token');
      if (!userToken || userToken === 'undefined') {
          setIsLoggedIn(false);
      }
      setIsLoggedIn(true);
  }
  useEffect(() => {
      checkUserToken();
  }, [isLoggedIn]);

  return (
    <React.Fragment>
        <Outlet />
    </React.Fragment>
  )
}

export default App;