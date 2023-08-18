import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
// import "./AddBlog.css";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const EditBlog = () => {
  const state = useLocation().state;

  const [title, setTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.description || "");
  const [category, setCategory] = useState(state?.category || "others");
  const [image, setImage] = useState("");

  const jwt_token = Cookies.get("jwt_token");

  const navigate = useNavigate();

  const [file, setFile] = useState(state?.postImage || "");
  const previewFile = (handleFile) => {
    // if (!handleFile) {
    //   return state?.postImage;
    // }try{}
    try {
      const reader = new FileReader();
      reader.readAsDataURL(handleFile);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } catch (error) {
      console.log(error);
    }
  };
  // if(state){
  //   setImage(state?.postImage)
  // }
  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    // previewFile(file);
    try {
      const res = await axios.post(
        " https://blognodemysql-production.up.railway.app/api/posts/add-photo",
        formData
      );
      return res.data;
    } catch (error) {
      toast.error(error.response.data.sqlMessage);
    }
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let img;
    if (state?.postImage) {
      img = file;
    } else {
      img = await upload();
    }
    try {
      const response = state
        ? await axios.put(
            ` https://blognodemysql-production.up.railway.app/api/posts/edit-blog/${state.postId}`,
            { title, description, img: img, category },
            {
              headers: {
                Authorization: `Bearer ${jwt_token}`,
              },
            }
          )
        : await axios.post(
            " https://blognodemysql-production.up.railway.app/api/posts/add-blog",
            { title, description, img, category },
            {
              headers: {
                Authorization: `Bearer ${jwt_token}`,
              },
            }
          );
      console.log(response);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.sqlMessage);
    }
  };
  const handleChange = (e) => {
    const handleFile = e.target.files[0];
    console.log(handleFile);
    if (state) {
      state.postImage = null;
    }

    setFile(handleFile);
    previewFile(handleFile);
  };
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

  return (
    <>
      <Navbar />
      <div className="add-blog">
        {state?.postImage ? (
          <img
            className="add-blog-img"
            src={`https://blognodemysql-production.up.railway.app/${state?.postImage}`}
            alt="alt"
          />
        ) : (
          <img
            className="add-blog-img"
            src={
              image
                ? image
                : "https://img.freepik.com/free-photo/toy-bricks-table-with-word-blog_144627-47465.jpg?size=626&ext=jpg&ga=GA1.2.1460011849.1689073367&semt=sph"
            }
            alt="alt"
          />
        )}

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
        <Toaster position="top-center" reverseOrder={true} />
      </div>
    </>
  );
};

export default EditBlog;
