import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import "./AddBlog.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AddBlog = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState("others");
  const [image, setImage] = useState("");

  const jwt_token = Cookies.get("jwt_token");

  const navigate = useNavigate();

  const [file, setFile] = useState();

  const previewFile = (handleFile) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(handleFile);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } catch (err) {
      console.log(err);
    }
  };

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    // console.log("hello form");

    try {
      const res = await axios.post(
        " https://blognodemysql-production.up.railway.app/api/posts/add-photo",
        formData
      );
      // console.log(res);

      return res.data;
    } catch (error) {
      console.log("from error upload", error);
    }
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hello");
    if (title === "") {
      toast.error("title cannot be empty");
    }
    if (description === "") {
      toast.error("description cannot be empty");
    }
    const img = await upload();
    // console.log("2");

    // console.log(img);
    try {
      await axios.post(
        " https://blognodemysql-production.up.railway.app/api/posts/add-blog",
        { title, description, img, category },
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );

      // toast.success(response.data);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.sqlMessage);
    }
  };
  const handleChange = (e) => {
    const handleFile = e.target.files[0];

    setFile(handleFile);
    previewFile(handleFile);
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="add-blog">
        <img
          className="add-blog-img"
          src={
            image
              ? image
              : "https://img.freepik.com/free-photo/toy-bricks-table-with-word-blog_144627-47465.jpg?size=626&ext=jpg&ga=GA1.2.1460011849.1689073367&semt=sph"
          }
          alt="alt"
        />

        <div className="add-blog-content">
          <form onSubmit={handleSubmit}>
            <span className="form-title">Upload Your Blog</span>

            <input
              placeholder="Enter title here"
              className="input-style"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              rows="4"
              cols="50"
              type="textarea"
              value={description}
              placeholder="enter your description"
              className="input-style"
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="file-input" className="drop-container">
              <span className="drop-title">Drop files here</span>
              or
              <input
                type="file"
                accept="image/*"
                required=""
                id="file-input"
                onChange={(e) => handleChange(e)}
              />
            </label>

            <div className="cate">
              <label htmlFor="lang">Category</label>
              <select
                name="category"
                value={category}
                id="cat"
                onChange={handleCategory}
              >
                <option value="music">music</option>
                <option value="cricket">cricket</option>
                <option value="actors">actors</option>
                <option value="education">education</option>
                <option value="ai">ai</option>
                <option value="data Science">data Science</option>
                <option value="sports">sports</option>
                <option value="others">others</option>
              </select>
            </div>

            <input type="submit" className="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;

// const handleForm = async (e) => {
//   e.preventDefault();
//   const imgUrl = upload();
//   try {
//   } catch (error) {
//     console.log(error);
//   }
// };
///cloudinary
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   console.log("hey");
//   try {
//     const response = await axios.post(
//       " https://blognodemysql-production.up.railway.app/api/user/posttrail",
//       {
//         image,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${jwt_token}`,
//         },
//       }
//     );
//     setUploadImg( response.data.public_id);
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
