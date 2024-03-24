import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import {NAVIGATION_LIST} from "./data/constants/navigation";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {NAVIGATION_LIST.map((navigationUrl, i) => <Route key={i} path={navigationUrl.url} element={<navigationUrl.page />} />)}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
