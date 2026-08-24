"use client";

import React, { useState } from "react";
import { Carousel } from "antd";

const DEFAULT_ROOM_IMAGE =
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80";

export default function RoomCardImage({
  media,
  roomName,
}: {
  media: string[];
  roomName: string;
}) {
  const mediaList = media && media.length > 0 ? media : [DEFAULT_ROOM_IMAGE];

  return (
    <Carousel
      arrows
      prevArrow={
        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      }
      nextArrow={
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      }
    >
      {mediaList.map((image, index) => (
        <img
          key={index}
          src={image || DEFAULT_ROOM_IMAGE}
          alt={`Room ${roomName} ${index}`}
          className="w-full h-64 object-cover rounded-t-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_ROOM_IMAGE;
          }}
        />
      ))}
    </Carousel>
  );
}
