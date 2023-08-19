import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import docImage from "../assets/docImage.png";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailible, setIsAvailible] = useState(false);
  const [doctor, setDoctors] = useState([]);

  //login user data
  const getAllDoctors = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
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

  //--------->Handle Booking
  const handleBooking = async () => {
    try {
      if (!date && !time) {
        return message.warning("Date and Time is Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log("Error in handle booking ", error);
      message.error("Something wents wrong while Booking");
    }
  };

  //check availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8000/api/v1/booking-availibility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailible(true);
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

  useEffect(() => {
    getAllDoctors();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="font-bold text-4xl sm:mb-20 mb-14">Booking Page</h1>

      {doctor && (
        <div className="drop-shadow-l flex justify-center items-center flex-col sm:w-[600px] p-1">
          <div className=" p-2 flex flex-col sm:flex-row justify-center items-center sm:w-[600px]">
            <img className="w-60 h-60  m-1" src={docImage} alt="doc-image" />
            <div className=" m-1 text-xl ">
              <p className="text-gray-700 p-2 w-fit">
                <b>Dr.</b> {doctor.firstName} {doctor.lastName}
              </p>
              <p className="text-gray-700 p-2 w-fit ">
                <b>Specialization:</b> {doctor.specialization}
              </p>
              <p className="text-gray-700 p-2 w-fit ">
                <b>Experience:</b> {doctor.experience} Years
              </p>
              <p className="text-gray-700 p-2 ">
                <b>Fees Per Consultation:</b> ₹{doctor.feesPerCunsaltation}
              </p>
              {/* <p className="text-gray-700 p-2 w-fit ">
                <b>Timings:</b> {doctor.timing[0]} - {doctor.timing[1]}
              </p> */}
            </div>
          </div>
          <div className="flex flex-col w-full">
            <DatePicker
              className="m-2"
              format="DD-MM-YYYY"
              onChange={(value) => {
                setIsAvailible(false);
                setDate(moment(value).format("DD-MM-YYYY"));
              }}
            />
            <TimePicker
              format="HH:mm"
              className="m-2"
              onChange={(value) => {
                setIsAvailible(false);
                setTime(moment(value).format("HH:mm"));
              }}
            />
            <button
              className="mt-2 bg-[#14bef0] hover:bg-[#0db2e4] text-white p-1  rounded-sm text-center w-full"
              onClick={handleAvailability}
            >
              Check Availability
            </button>

            {!isAvailible && (
              <button
                className="mt-2 bg-blue-700 hover:bg-blue-800 text-white p-1 m-auto rounded-sm text-center w-full"
                onClick={handleBooking}
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BookingPage;
