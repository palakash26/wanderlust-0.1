import BookingModel from "@/models/booking-model";
import React from "react";
import AdminBookingsTable from "../../_common/admin-bookings-table";
import dayjs from "dayjs";
import dbConnect from "@/utils/dbConnect";

async function ReportsData({ searchParams }: { searchParams: any }) {
  await dbConnect();
  const room = await BookingModel.find();
  console.log(room);


  const response = await BookingModel.find({
    bookingStatus: "Booked",
    createdAt: {
      // $gte: dayjs(searchParams.startDate).startOf("day").toDate(),
      // $lte: dayjs(searchParams.endDate).endOf("day").toDate(),
      $gte: searchParams.startDate,
      $lte: searchParams.endDate,
    },
  }).populate("room").populate("user").populate("hotel");

  console.log("response", JSON.parse(JSON.stringify(response)));
  const bookings = JSON.parse(JSON.stringify(response));
  console.log("Bookings", bookings);

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (acc: number, booking: any) => acc + booking.totalAmount,
    0
  );
  return (
    <div>
      <div className="md:flex-row flex-col flex gap-10">
        <div
          className=" border  py-7  rounded-md  px-10 flex flex-col border-solid gap-7"
          style={{ border: "1px solid #5DB996" }}
        >
          <h1 className="text-xl font-bold text-gray-600 text-center md:text-left lg:text-center">
            Total Bookings
          </h1>

          <h1
            className="text-5xl font-bold  text-center"
            style={{ color: "#5DB996" }}
          >
            {totalBookings}
          </h1>
        </div>

        <div
          className=" border border-gary-300 rounded-md  py-7  px-10 flex flex-col border-solid gap-7"
          style={{ border: "1px solid #5DB996" }}
        >
          <h1 className="text-xl font-bold text-gray-600 text-center md:text-left lg:text-center">
            Total Revenue
          </h1>
          <h1
            className="text-5xl font-bold  text-center"
            style={{ color: "#5DB996" }}
          >
            ₹{totalRevenue}
          </h1>
        </div>
      </div>

      <AdminBookingsTable bookings={bookings} />
    </div>
  );
}

export default ReportsData;


// import BookingModel from "@/models/booking-model";
// import React from "react";

// async function ReportsData({ searchParams }: { searchParams: any }) {
//   const response = await BookingModel.find({
//     bookingStatus: "Booked",
//     createdAt: {
//       $gte: searchParams.startDate,
//       $lte: searchParams.endDate,
//     },
//   });

//   const bookings = JSON.parse(JSON.stringify(response));
//   const totalBookings = bookings.length;
//   const totalRevenue = bookings.reduce(
//     (acc: number, booking: any) => acc + booking.totalAmount, 0
//   )

//   return <div>
//     <div
//       className=" border  py-7  rounded-md  px-10 flex flex-col border-solid gap-7"
//       style={{ border: "1px solid #5DB996" }}
//     >
//       <h1 className="text-xl font-bold text-gray-600 text-center md:text-left lg:text-center">
//         Total Bookings
//       </h1>

//       <h1
//         className="text-5xl font-bold  text-center"
//         style={{ color: "#5DB996" }}
//       >
//         {totalBookings}
//       </h1>
//     </div>
//   </div>

// };

// export default ReportsData;