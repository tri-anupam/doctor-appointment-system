import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Table, message } from "antd";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  //getDoctors
  const getDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  //handle account status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("Something wents wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  //antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone no.",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" ? (
            <button
              className="p-1 text-white px-2 bg-green-500 hover:bg-green-600 rounded-md"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="p-1 text-white px-2 bg-red-500 hover:bg-red-600 rounded-md">
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-center m-2">Doctors List</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
