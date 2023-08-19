const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotification,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = new express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//ReGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

//Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//Notification Doctor || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);

// Delete Notification Doctor || POST
router.post("/delete-all-notification", authMiddleware, deleteAllNotification);

//GET all doctor
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//book appointment POST
router.post("/book-appointment", authMiddleware, bookAppointmentController);

//Booking Avliability
router.post(
  "/booking-availibility",
  authMiddleware,
  bookingAvailabilityController
);

//appointment-list
router.get("/user-appointments", authMiddleware, userAppointmentController);

module.exports = router;
