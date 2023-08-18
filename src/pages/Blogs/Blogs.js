import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";
import "./Blogs.css";

export const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const jwt_token = Cookies.get("jwt_token");

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        " https://blognodemysql-production.up.railway.app/api/posts/all-blogs",
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );

      setPosts(response.data);
    } catch (error) {}
  };
  const openBlog = (id) => {
    navigate(`/post/${id}`);
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
              <div
                className="post"
                key={post.id}
                onClick={(e) => openBlog(post.id)}
              >
                <div className="img">
                  <img
                    src={` https://blognodemysql-production.up.railway.app/${post?.img}`}
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
