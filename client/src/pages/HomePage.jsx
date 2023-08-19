import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  //login user data
  const getAllDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <Layout>
      <h1 className="font-bold text-2xl text-center mb-10">Home Page</h1>
      <Row>
        {doctors &&
          doctors.map((doctor) => (
            <DoctorList doctor={doctor} key={doctor._id} />
          ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
