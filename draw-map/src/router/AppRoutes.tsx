
// AppRoutes.js
import { Route, Routes } from 'react-router-dom';

import MapPage from "../pages/map";
import PersonPage from "../pages/person";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/undermap" element={<MapPage />} />
            <Route path="/person" element={<PersonPage />} />
        </Routes>
    );
}

export default AppRoutes;
