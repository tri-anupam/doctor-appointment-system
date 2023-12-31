import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../assets/ill.webp";
import backimg from "../assets/apply-doc.webp";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `https://doctor-appointment-system-sigma.vercel.app/api/v1/user/register`,
        values
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      dispatch(hideLoading());
      // console.log(e);
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div
        className="bg-no-repeat bg-cover bg-center blur-[5px] h-[100vh] "
        style={{ backgroundImage: `url(${backimg})` }}
      ></div>
      <h1 className="font-bold  text-2xl text-center top-0 mt-16 bg-[#020724] text-white fixed w-fit p-2 ml-1 rounded-r-full drop-shadow-2xl pr-4">
        Doctor Appointment App
      </h1>
      <div className="form-container flex items-center justify-center gap-6 h-[100vh] w-[100vw] fixed top-0">
        <div className="flex items-center justify-center md:bg-[#00000079] rounded-md md:shadow-2xl md:px-2 md:pr-[20px] md:border-[#020724] md:border-2 md:py-3">
          <div>
            <img
              src={img}
              alt="doc"
              className="hidden md:block h-[350px] z-20"
            />
          </div>
          <Form
            layout="vertical"
            onFinish={onFinishHandler}
            className="
          p-4 shadow-2xl w-[300px] bg-white rounded-md"
          >
            <h1 className="text-3xl pl-0 p-2 text-black text-center">
              Registration Form
            </h1>
            <Form.Item label="Full Name" name="name">
              <Input type="text" required placeholder="your name" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" required placeholder="your email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-[#14bef0] hover:bg-[#0db2e4] rounded-sm w-18 text-l p-1 text-white px-2"
              >
                Register
              </button>
              <Link className="underline" to="/Login">
                Already User.
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
