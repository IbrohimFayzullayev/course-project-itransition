import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Rodal from "rodal";
import { URL } from "../API";
import "rodal/lib/rodal.css";
import "./sass/collections.scss";
import GetCookie from "../hooks/getCookie";
import SetCookie from "../hooks/setCookie";
import RemoveCookie from "../hooks/removeCookie";
import { useNavigate } from "react-router-dom";
const Collections = () => {
  const [visible, setVisible] = useState(false);
  const [collection, setCollection] = useState([]);
  const [checkChange, setCheckChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCollections = async () => {
      const token = GetCookie("jwt");
      const data = await axios.get(`${URL}/collections`, {
        headers: { Authorization: `Bearer <${token}>` },
      });
      setCollection(data.data.data);
    };
    getCollections();
  }, [checkChange]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const token = GetCookie("jwt");
    const createCollection = async () => {
      await axios.post(
        `${URL}/collections`,
        {
          ...data,
        },
        {
          headers: { Authorization: `Bearer <${token}>` },
        }
      );
    };
    setCheckChange(checkChange ? false : true);
    setVisible(false);
    createCollection();
    reset();
  };
  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };

  const deleteCollection = async (collectionId) => {
    await axios.delete(`${URL}/collections/${collectionId}`);
    setCheckChange(checkChange ? false : true);
  };

  return (
    <div className="collection">
      <button
        className="btn btn-primary d-flex align-items-center gap-2"
        onClick={() => {
          navigate(-1);
        }}
      >
        <i className="bi bi-skip-backward-circle"></i> Back
      </button>
      <div className="collections">
        <div className="ui card">
          <div className="content">
            <div className="header">Collection</div>
            <div className="description">
              O'zingizga kerakli kolleksiya yarating
            </div>
          </div>
          <div className="ui bottom attached button" onClick={show}>
            <i className="add icon"></i>
            Create Collection
          </div>
          <Rodal height={280} visible={visible} onClose={hide}>
            <div style={{ marginBottom: "20px" }}>Create Collection</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Collection Name"
                {...register("name", { required: true, maxLength: 20 })}
              />
              {errors.name && (
                <span style={{ color: "red" }}>Name is required</span>
              )}
              <input
                type="text"
                placeholder="Description"
                {...register("description")}
              />

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </Rodal>
        </div>
        {collection?.map((val) => {
          return (
            <div
              style={{ position: "relative" }}
              className="ui card"
              key={val._id}
            >
              <i
                onClick={() => {
                  deleteCollection(val._id);
                }}
                className="bi bi-trash3-fill"
                style={{
                  position: "absolute",
                  color: "red",
                  top: "0",
                  right: "0",
                }}
              ></i>
              <div className="content">
                <div className="header">{val.name}</div>
                <div className="description">{val.description}</div>
              </div>
              <NavLink
                onClick={() => {
                  RemoveCookie("collectionId");
                  RemoveCookie("collectionName");
                  SetCookie("collectionName", val.name);
                  SetCookie("collectionId", val._id);
                }}
                to="/mycollections/myitems"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="ui bottom attached button">
                  <i className="folder open outline icon"></i>
                  Open Collection
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collections;
