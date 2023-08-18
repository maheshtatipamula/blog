import * as Yup from "yup";

export const loginSchema = Yup.object({
  username: Yup.string().required("enter a  valid email"),
  password: Yup.string().min(6).required("password should be 6 digits"),
});
