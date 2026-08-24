import { RoomType } from "@/interfaces";
import RoomModel from "@/models/room-model";
import dbConnect from "@/utils/dbConnect";
import HotelModel from "@/models/hotel-model";
import Link from "next/link";
import React from "react";
import { GetAvailabeRooms } from "@/server-actions/bookings";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import RoomCardImage from "@/components/room-card-image";

async function RoomsData({ searchParams }: { searchParams: any }) {
  await dbConnect();

  console.log("Search Params:", searchParams);

  const response = await GetAvailabeRooms({
    reqCheckInDate: searchParams.checkIn || "",
    reqCheckOutDate: searchParams.checkOut || "",
    type: searchParams.type || "",
  });

  console.log("Rooms Response:", response.data);

  const rooms: RoomType[] = response.data;
  
  if (!rooms || rooms.length === 0) {
    return <div>No rooms found</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {rooms.map((room: RoomType) => (
        <Link
          href={`book-room/${room._id}`}
          key={room._id}
          className="no-underline text-black group flex flex-col h-full"
        >
          <div className="flex flex-col flex-1 border border-gray-200 rounded-2xl bg-white room-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            <RoomCardImage media={room.media} roomName={room.name} />
            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-gray-900 text-lg group-hover:text-teal-600 transition-colors line-clamp-1">
                  {room.name}
                </span>
                <span className="text-teal-600 text-xs font-medium line-clamp-2 min-h-[2.5rem]">
                  {room.hotel && (room.hotel.name || room.hotel.address)
                    ? `${room.hotel.name || "Boutique Hotel"} - ${
                        room.hotel.address || "Prime Location"
                      }`
                    : "Tripora Deluxe Resort"}

                </span>
              </div>
              <div className="flex flex-col gap-3">
                <hr className="border-gray-100 border-t" />
                <div className="flex justify-between items-center font-bold text-slate-800">
                  <span className="text-base">
                    ₹{room.rentPerDay}{" "}
                    <span className="text-xs font-normal text-gray-500">
                      / Per Day
                    </span>
                  </span>
                  <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-3 py-1 rounded-full border border-teal-100 group-hover:bg-teal-500 group-hover:text-white transition-all">
                    View Details →
                  </span>
                </div>
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
