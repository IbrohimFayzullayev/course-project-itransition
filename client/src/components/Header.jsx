import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { URL } from "../API";
import axios from "axios";
import RemoveCookie from "../hooks/removeCookie";

import "./sass/header.scss";

const Header = (props) => {
  const navigate = useNavigate();

  const [checkUser, setCheckUser] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("currentUserId");
    const verifyUser = async () => {
      if (!userId) {
        setCheckUser(false);
      } else {
        const data = await axios.get(`${URL}/users/${userId}`);
        setUser(data.data);
        localStorage.setItem("currentUserName", data.data.name);
        setCheckUser(true);
      }
    };
    verifyUser();
  }, [navigate]);

  const logOut = () => {
    RemoveCookie("jwt");
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUserName");
    navigate("/");
    setCheckUser(false);
  };
  return (
    <div className="header d-flex justify-content-between">
      <h3>Home</h3>

      <div className="ui search">
        <div className="ui icon input">
          {/* <input className="prompt" type="text" placeholder="Search..." />
          <i className="search icon"></i> */}
        </div>
        <div className="results"></div>
      </div>
      {checkUser ? (
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {user ? user.name : ""}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <NavLink
              to="/mycollections"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p className="dropdown-item">My Collections</p>
            </NavLink>
            <p className="dropdown-item" onClick={logOut}>
              Log Out
            </p>
          </div>
        </div>
      ) : (
        <div className="d-flex gap-3">
          <NavLink
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button type="button" className="btn btn-dark">
              Login
            </button>
          </NavLink>
          <NavLink
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <button type="button" className="btn btn-success">
              Register
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
