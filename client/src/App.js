// import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginUser from "./components/user/login";
import SignupUser from "./components/user/signup";
import HomeUser from "./components/user/home";
import Book from "./components/user/book";
import Dashboard from "./components/user/dashboard";
import UserAuth from "./protectedRoutes/userAuth";
import { IndexRedirect } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>

        <Route exact path={'/'} element={<HomeUser/>}>

        <Route element={<UserAuth />}>
          <Route  path="/dashboard"  element={<Dashboard />} />
        </Route>
        
        <Route element={<UserAuth />}>
          <Route path="/booking"  element={<Book />} />
        </Route>

        </Route>


        <Route path="/login" element={<LoginUser />} />
        <Route path="/signup" element={<SignupUser />} />
      </Routes>
    </Router>
  );
}

export default App;
