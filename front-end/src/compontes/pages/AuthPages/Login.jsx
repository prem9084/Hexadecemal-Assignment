import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthCommon.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const LoginPage = () => {
  const [aggred, setAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        toast.success(data.message);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" d-flex flex-row register justify-content-between">
        <div className="col-md-5 img1">
          <img
            src="https://images.unsplash.com/photo-1712086353403-54a24887e74f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="registartonLogo"
            style={{ width: "45rem", height: "51.2rem" }}
          />
        </div>

        <div className="col-md-6 p-5">
          <div>
            <p
              className="d-flex flex-row justify-content-end text-light"
              sytyle={{ marginTop: "2rem" }}
            >
              Have not an Account? &nbsp;
              <span>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  Sign up
                </Link>
              </span>
            </p>
          </div>
          <h1 className="fw-bold text-light">Sign In to Dribble!...</h1>
          <hr />
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label
                htmlFor="exampleInput3"
                className="form-label fw-bold text-light"
              >
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="premxxxx@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label fw-bold text-light"
              >
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
                <p className="text-light">
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

            {aggred && (
              <button
                type="submit"
                className="btn text-light fw-bold  text-light"
                style={{ backgroundColor: "#ff3484" }}
              >
                Login Account
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
    </>
  );
};

export default LoginPage;
