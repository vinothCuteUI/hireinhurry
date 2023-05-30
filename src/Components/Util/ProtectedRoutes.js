import React, { useEffect, useState } from "react";
import { Outlet, Route, useNavigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('user-token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/auth/login');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
            checkUserToken();
        }, [isLoggedIn]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? <Outlet /> : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoutes;