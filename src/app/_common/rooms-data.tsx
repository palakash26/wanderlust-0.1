import { RoomType } from "@/interfaces";
import RoomModel from "@/models/room-model";
import dbConnect from "@/utils/dbConnect";
import HotelModel from "@/models/hotel-model";
import Link from "next/link";
import React from "react";
import { GetAvailabeRooms } from "@/server-actions/bookings";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

async function RoomsData({ searchParams }: { searchParams: any }) {
  await dbConnect();

  const hotels = await HotelModel.find();
  console.log(hotels);

  console.log("Search Params:", searchParams);

  const response = await GetAvailabeRooms({
    reqCheckInDate: searchParams.checkIn || "",
    reqCheckOutDate: searchParams.checkOut || "",
    type: searchParams.type || "",
  });

  console.log("Rooms Response:", response.data);

  const rooms: RoomType[] = response.data;
  
  if (rooms.length === 0) {
    return <div>No rooms found</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7  ">
      {rooms.map((room: RoomType) => (
        <Link
        href={`book-room/${room._id}`}
          key={room._id}
          className="no-underline text-black">
          <div className=" flex flex-col gap-2 border border-gray-200 border-solid rounded-t-lg room-card">
            {/* <img
              src={room.media[0]}
              className="w-full h-64 object-cover rounded-t-lg" /> */}
                <Carousel 
              arrows
              
              prevArrow={
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {/* &#9664; */}
                </button>
              }
              nextArrow={
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {/* &#9654; */}
                </button>
              }
            >
              {room.media.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Room ${index}`}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              ))}
            </Carousel>
            <div className="px-3 py-2 flex flex-col text-sm  gap-2">
              <span> {room.name}</span>
              <span className="text-teal-500 text-xs">
                {room.hotel
                  // ? `${room.hotel.name} - ${room.hotel.address}`
                  ? `${room.hotel.name || "Hotel name missing"} - ${room.hotel.address || "Address missing"
                  }`
                  : "Hotel information not available"}

                {/* {room.hotel.name} - {room.hotel.address} */}
              </span>
              <hr className="border-gray-200 border border-solid" />
              <div className="flex justify-between ">
                <span> ₹{room.rentPerDay} /Per Day</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default RoomsData;


                  // const response = await RoomModel.find()
                  //   .populate("hotel")
                  //   .sort({ createdAt: -1 });
                  // const rooms = await JSON.parse(JSON.stringify(response));
                
                  // Fetch rooms using GetAvailabeRooms
                  // const apiResponse = await GetAvailabeRooms({
                  //   reqCheckInDate: searchParams.checkIn || "",
                  //   reqCheckOutDate: searchParams.checkOut || "",
                  //   type: searchParams.type || "",
                  // });
                
                  // console.log("Rooms Response from API:", apiResponse.data);
                
                  // const roomsFromAPI: RoomType[] = apiResponse.data;
                
                  // // Fetch rooms using RoomModel with .populate("hotel")
                  // const dbResponse = await RoomModel.find()
                  //   .populate("hotel")
                  //   .sort({ createdAt: -1 });
                
                  // const roomsFromDB: RoomType[] = JSON.parse(JSON.stringify(dbResponse));
                
                  // // Combine or choose the preferred data source
                  // const rooms = roomsFromAPI.length > 0 ? roomsFromAPI : roomsFromDB;
