import mongoose from "mongoose";
import "./hotel-model";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      index: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    media: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RoomModel = mongoose.models.rooms || mongoose.model("rooms", roomSchema);
export default RoomModel;