import React from "react";
import docImage from "../assets/docImage.png";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-xl drop-shadow-2xl border-gray-400 border-b-[1px] p-2 m-2">
        <img
          className="w-[120px] h-[120px] m-auto"
          src={docImage}
          alt="doc-image"
        />
        <div className="px-6 py-4 ">
          <div className="font-bold text-xl mb-2">
            Dr. {doctor.firstName} {doctor.lastName}
          </div>
          <p className="text-gray-700 text-base">
            <b>Specialization:</b> {doctor.specialization}
          </p>
          <p className="text-gray-700 text-base">
            <b>Experience:</b> {doctor.experience} Years
          </p>
          <p className="text-gray-700 text-base">
            <b>Fees Per Consultation:</b> ₹{doctor.feesPerCunsaltation}
          </p>
          <p className="text-gray-700 text-base">
            <b>Timings:</b> {doctor.timing[0]} - {doctor.timing[1]}
          </p>
        </div>
        <button
          className="bg-[#14bef0] hover:bg-[#0db2e4] w-full text-white p-1 m-auto rounded-md text-center"
          onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
        >
          Book an Appointment
        </button>
      </div>
    </>
  );
};

export default DoctorList;
