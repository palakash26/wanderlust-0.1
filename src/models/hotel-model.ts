import mongoose from "mongoose";
const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    owner: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    media: {
      type: Array,
      require: true,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

if (mongoose.models && mongoose.models["hotels"]) {
  delete mongoose.models["hotels"];
}
// const HotelModel = mongoose.model("hotels",hotelSchema);
const HotelModel = mongoose.model("hotels",hotelSchema);

// const HotelModel = mongoose.model("hotels", hotelSchema);
export default HotelModel;

