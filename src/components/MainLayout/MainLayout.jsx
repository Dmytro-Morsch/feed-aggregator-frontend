import {useEffect} from "react";
import {Outlet} from "react-router-dom";

import {useUser} from "../../context/User.context.jsx";

import Header from "../Header/Header.jsx";
import AsideBar from "../AsideBar/AsideBar.jsx";

import './MainLayout.css';

function MainLayout() {
    const {getUser} = useUser();

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <>
            <Header/>
            <div className="container">
                <AsideBar/>
                <div className="outlet">
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default MainLayout;
