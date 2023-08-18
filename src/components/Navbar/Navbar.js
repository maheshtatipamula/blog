import React, { useState } from "react";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [click, setClick] = useState(false);
  //   const { setUserData, setTaskData } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    setClick(!click);
  };

  const handleLogout = () => {
    navigate("/login", { replace: true });

    Cookies.remove("jwt_token", { path: "/" });
    localStorage.removeItem("userDetails");
    // setTaskData("");
    // setUserData("");
  };

  const [color, setColour] = useState(false);
  const changeColour = () => {
    if (window.scrollY >= 1) {
      setColour(true);
    } else {
      setColour(false);
    }
  };
  window.addEventListener("scroll", changeColour);

  return (
    <div className={color ? " header header-bg" : "header"}>
      <Link to="/">
        <h1>Blogs</h1>
      </Link>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "nav-active" : null}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/addblog"
            className={location.pathname === "/addblog" ? "nav-active" : null}
          >
            Add Blogs
          </Link>
        </li>
        <li>
          <Link
            to="/allblogs"
            className={location.pathname === "/allblogs" ? "nav-active" : null}
          >
            All Blogs
          </Link>
        </li>{" "}
        <li>
          <Link
            to="/myblogs"
            className={location.pathname === "/myblogs" ? "nav-active" : null}
          >
            My Blogs
          </Link>
        </li>
        <li onClick={handleLogout}>
          <Link>Logout</Link>{" "}
        </li>
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={20} style={{ color: "white" }} />
        ) : (
          <FaBars size={20} style={{ color: "black" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
