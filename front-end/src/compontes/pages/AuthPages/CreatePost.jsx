import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
  const navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const appendData = new FormData();

      appendData.append("title", title);
      appendData.append("photo", photo);
      appendData.append("video", video);

      const { data } = await axios.post("/api/v1/post/create-post", appendData);
      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5  createPost bg-light rounded container">
      <form className="w-100" onSubmit={createPost}>
        {photo && (
          <div className="mt-3 d-flex justify-content-center align-content-center post-img">
            <img
              src={URL.createObjectURL(photo)}
              alt="post/image"
              height="250vh"
              className="img img-responsive"
            />
          </div>
        )}
        <div className="d-flex">
          <div>
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              multiple
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <div>
            {video ? video.name : "Upload Video"}
            <input
              type="file"
              name="video"
              accept="video/*"
              multiple
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
        </div>
        <div className="mt-5">
          <h4>Title</h4>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write title....."
            className="w-100 rounded border-0 p-1"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3 w-100">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
