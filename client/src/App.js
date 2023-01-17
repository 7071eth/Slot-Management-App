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
import AdminUser from "./components/admin/hero/dashboard";
import { IndexRedirect } from "react-router-dom";
import AdminLogin from "./components/admin/signin";
import AdminDashboard from "./components/admin/AdminDashboard";
import ApprovedList from "./components/admin/approvedList";
import RejectedList from "./components/admin/rejectedList";
import SlotList from "./components/admin/SlotList";
import AdminAuth from "./protectedRoutes/adminAuth";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={""} element={<HomeUser />}>
          <Route element={<UserAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            exact
            path="/"
            element={<Navigate replace to="/dashboard" />}
          />

          <Route element={<UserAuth />}>
            <Route path="/booking" element={<Book />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginUser />} />
        <Route path="/signup" element={<SignupUser />} />

        <Route exact path={""} element={<AdminUser />}>

          <Route
            path="/admin"
            element={<Navigate replace to="/admin/requests" />}
          />
          <Route element={<AdminAuth/>}>
          <Route path="/admin/requests" element={<AdminDashboard />} />
          <Route path="/admin/approvedList" element={<ApprovedList />} />
          <Route path="/admin/rejectedList" element={<RejectedList />} />
          <Route path="/admin/slotList" element={<SlotList />} />
          </Route>
        </Route>

        <Route path="/admin/signin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
