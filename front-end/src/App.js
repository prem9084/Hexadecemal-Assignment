// import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./compontes/pages/AuthPages/Login";
import RegisterPage from "./compontes/pages/AuthPages/Register";
import Dashboard from "./compontes/Dashboard";
import Profile from "./compontes/profile";
import CreatePost from "./compontes/pages/AuthPages/CreatePost";
import PrivateRoute from "./compontes/PriventRoute/PrivetRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="create-post/:id" element={<CreatePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
