import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/loginSchema";
import axios from "axios";

import Cookies from "js-cookie";

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [isError, setIsError] = useState(false);

  const onsuccess = (userDetails) => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails.others));
    Cookies.set("jwt_token", userDetails.json_token, {
      expires: 30,
      path: "/",
    });
    navigate("/", { replace: true });
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        const { username, password } = values;
        try {
          const response = await axios.post(
            " https://blog-node-mysql.onrender.com/api/auth/login",
            {
              username,
              password,
            }
          );

          if (response.status === 200) {
            onsuccess(response.data);
          }
        } catch (error) {
          setIsError(true);
          setErrorMessage(error.response.data.message);
        }
      },
    });
  return (
    <div className="login-bg">
      <form className="login-form_main" onSubmit={handleSubmit}>
        <p className="login-heading">Login</p>
        <div className="login-inputContainer">
          <input
            type="text"
            className="login-inputField"
            id="username"
            placeholder="username"
            onBlur={handleBlur}
            onChange={handleChange}
            name="username"
            value={values.username}
          />
        </div>
        {errors.username && touched.username ? (
          <p className="login-error-message">{errors.username}</p>
        ) : null}
        <div className="login-inputContainer">
          <input
            type="password"
            className="login-inputField"
            id="password"
            placeholder="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            name="password"
            value={values.password}
          />
        </div>

        {errors.password && touched.password ? (
          <p className="login-error-message">{errors.password}</p>
        ) : null}

        <button id="button">Submit</button>
        {isError ? <p className="login-error-message">{errorMessage}</p> : null}
        <Link className="login-forgotLink" to="/register">
          new user click here to register
        </Link>
      </form>
    </div>
  );
};

export default Login;
