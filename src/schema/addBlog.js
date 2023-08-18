import * as Yup from "yup";

export const blogSchema = Yup.object({
  title: Yup.string().min(4).required("title should be min of 4"),
  description: Yup.string().min(10).required("min of 10 characters"),
});
