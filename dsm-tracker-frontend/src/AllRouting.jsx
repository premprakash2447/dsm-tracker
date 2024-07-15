import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Authentication/Login/Login";
import Registration from "./components/Authentication/Registration/Registration";
import Test from "./components/Test";

const AllRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/testmui" element={<Test />} />
    </Routes>
  );
};

export default AllRouting;
