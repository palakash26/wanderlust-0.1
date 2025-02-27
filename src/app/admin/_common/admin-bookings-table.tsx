
// "use client";
// import { BookingType } from "@/interfaces";
// import { Table } from "antd";
// import dayjs from "dayjs";
// import React from "react";


// function AdminBookingsTable({ bookings }: { bookings: BookingType[] }) {

//   const columns = [

//     {
//       title: "Customer",
//       dataIndex: "user",
//       key: "user",
//       render: (text: string, record: BookingType) => record.user.name,
//     },
//     {
//       title: "Hotel",
//       dataIndex: "hotel",
//       key: "hotel",
//       render: (text: string, record: BookingType) => record.hotel.name,
//     },
//     {
//       title: "Room",
//       dataIndex: "room",
//       key: "room",
//       render: (text: string, record: BookingType) => record.room.name,
//     },
//     {
//       title: "Room Number",
//       dataIndex: "roomNumber",
//       key: "roomNumber",
//       render: (text: string, record: BookingType) => record.room.roomNumber,
//     },
//     // {
//     //   title: "Check In Date",
//     //   dataIndex: "checkInDate",
//     //   key: "checkInDate",
//     //   render: (text: string, record: BookingType) =>
//     //     dayjs(record.createdAt).format("MMM DD, YYYY "),
//     // },
//     {
//       title: "Check In Date",
//       dataIndex: "checkInDate",
//       key: "checkInDate",
//       render: (text: string, record: BookingType) =>
//             dayjs(record.createdAt).format("MMM DD, YYYY "),
//     },
//     // {
//     //   title: "Check Out Date",
//     //   dataIndex: "checkOutDate",
//     //   key: "checkOutDate",
//     //   render: (text: string, record: BookingType) =>
//     //     dayjs(record.createdAt).format("MMM DD, YYYY "),
//     // },


//     {
//       title: "Check Out Date",
//       dataIndex: "checkOutDate",
//       key: "checkOutDate",
//       render: (text: string, record: BookingType) =>
//             dayjs(record.createdAt).format("MMM DD, YYYY "),
//     },
//     {
//       title: "Total Amount",
//       dataIndex: "totalAmount",
//       key: "totalAmount",
//       render: (text: string, record: BookingType) => record.totalAmount,
//     },
//     {
//       title: "Booking Date",
//       dateIndex: "createdAt",
//       key: "createdAt",
//       render: (text: string, record: BookingType) =>
//         dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A"),
//     },
//     {
//       title: "Status",
//       dataIndex: "bookingStatus",
//       key: "status",
//     },
//   ];
//   return (
//     <div className="py-5">
//       <Table dataSource={bookings} columns={columns}
//         pagination={{ pageSize: 10 }}
//         scroll={{ x: 800 }} // Enables horizontal scrolling for smaller screens
//       />
//     </div>
//   );
// }

// export default AdminBookingsTable;





"use client";
import { BookingType } from "@/interfaces";
import {  Table } from "antd";
import dayjs from "dayjs";
import React from "react";


function AdminBookingsTable({ bookings }: { bookings: BookingType[] }) {

  const columns = [
    {
      title: "Customer",
      dataIndex: "user",
      key: "user",
      render: (text: string, record: BookingType) => record.user.name,
    },
    {
      title: "Hotel",
      dataIndex: "hotel",
      key: "hotel",
      render: (text: string, record: BookingType) => record.hotel?.name || "N/A",
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (text: string, record: BookingType) => record.room?.name || "N/A" ,
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (text: string, record: BookingType) => record.room?.roomNumber || "N/A",
    },
    {
      title: "Check-In Date",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (text: string, record: BookingType) =>
        dayjs(record.checkInDate).format("MMM DD, YYYY"),
    },
    {
      title: "Check-Out Date",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (text: string, record: BookingType) =>
        dayjs(record.checkOutDate).format("MMM DD, YYYY"),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text: string, record: BookingType) => `₹${record.totalAmount}`,
    },
    {
      title: "Booking Date",
      dateIndex: "createdAt",
      key: "createdAt",
      render: (text: string, record: BookingType) =>
        dayjs(record.createdAt).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      key: "status",
    },
  ];

  return (
    <div className="py-5">
      <Table
        dataSource={bookings}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }} // Enables horizontal scrolling for smaller screens
      />
    </div>
  );
}

export default AdminBookingsTable;
