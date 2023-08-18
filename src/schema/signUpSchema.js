import * as Yup from "yup";

export const signUpSchema = Yup.object({
  username: Yup.string().min(4).required("enter a valid name"),
  email: Yup.string().email().required("enter a valid email"),
  password: Yup.string().min(6).required("password should be min of 6"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "password should match"),
});
