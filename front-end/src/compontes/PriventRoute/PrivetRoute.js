import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import LoginPage from "../pages/AuthPages/Login";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get("/api/v1/auth/user-auth");
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <LoginPage />;
}
