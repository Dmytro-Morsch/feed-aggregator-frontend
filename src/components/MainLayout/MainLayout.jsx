import {Outlet} from "react-router-dom";
import {Header} from "../index.js";

function MainLayout() {
    return (
        <>
            <Header/>
            <div><Outlet/></div>
        </>
    )
}

export default MainLayout;
