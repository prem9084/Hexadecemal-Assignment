import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./AuthCommon.css";

const RegisterPage = () => {
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appentData = new FormData();
      appentData.append("name", name);
      appentData.append("email", email);
      appentData.append("password", password);
      appentData.append("username", username);
      const { data } = await axios.post("/api/v1/auth/register", appentData);

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" d-flex flex-row register justify-content-between  text-light">
      <div className="col-md-5 img1">
        <img
          src="https://images.unsplash.com/photo-1712086353403-54a24887e74f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="registartonLogo"
          style={{ width: "45rem", height: "52.2rem" }}
        />
      </div>

      <div className="col-md-6 p-5 ">
        <div>
          <p
            className="d-flex flex-row justify-content-end"
            sytyle={{ marginTop: "2rem" }}
          >
            Already a member? &nbsp;
            <span>
              <Link to="/" style={{ textDecoration: "none" }}>
                Sign up
              </Link>
            </span>
          </p>
        </div>
        <h1 className="fw-bold">Sign up to Dribble!...</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-row justify-content-start mt-5">
            <h5>Name</h5>

            <h5 style={{ position: "relative", left: "44%" }}>Username</h5>
          </div>
          <div className="mb-3 d-flex flex-row">
            <input
              type="text"
              className="form-control"
              style={{ marginRight: "1rem" }}
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              className="form-control"
              style={{ width: "95%" }}
              placeholder="prem1254"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInput3" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="tinkushakya2003@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="6+ charchters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              <p>
                Creating an account means you're oky with our{" "}
                <Link style={{ textDecoration: "none" }}>
                  Terms of Service, Privacy Policy,
                </Link>
                and our default{" "}
                <Link style={{ textDecoration: "none" }}>
                  Notification Settings
                </Link>
              </p>
            </label>
          </div>

          {agreed && (
            <button
              type="submit"
              className="btn text-light fw-bold"
              style={{ backgroundColor: "#ff3484" }}
            >
              Submit
            </button>
          )}

          <div
            className="col-md-6 text-body-secondary"
            style={{ fontSize: "0.7rem", marginTop: "2rem" }}
          >
            <p className="text-light">
              This site is protected by reCAPTCHA and the Goggle{" "}
              <Link>Privacy Policy</Link> &nsbp; and
              <Link>&nbsp;Terms Service</Link>&nbsp; Apply
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
