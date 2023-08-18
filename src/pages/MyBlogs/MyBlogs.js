import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const jwt_token = Cookies.get("jwt_token");

  //fetchposts

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        " https://blog-node-mysql.onrender.com/api/posts/my-blogs",
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );
      setPosts(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="posts">
          {posts &&
            posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="img">
                  <img
                    src={`https://blog-node-mysql.onrender.com/${post?.img}`}
                    alt="post"
                  />
                </div>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <p>{post.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyBlogs;
