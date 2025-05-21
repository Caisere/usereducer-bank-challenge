import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import { BankContext } from "./context/BankContext";
import Login from "./pages/login";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoutes from "./pages/protectedRoutes";



function App() {
    return (
        <AuthContext>
            <BankContext>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="dashboard" element={
                            <ProtectedRoutes>
                                <HomePage />
                            </ProtectedRoutes>
                        } />
                    </Routes>
                </BrowserRouter>
            </BankContext>
        </AuthContext>
    );
}

export default App;
