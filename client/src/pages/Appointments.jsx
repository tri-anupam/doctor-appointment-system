import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Table, message } from "antd";
import moment from "moment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/user/user-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      // console.log(error);
      message.error("Something wents Wrong");
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.firstName} {record.doctorId.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorId.phone}</span>,
    // },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <Layout>
      <h1 className="font-bold text-4xl sm:mb-20 mb-14">Your Appointmetns</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;
