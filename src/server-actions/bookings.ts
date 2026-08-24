"use server";

import { connectMongoDB } from "@/config/db";
import BookingModel from "@/models/booking-model";
import { GetCurrentUserFromMongoDB } from "./users";
import { revalidatePath } from "next/cache";
import RoomModel from "@/models/room-model";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const CheckRoomAvailability = async ({
  roomId,
  reqCheckInDate,
  reqCheckOutDate,
}: {
  roomId: string;
  reqCheckInDate: string;
  reqCheckOutDate: string;
}) => {
  try {
    await connectMongoDB();
    const currentDate = new Date().toISOString().split("T")[0];

    if (reqCheckInDate < currentDate) {
      return {
        success: false,
        message: "Check-in date cannot be in the past.",
      };
    }
    const bookedSlot = await BookingModel.findOne({
      room: roomId,
      bookingStatus: "Booked",
      $or: [
        {
          checkInDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          $and: [
            { checkInDate: { $lte: reqCheckInDate } },
            { checkOutDate: { $gte: reqCheckOutDate } },
          ],
        },
      ],
    }).lean();

    if (bookedSlot) {
      return {
        success: false,
      };
    }

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const BookRoom = async (payload: any) => {
  try {
    await connectMongoDB();
    const userResponse = await GetCurrentUserFromMongoDB();
    if (!userResponse.success || !userResponse.data) {
      return { success: false, message: "User not authenticated" };
    }
    payload.user = userResponse.data._id;
    const booking = new BookingModel(payload);
    await booking.save();
    revalidatePath("/user/bookings");

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const CancelBooking = async ({
  bookingId,
  paymentId,
}: {
  bookingId: string;
  paymentId: string;
}) => {
  try {
    await connectMongoDB();
    await BookingModel.findByIdAndUpdate(bookingId, {
      bookingStatus: "Cancelled",
    });

    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
    });

    if (refund.status !== "succeeded") {
      return {
        success: false,
        message:
          "Your booking has been cancelled but the refund failed. Please contact support for further assistance.",
      };
    }

    revalidatePath("/user/bookings");
    return {
      success: true,
      message:
        "Your booking has been cancelled and the refund has been procssed.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const GetAvailabeRooms = async ({
  reqCheckInDate,
  reqCheckOutDate,
  type,
}: {
  reqCheckInDate: string;
  reqCheckOutDate: string;
  type: string;
}) => {
  try {
    await connectMongoDB();
    if (!reqCheckInDate || !reqCheckOutDate) {
      const rooms = await RoomModel.find({
        ...(type && { type }),
      })
        .populate("hotel")
        .lean();

      return {
        success: true,
        data: JSON.parse(JSON.stringify(rooms)),
      };
    }

    const bookedSlots = await BookingModel.find({
      bookingStatus: "Booked",
      $or: [
        {
          checkInDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          $and: [
            { checkInDate: { $lte: reqCheckInDate } },
            { checkOutDate: { $gte: reqCheckOutDate } },
          ],
        },
      ],
    })
      .select("room")
      .lean();

    const bookedRoomIds = bookedSlots.map((slot) => slot.room);

    const rooms = await RoomModel.find({
      _id: { $nin: bookedRoomIds },
      ...(type && { type }),
    })
      .populate("hotel")
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(rooms)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};


// export const GetAvailabeRooms = async ({
//   reqCheckInDate,
//   reqCheckOutDate,
//   type,
// }: {
//   reqCheckInDate: string;
//   reqCheckOutDate: string;
//   type: string;
// }) => {
//   try {
//  // Convert the date from DD-MM-YYYY to ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
//  const convertToISODate = (date: string): Date => {
//   const parts = date.split("-"); // Split date by dash (DD-MM-YYYY)
//   return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`); // Convert to YYYY-MM-DD format
// };

//     if (!reqCheckInDate || !reqCheckOutDate) {
//       const rooms = await RoomModel.find({
//         ...(type && { type }),
//       });
//       return { success: true, data: JSON.parse(JSON.stringify(rooms)) };
//     }

//     const checkInDate = convertToISODate(reqCheckInDate);
//     const checkOutDate = convertToISODate(reqCheckOutDate);

//     console.log("CheckInDate:", checkInDate, "CheckOutDate:", checkOutDate);
//     const bookedSlots = await BookingModel.find({
//       bookingStatus: "Booked",
//       $or: [
//         {
//           checkInDate: {
//             $gte: checkInDate,
//             $lte: checkOutDate,
//           },
//         },
//         {
//           checkOutDate: {
//             $gte: checkInDate,
//             $lte: checkOutDate,
//           },
//         },
//         {
//           $and: [
//             { checkInDate: { $lte:checkInDate } },
//             { checkOutDate: { $gte: checkOutDate } },
//           ],
//         },
//       ],
//     });

//     const bookedRoomIds = bookedSlots.map((slot) => slot.room);

//     const rooms = await RoomModel.find({
//       _id: { $nin: bookedRoomIds },
//       ...(type && { type }),
//     });

//     return { success: true, data: JSON.parse(JSON.stringify(rooms)) };
//   } catch (error: any) {
//     console.error("Error in GetAvailabeRooms:", error);
//     return { success: false, message: error.message };
//   }
// };
