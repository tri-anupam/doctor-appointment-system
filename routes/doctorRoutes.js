const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentController,
  updateStatusController,
} = require("../controllers/doctorCtrl");
const router = express.Router();

//POST Single doc info
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST Update profile
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST GET single doctor info
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//GET Doctor Appointments
router.get("/doctor-appointments", authMiddleware, doctorAppointmentController);

//POST update status
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
