import mongoose from "mongoose";
import "./hotel-model";
import "./room-model";
import "./user-models";

const bookingSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
      required: true,
      index: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    checkInDate: {
      type: String,
      required: true,
      index: true,
    },
    checkOutDate: {
      type: String,
      required: true,
      index: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
      default: "Booked",
      index: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BookingModel =
  mongoose.models.bookings || mongoose.model("bookings", bookingSchema);
export default BookingModel;