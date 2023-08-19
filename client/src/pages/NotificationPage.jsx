import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.message) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
      message.error("Something wents wrong");
    }
  };

  //delete notification
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
      message.error("Something wents wrong");
    }
  };
  return (
    <Layout>
      <h1 className="p-3 text-center text-2xl">Notification Page</h1>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="flex justify-end">
            <h4
              className="p-2 mr-2 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div className="">
              <div
                className="p-2"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                <p className="bg-slate-200 p-1 font-bold rounded">
                  {notificationMsg.type}
                </p>
                <p className="bg-slate-100 p-1 m-1 rounded">
                  {notificationMsg.message}
                </p>
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="flex justify-end">
            <h4
              className="mr-2 p-2 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMsg) => (
            <div
              className="card cursor-pointer"
              onClick={() => navigate(notificationMsg.onClickPath)}
            >
              <div className="p-2">
                <p className="bg-slate-200 p-1 font-bold rounded">
                  {notificationMsg.type}
                </p>
                <p className="bg-slate-100 p-1 m-1 rounded">
                  {notificationMsg.message}
                </p>
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
