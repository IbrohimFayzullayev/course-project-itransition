import axios from "axios";
import React, { useEffect, useState } from "react";
import Rodal from "rodal";
import { URL } from "../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./pagestyle/home.scss";
import "rodal/lib/rodal.css";

const Home = () => {
  const [items, setItems] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [checkEvent, setCheckEvent] = useState(false);
  const [itemCommentId, setItemCommentId] = useState("");
  const [visible, setVisible] = useState(false);
  const [post, setItem] = useState(null);
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const data = await axios.get(`${URL}/allitems`);
      setItems(data.data.data);
    };
    getItems();
  }, [checkEvent]);

  const addComment = (id) => {
    const createComment = async () => {
      await axios.post(`${URL}/comments`, {
        itemId: id,
        comment: commentText,
        userName: localStorage.getItem("currentUserName"),
        userId: localStorage.getItem("currentUserId"),
      });
      notifySuccess();
    };
    if (localStorage.getItem("currentUserId")) {
      createComment();
    } else {
      notifyError();
    }
    setCommentText("");
    setCheckEvent(checkEvent ? false : true);
  };
  const notifyError = () =>
    toast.error("You cannot comment because you are not registered");
  const notifySuccess = () => toast.success("Comment saved");
  const getComments = async (itemId) => {
    const user_post = items.filter((val) => val._id === itemId);
    setItem(user_post);
    const data = await axios.get(`${URL}/comments`, {
      headers: { id: itemId },
    });
    setPostComments(data.data.comments);
  };
  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  return (
    <div className="home">
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
      <div className="contents">
        {items?.map((item) => {
          return (
            <div key={item._id} className="ui card item_card">
              <div className="content">
                <div className="header">{item.name}</div>
                <div className="description">{item.description}</div>
                <div className="meta">Author: {item.user_name}</div>
              </div>
              <div className="content">
                <span className="right floated">
                  <i className="heart outline like icon"></i>
                  {item.likes} likes
                </span>
                <i
                  className="comment icon"
                  onClick={() => {
                    show();
                    getComments(item._id);
                  }}
                ></i>
                {item.comments} comments
              </div>
              <Rodal height={400} width={350} visible={visible} onClose={hide}>
                {post?.map((val) => {
                  return (
                    <div key={val._id}>
                      <h4>{val.name}</h4>
                      <h5 style={{ color: "gray" }}>Author: {val.user_name}</h5>
                      <p>Content: {val.description}</p>
                    </div>
                  );
                })}
                <div className="comentaries ">
                  <h5
                    style={{
                      marginTop: "15px",
                      paddingBottom: "6px",
                    }}
                  >
                    Commentaries
                  </h5>
                  <div
                    className="ui comments card d-flex flex-direction-column gap-1"
                    style={{
                      width: "100%",
                      marginTop: "0",
                      padding: "10px 0",
                      height: "200px",
                      overflow: "auto",
                    }}
                  >
                    {postComments.map((comment) => {
                      return (
                        <div
                          className="comment"
                          style={{
                            width: "90%",
                            margin: "0 auto",
                            height: "40px",
                          }}
                          key={comment._id}
                        >
                          <div
                            className="content"
                            style={{ padding: "5px 8px", border: "none" }}
                          >
                            <p className="author" style={{ margin: "0" }}>
                              {comment.author_name}
                            </p>
                            <div className="text" style={{ margin: "0" }}>
                              {comment.comment}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Rodal>
              <div className="extra content">
                <div className="ui large transparent left icon input">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addComment(item._id);
                    }}
                    className="d-flex align-items-center"
                  >
                    <button
                      type="submit"
                      className="bi bi-send-fill"
                      style={{
                        color: "blue",
                        width: "15%",
                        border: "none",
                        background: "none",
                      }}
                    ></button>
                    <input
                      style={{ width: "80%", border: "none", outline: "none" }}
                      type="text"
                      placeholder="Add Comment..."
                      onChange={(e) => {
                        setCommentText(e.target.value);
                        setItemCommentId(item._id);
                      }}
                      value={item._id === itemCommentId ? commentText : ""}
                    />
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
