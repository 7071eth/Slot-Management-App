// import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginUser from "./components/user/login";
import HomeUser from "./components/user/home";
import SignupUser from "./components/user/signup";
import UserAuth from "./protectedRoutes/userAuth";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserAuth/>}>
          <Route path="/" exact element={<HomeUser />} />
        </Route>
        <Route path="/login" element={<LoginUser />} />
        <Route path="/signup" element={<SignupUser />} />
      </Routes>
    </Router>
  );
}

export default App;
