import { RoomType } from "@/interfaces";
import { Image } from "antd";
import React from "react";

const DEFAULT_ROOM_IMAGE =
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80";

function RoomInfo({ room }: { room: RoomType }) {
  const renderRoomProperty = (label: String, value: string) => {
    return (
      <div className="flex flex-col gap-1 text-gray-600">
        <span className="text-xs">{label}:</span>
        <span className="text-sm font-semibold">{value}</span>
      </div>
    );
  };

  const mediaList =
    room.media && room.media.length > 0 ? room.media : [DEFAULT_ROOM_IMAGE];

  return (
    <div className="mb-7">
      <div className="flex flex-wrap gap-7">
        {mediaList.map((media, index) => (
          <Image
            src={media || DEFAULT_ROOM_IMAGE}
            key={index}
            width={200}
            height={170}
            className="rounded-lg object-cover"
            fallback={DEFAULT_ROOM_IMAGE}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-7 capitalize">
        {renderRoomProperty("Room Name", room.name)}
        {renderRoomProperty("Room Type", room.type)}
        {renderRoomProperty("Room Number", room.roomNumber.toString())}
        {renderRoomProperty("Rent Per Day", room.rentPerDay.toString())}
        {renderRoomProperty("BedRooms", room.bedrooms.toString())}
        {renderRoomProperty("Owner", room.hotel.owner)}
        {renderRoomProperty("Email", room.hotel.email)}
        {renderRoomProperty("Phone", room.hotel.phone)}
      </div>

      {/* <div className="mt-7">
        <h1 className="text-xl text-teal-600 font-semibold ">Amenities</h1>
        <div className="flex flex-wrap gap-4 mt-2">
          {room.amenities.split(",").map((amenity,index)=>(
            <div 
            key={index}
            className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs capitalize">
              {amenity}
            </div>
          ))}
        </div>
      </div> */}

      <div className="mt-7">
        <h1 className="text-xl text-teal-600 font-semibold">Amenities</h1>
        <div className="flex flex-wrap gap-4 mt-2">
          {Array.from(new Set(room.amenities?.split(",").filter(Boolean))).map(
            (amenity, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-xs capitalize"
              >
                {amenity.trim().replace(/\s+/g, " ")}
                {/* Ensures proper spacing between words */}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomInfo;
