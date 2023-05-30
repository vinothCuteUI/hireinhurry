import React from "react";
import { Outlet } from "react-router-dom";
import Header from './Header/Header';

const Protal = () => {
    return (
        <React.Fragment>
            <Header />
            <Outlet />
        </React.Fragment>
    );
}
export default Protal;