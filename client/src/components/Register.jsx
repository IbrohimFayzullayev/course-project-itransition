import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../API";
import "./sass/register.scss";

const Register = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const saveLocalStorage = (userId) => {
    localStorage.setItem("currentUserId", userId);
    setUserId(userId);
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const generateError = (error) =>
    toast.error(error, {
      position: "top-left",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${URL}/register`,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      saveLocalStorage(data.data.user);
      if (data) {
        if (data.errors) {
          const { name, email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
          else if (name) generateError(name);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="containerr register">
      <h2>Register Account</h2>
      <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <span>
          Already have an account ?<Link to="/login"> Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
