import {Outlet} from "react-router-dom";
import {Header} from "../index.js";
import {useUser} from "../../context/User.context.jsx";
import {useEffect} from "react";

function MainLayout() {
    const {getUser} = useUser();

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <>
            <Header/>
            <div>
                <Outlet/>
            </div>
        </>
    )
}

export default MainLayout;
