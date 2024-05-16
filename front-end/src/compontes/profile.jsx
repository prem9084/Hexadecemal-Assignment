import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [selectPic, setSelectPic] = useState(null);
  const [followersCount, setFollowersCount] = useState([0]);
  const [followingCount, setFollowingCount] = useState([0]);
  const params = useParams();
  const [auth, setAuth] = useAuth();

  const updateUser = async (e) => {
    e.preventDefault();
    console.log(name, email, username, image);
    try {
      const appendData = new FormData();
      appendData.append("name", name);
      appendData.append("email", email);
      appendData.append("username", username);
      appendData.append("image", image);

      const { data } = await axios.put(
        `/api/v1/auth/update-profile/${params.id}`,
        appendData
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    setSelectPic(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const getSingle = async () => {
    try {
      const { data } = await axios.get(`/api/v1/auth/get-user/${params.id}`);
      setName(data.user.name);
      setEmail(data.user.email);
      setUsername(data.user.username);
      setFollowersCount(data.user.followers.length);
      setFollowingCount(data.user.following.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingle();
  }, []);

  const fetchProfilePic = async () => {
    try {
      if (auth.user && auth?.user?._id) {
        const response = await axios.get(
          `/api/v1/auth/get-image/${auth.user._id}`
        );
        setImage(response.data.image);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfilePic();
  }, [auth.user, auth.user?._id]);

  return (
    <div className="d-flex justify-content-center profile-container col-md-6 m-auto">
      <form className="profile p-3" onSubmit={updateUser}>
        <div className="d-flex ">
          <div className="mt-1">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
          <div className="d-flex m-auto gap-3 mt-3">
            <h5>Followers {followersCount}</h5> |{" "}
            <h5>Following {followingCount}</h5>
          </div>
        </div>

        <div className="mt-3 ms-3 profile-pic d-flex">
          {image !== null ? (
            <img
              src={
                selectPic
                  ? URL.createObjectURL(selectPic)
                  : `/api/v1/auth/get-image/${params.id}`
              }
              alt="Profile"
              className="profile-pic"
            />
          ) : (
            <>
              <div className="caneraIcon">
                <CameraEnhanceIcon />
              </div>
            </>
          )}
          <input
            type="file"
            className="ms-5"
            accept="image/*"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <div className="inputes">
          <div className="mt-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
