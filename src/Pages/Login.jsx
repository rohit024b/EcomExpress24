import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import '../CSS/login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [setErrorMessage] = useState("");

  const { isLoggedIn, logoutRequested, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoginFailed(error.message);
      setLoginFailed(true);
      setTimeout(() => {
        setLoginFailed(false);
        setErrorMessage("");
      }, 3000);
    }
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="box1">
      <div className="box2">
      <h2>{isLoggedIn ? "" : "Login"}</h2>
      {isLoggedIn && logoutRequested ? (
          <div>
            <h2>Are you sure you want to logout?</h2>
            <button onClick={handleLogout}>Confirm Logout</button>
          </div>
        ) : isLoggedIn ? (
          <div className="success-message">
            <h2>Successfully Logged In</h2>
            <p>Now you can buy anything!</p>
          </div>
        ) : (
          <>
            {loginFailed && (
              <div className="error-message">
                <p>Login failed! Please check your credentials.</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="input-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
