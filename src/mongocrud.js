import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ProductList from "./ProductList";

const MongoCrud = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:5000/auth/${isLogin ? "login" : "signup"}`;

    try {
      const response = await axios.post(url, {
        username: isLogin ? undefined : username,
        email,
        password,
      });

      setMessage(isLogin ? "Login successful!" : "Signup successful!");
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <ProductList />
      ) : (
        <>
          <h2 className="greeting">{isLogin ? "Login" : "Signup"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-container">
              {!isLogin && (
                <input
                  type="text"
                  value={username}
                  className="input"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              )}
              <input
                type="email"
                value={email}
                className="input"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                value={password}
                className="input"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="button" type="submit">
                {isLogin ? "Login" : "Signup"}
              </button>
            </div>
          </form>
          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Signup" : "Login"}
            </span>
          </p>
          {message && <p>{message}</p>}
        </>
      )}
    </div>
  );
};

export default MongoCrud;
