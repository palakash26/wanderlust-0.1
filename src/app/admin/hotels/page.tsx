import { connectMongoDB } from "@/config/db";
import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import HotelModel from "@/models/hotel-model";
import React from "react";
import HotelsTable from "./_common/hotels-table";

async function HotelPage() {
  await connectMongoDB();
  const response = await HotelModel.find().sort({ createdAt: -1 }).lean();
  const hotels = JSON.parse(JSON.stringify(response));

  return (
    <div>
      <div className="flex justify-between items-center uppercase">
        <PageTitle title="Hotels" />
        <LinkButton title="Add Hotel" path="/admin/hotels/add" />
      </div>

      <HotelsTable hotels={hotels} />
    </div>
  );
}

export default HotelPage;
