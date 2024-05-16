import React, { useEffect, useState } from "react";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Avatar from "@mui/material/Avatar";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
const Dashboard = () => {
  const [post, setPost] = useState([]);
  const params = useParams();
  const [showInput, setShowInput] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likebtn, setLikebtn] = useState(false);
  const [image, setImage] = useState("");
  const [isFollow, setIsFollow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [comment, setComment] = useState([]);
  const [text, setText] = useState("");

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/post/comment/${id}`, {
        comment: text,
      });
      if (data.success) {
        setShowInput(false);
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleFollow = async () => {
    try {
      if (!isFollow) {
        // follow logic
        await axios.post(`/api/v1/auth/follow/${id}`);
        setIsFollow(true);
      } else {
        await axios.post(`/api/v1/auth/unfollow/${id}`);
        setIsFollow(false);
      }
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  // chachong folllow

  const handelLike = async () => {
    try {
      const { data } = await axios.post(`/api/v1/post/like-post/${params.id}`);
      if (data.success) {
        toast.success(data.message);
      }
      setLikebtn(!likebtn);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out");
    navigate("/");
  };

  const getSinglrUser = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/get-user/${auth.user._id}`
      );
      setName(data.user.name);
      setUsername(data.user.username);
      setEmail(data.user.email);
      setId(data.user._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSinglrUser();
  }, []);

  const getAllPost = async (e) => {
    try {
      const { data } = await axios.get("/api/v1/post/get-all-post");
      setPost(data.post);

      // if (data.success) {
      //   toast.success(data.message);
      // } else {
      //   toast.error(data.message);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  // likr and dislike

  return (
    <div className="section d-flex">
      <div className="sidsebar d-flex flex-column gap-5 ms-5 mt-5 col-md-2 col-sm-12">
        <Link
          className="text-light"
          to="/dashboard"
          style={{ textDecoration: "none", fontWeight: "bold" }}
        >
          <OtherHousesIcon className="icons" /> <span>Home</span>
        </Link>
        <Link
          to={`create-post/${id}`}
          className="text-light"
          style={{ textDecoration: "none", fontWeight: "bold" }}
        >
          <AddCircleIcon className="icons" /> <span>Create</span>
        </Link>
        <Link
          className="text-light d-flex"
          to={`profile/${id}`}
          style={{ textDecoration: "none", fontWeight: "bold" }}
        >
          {!image ? (
            <>
              <Avatar className="icons" />
              <span className="mt-2">Profile</span>
            </>
          ) : (
            <>
              <Avatar
                className="icons"
                src={`/api/v1/auth/get-image/${params.id}`}
              />{" "}
            </>
          )}
        </Link>
        <button
          className="d-flex logoutBtn"
          to="/login"
          style={{ textDecoration: "none", fontWeight: "bold" }}
          onClick={handleLogout}
        >
          <LogoutIcon className="icons" />
          <span>Logout</span>
        </button>
        <div className="username">
          <h4 className="text-light">@{username}</h4>
        </div>
      </div>

      <div className="posts mt-3 col-md-6 m-auto">
        <div className="status">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S6dXZTg91R_1AeEXN8Bre65Bud9nbtvMPdAzCHwVTA&s"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S6dXZTg91R_1AeEXN8Bre65Bud9nbtvMPdAzCHwVTA&s"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S6dXZTg91R_1AeEXN8Bre65Bud9nbtvMPdAzCHwVTA&s"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S6dXZTg91R_1AeEXN8Bre65Bud9nbtvMPdAzCHwVTA&s"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S6dXZTg91R_1AeEXN8Bre65Bud9nbtvMPdAzCHwVTA&s"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S6dXZTg91R_1AeEXN8Bre65Bud9nbtvMPdAzCHwVTA&s"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S6dXZTg91R_1AeEXN8Bre65Bud9nbtvMPdAzCHwVTA&s"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S6dXZTg91R_1AeEXN8Bre65Bud9nbtvMPdAzCHwVTA&s"
            alt=""
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6S6dXZTg91R_1AeEXN8Bre65Bud9nbtvMPdAzCHwVTA&s"
            alt=""
          />
        </div>
        {post.map((posts) => (
          <div className="card p-2" key={posts._id}>
            <span className="d-flex gap-2">
              <Avatar
                // alt="Remy Sharp"
                src={`/api/v1/auth/get-image/${auth.user._id}`}
                sx={{ widsth: 25, height: 25 }}
              />{" "}
              <h5>{name}</h5>
              <h5>@{username}</h5>
              <div>
                <button
                  className="bg-dark text-light rounded"
                  onClick={handleFollow}
                >
                  {isFollow ? "Following" : "Follow"}
                </button>
              </div>
            </span>

            <p>{posts.title}</p>
            <hr />
            {posts.photo ? (
              <img
                src={`/api/v1/post/get-photo/${posts._id}`}
                alt="post-image"
                height={"500vh"}
                className="img img-responsive"
              />
            ) : posts.vidseo ? (
              <video
                src={`/api/v1/post/get-video/${posts._id}`}
                alt="post-video"
                controls
              />
            ) : (
              <>
                {" "}
                <p>No media available</p>
              </>
            )}

            <div className="d-flex gap-5 actives  mb-3">
              <button
                onClick={handelLike}
                style={{ color: likebtn ? "blue" : "black" }}
              >
                <ThumbUpOffAltIcon sx={{ widsth: 30, height: 30 }} />
              </button>

              <button onClick={handleLikeClick}>
                {/* {liked ? "Liked" : "Like"} */}
                <ThumbDownOffAltIcon sx={{ widsth: 30, height: 30 }} />
              </button>

              <button onClick={handleShowInput}>
                <CommentIcon sx={{ widsth: 30, height: 30 }} />
              </button>
            </div>

            {showInput && (
              <>
                <form className="form">
                  <input
                    type="text"
                    placeholder="Comment !..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <button onClick={handleSubmit}>Send</button>
                </form>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
