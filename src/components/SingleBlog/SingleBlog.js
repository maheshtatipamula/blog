import React, { useEffect, useState } from "react";
import "./SingleBlog.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import Navbar from "../Navbar/Navbar";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

// import { Context } from "../..";

const SingleBlog = () => {
  const [blog, setBlog] = useState();
  const [inputComment, setInputComment] = useState();
  const [comments, setComments] = useState();
  const navigate = useNavigate();
  const jwt_token = Cookies.get("jwt_token");

  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const storedData = localStorage.getItem("userDetails");

  let parsedData;
  if (storedData) {
    parsedData = JSON.parse(storedData);
  } else {
  }

  const fetchABlog = async () => {
    try {
      const response = await axios.get(
        ` https://blog-node-mysql.onrender.com/api/posts/get-blog/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );

      setBlog(response.data);
    } catch (err) {}
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        ` https://blog-node-mysql.onrender.com/api/comments/all-comments/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );
      setComments(response.data);
    } catch (error) {}
  };
  const deleteComment = async (id) => {
    try {
      const response = await axios.delete(
        ` https://blog-node-mysql.onrender.com/api/comments/delete-comment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchComments();
      } else {
      }
    } catch (error) {}
  };
  const deleteBlog = async (id) => {
    try {
      const response = await axios.delete(
        ` https://blog-node-mysql.onrender.com/api/posts/delete-blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/allblogs", { replace: true });
      } else {
      }
    } catch (error) {}
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const values = {
        comment: inputComment,
        postId: postId,
      };
      const response = await axios.post(
        ` https://blog-node-mysql.onrender.com/api/comments/new-comment`,
        values,
        {
          headers: {
            Authorization: `Bearer ${jwt_token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchComments();
        console.log("hello from comments add");
        setInputComment("");
      } else {
      }
    } catch (error) {
      toast.error(error.response.data.sqlMessage);
    }
  };

  useEffect(() => {
    fetchABlog();
    fetchComments();
  }, [postId]);
  return (
    <>
      <Navbar />

      <div className="single-post">
        <div className="single-post-content">
          <img
            src={` https://blog-node-mysql.onrender.com/${blog?.postImage}`}
            alt="content"
          />
          <div className="single-post-user">
            <div className="single-post-user-inner">
              <img src={blog?.userImage} alt="content" />
              <div className="single-post-info">
                <span>{blog?.username}</span>
                <p>Posted {moment(blog?.date).fromNow()}</p>
              </div>
            </div>
            {parsedData?.id === blog?.userId && (
              <div className="single-post-edit">
                <div>
                  <Link to={"/editblog"} state={blog}>
                    <AiOutlineEdit size={20} />
                  </Link>
                </div>
                <div onClick={() => deleteBlog(blog?.postId)}>
                  <MdDeleteOutline size={20} />
                </div>
              </div>
            )}
          </div>
          <div className="single-td">
            <h1>{blog?.title}</h1>
            <p>{blog?.description}</p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="section">comment section</h1>
      </div>
      <div className="comments-section">
        <form className="comments-section-form" onSubmit={(e) => addComment(e)}>
          <label htmlFor="comment"> addComment</label>
          <input
            type="text"
            id="comment"
            value={inputComment}
            className="comments-input-field"
            onChange={(e) => setInputComment(e.target.value)}
          />

          <button type="submit" className="comments-submit">
            Submit
          </button>
        </form>
        <div className="comments-display-1">
          <div className="comments-display-conatiner-2">
            {comments &&
              comments.map((commentItem) => (
                <div
                  className="comments-user-field"
                  key={commentItem.commentId}
                >
                  <div className="user-details">
                    <div className="comments-user">
                      <h1>{commentItem.nameOfUser}</h1>
                      {commentItem.postedTime && (
                        <p>
                          posted {moment(commentItem?.postedTime).fromNow()}
                        </p>
                      )}
                    </div>
                    {parsedData?.id === commentItem?.user_id && (
                      <div className="com-edit-del">
                        <div
                          onClick={() => deleteComment(commentItem?.commentId)}
                        >
                          <MdDeleteOutline size={20} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="comments-starts">
                    <p>{commentItem.comment}</p>
                  </div>
                </div>
              ))}
          </div>
          <Toaster position="top-center" reverseOrder={true} />
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
