import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signUpSchema } from "../../schema/signUpSchema";
import axios from "axios";
import "./Register.css";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [serverErrorMsg, setServerErrorMsg] = useState();
  const [isServerErrorMsg, setIsServerErrorMsg] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        const { username, email, password } = values;
        console.log("hi");

        try {
          const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          };

          await axios.post(
            " https://blog-node-mysql.onrender.com/api/auth/register",
            {
              username,
              email,
              password,
            }
          );

          navigate("/login", { replace: true });
        } catch (err) {
          setIsServerErrorMsg(true);
          setServerErrorMsg(err.response.data.message);
          console.log(err);
          // toast.error(`${err.response.data.message}`);
        }
      },
    });

  return (
    <div className="register-bg">
      <form className="register-form_main" onSubmit={handleSubmit}>
        <p className="register-heading">Register</p>
        <div className="register-inputContainer">
          <input
            type="text"
            className="register-inputField"
            id="username"
            placeholder="Username"
            onBlur={handleBlur}
            onChange={handleChange}
            name="username"
            value={values.username}
          />
        </div>
        {errors.username && touched.username ? (
          <p className="register-error-message">{errors.username}</p>
        ) : null}

        <div className="register-inputContainer">
          <input
            type="email"
            className="register-inputField"
            id="email"
            placeholder="email"
            onBlur={handleBlur}
            onChange={handleChange}
            name="email"
            value={values.email}
          />
        </div>

        {errors.email && touched.email ? (
          <p className="register-error-message">{errors.email}</p>
        ) : null}
        <div className="register-inputContainer">
          <input
            type="password"
            className="register-inputField"
            id="password"
            placeholder="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            name="password"
            value={values.password}
          />
        </div>

        {errors.password && touched.password ? (
          <p className="register-error-message">{errors.password}</p>
        ) : null}
        <div className="register-inputContainer">
          <input
            type="password"
            className="register-inputField"
            id="confirmpassword"
            placeholder="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            name="confirmPassword"
            value={values.confirmPassword}
          />
        </div>

        {errors.confirmPassword && touched.confirmPassword ? (
          <p className="register-error-message">{errors.confirmPassword}</p>
        ) : null}

        <button type="submit" id="button">
          Submit
        </button>
        {isServerErrorMsg && (
          <p className="register-error-message">{serverErrorMsg}</p>
        )}

        <Link className="register-forgotLink" to="/login">
          already a user click here to login
        </Link>
      </form>
    </div>
  );
};

export default Register;
