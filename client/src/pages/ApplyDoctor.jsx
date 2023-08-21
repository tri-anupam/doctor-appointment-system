import React from "react";
import Layout from "./../components/Layout.jsx";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import "./../App.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice.js";
import axios from "axios";
import moment from "moment";

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "https://doctor-appointment-system-sigma.vercel.app/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timing: [
            moment(values.timing[0]).format("HH:mm"),
            moment(values.timing[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
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
      <div className="flex justify-center items-center ">
        <h1 className="text-right  text-black font-bold text-xl  md:text-3xl  underline block rounded-lg bg-white bg-cover p-6 shadow-lg  w-[250px] md:w-[400px] h1Head">
          Apply for Doctor
        </h1>
      </div>

      <Form
        layout="vertical"
        onFinish={handleFinish}
        className="m-3 shadow-2xl p-2"
      >
        <h6 className="text-xl text-gray-500 mb-1">Presonal Details : </h6>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your first name"></Input>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your last name"></Input>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No."
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your mobile no."></Input>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your email address"></Input>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="Your website url"></Input>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your address"></Input>
            </Form.Item>
          </Col>
        </Row>
        <h6 className="text-xl  text-gray-500 mb-1">Professional Details : </h6>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your specialization"></Input>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Your experience"></Input>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Consultation"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input type="number" placeholder="Your fees"></Input>
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timimg"
              name="timing"
              required
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker format="HH:MM" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-center m-2">
          <button
            className="bg-[#14bef0] hover:bg-[#0db2e4] px-4 py-1 text-[18px]  text-white font-bold  rounded-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
