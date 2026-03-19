import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Error404 from "../pages/Error404";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default AppRoutes;