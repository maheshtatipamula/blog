import React from "react";

import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { Blogs } from "../Blogs/Blogs";

const Home = () => {
  const storedData = localStorage.getItem("userDetails");

  let parsedData;
  if (storedData) {
    parsedData = JSON.parse(storedData);
  } else {
  }

  return (
    <>
      <Navbar />

      <div className="main">
        <div>
          <h1> hello {parsedData?.username}</h1>
          <p>Welcome</p>
        </div>
      </div>
      <div className="main-blog">
        <Blogs />
      </div>
    </>
  );
};

export default Home;
