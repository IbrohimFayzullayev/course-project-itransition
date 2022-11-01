import axios from "axios";
import React from "react";

const err = () => {
  const data = async () => {
    const d = await axios.post(
      "http://localhost:8000/login",
      {
        email: "johndoe122356@gmail.com",
        password: "1234",
      },
      {
        withCredentials: true,
      }
    );
    console.log(d);
  };
  data();

  return <div>err</div>;
};

export default err;
