import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddBlog from "./pages/AddBlog/AddBlog";
import SingleBlog from "./components/SingleBlog/SingleBlog";
import { Blogs } from "./pages/Blogs/Blogs";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import ProtectedRoutes from "./components/ProtectedRoute/ProtectedRoute";
import EditBlog from "./components/editBlog/EditBlog";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoutes />}>
        <Route exact path="/" element={<Home />} />

        <Route path="/post/:id" element={<SingleBlog />} />
        <Route path="/allblogs" element={<Blogs />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/addblog" element={<AddBlog />} />
        <Route path="/editblog" element={<EditBlog />} />
      </Route>
    </Routes>
  );
};

export default App;
