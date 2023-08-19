import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/admin/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          <button className="bg-red-500 px-2 p-1 rounded-md hover:bg-red-600 text-white">
            Block
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
