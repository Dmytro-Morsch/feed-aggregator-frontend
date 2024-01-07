import {BrowserRouter, Route, Routes} from "react-router-dom";

import {Home, MainLayout} from "./components";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
