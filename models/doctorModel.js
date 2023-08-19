const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      require: [true, "first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization is require"],
    },
    experience: {
      type: String,
      required: [true, "experience is required"],
    },
    feesPerCunsaltation: {
      type: Number,
      required: [true, "fees is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timing: {
      type: Object,
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
