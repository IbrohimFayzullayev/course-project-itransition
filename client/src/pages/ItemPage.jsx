import axios from "axios";
import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import { useForm } from "react-hook-form";
import { URL } from "../API";
import GetCookie from "../hooks/getCookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pagestyle/item.scss";

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [checkChange, setCheckChange] = useState(true);
  const [colName, setColName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setColName(GetCookie("collectionName"));
    const collectionId = GetCookie("collectionId");

    const getItems = async () => {
      const items = await axios.get(`${URL}/items`, {
        headers: { collectionId },
      });
      setItems(items.data.data);
    };
    getItems();
  }, [checkChange]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const token = GetCookie("jwt");
    const colId = GetCookie("collectionId");
    const colName = GetCookie("collectionName");
    const createItem = async () => {
      await axios.post(
        `${URL}/items`,
        {
          collection_id: colId,
          col_name: colName,
          ...data,
        },
        {
          headers: { Authorization: `Bearer <${token}>` },
        }
      );
    };
    setCheckChange(checkChange ? false : true);
    setVisible(false);
    createItem();
    reset();
    createCol();
  };

  const createCol = () => toast.success("Item created");
  const deleteCol = () => toast.warn("Item deleted");
  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  const deleteItem = async (itemId) => {
    await axios.delete(`${URL}/items/${itemId}`);
    setCheckChange(checkChange ? false : true);
    deleteCol();
  };
  return (
    <div className="items">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="d-flex justify-content-between collection__top">
        <h2>Collection: {colName}</h2>
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => {
            navigate(-1);
          }}
        >
          <i className="bi bi-skip-backward-circle"></i> Back
        </button>
      </div>
      <div className="collections">
        <div className="ui card">
          <div className="content">
            <div className="header">Item</div>
            <div className="description">Create Item</div>
          </div>
          <div className="ui bottom attached button" onClick={show}>
            <i className="add icon"></i>
            Create Item
          </div>
          <Rodal height={280} visible={visible} onClose={hide}>
            <div style={{ marginBottom: "20px" }}>Create Item</div>
            <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Item Name"
                {...register("name", { required: true, maxLength: 20 })}
              />
              {errors.name && (
                <span style={{ color: "red" }}>Name is required</span>
              )}
              <input
                type="text"
                placeholder="Item info"
                {...register("description")}
              />

              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </Rodal>
        </div>
        {items?.map((val) => {
          return (
            <div className="ui card" key={val._id}>
              <div className="content">
                <div className="header">{val.name}</div>
                <div className="description">{val.description}</div>
              </div>
              <div
                className="ui bottom attached button"
                style={{ color: "red" }}
                onClick={() => {
                  deleteItem(val._id);
                }}
              >
                <i className="bi bi-trash3-fill"></i>
                Remove Item
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemPage;
