"use client";
import { HotelType } from "@/interfaces";
import { DeleteHotel } from "@/server-actions/hotels";
import { message, Table } from "antd";
import dayjs from "dayjs";
import { Edit, PlusSquare, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function HotelsTable({ hotels }: { hotels: HotelType[] }) {
  const router = useRouter();
  const [loading = false, setLoading] = React.useState<boolean>(false);

  const onDelete = async (hotelId: string) => {
    try {
      setLoading(true);
      const response = await DeleteHotel(hotelId);
      if (response.success) {
        message.success(response.message);
      }
      if (!response.success) {
        message.error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: HotelType) =>
        dayjs(record.createdAt).format("MM-DD-YYYY | hh:mm A"),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: HotelType) => (
        <div className="flex gap-5 items-center">
          <Edit
            size={18}
            className="cursor-pointer text-yellow-700"
            onClick={() => router.push(`/admin/hotels/edit/${record._id}`)}
          />
          <Trash2
            size={18}
            className="cursor-pointer text-red-700"
            onClick={() => onDelete(record._id)}
          />
          <PlusSquare size={18} className="cursor-pointer text-green-700" />
        </div>
      ),
    },
  ];

  return (
    <div className="">
      <Table
        loading={loading}
        dataSource={hotels}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }} // Enables horizontal scrolling for smaller screens
      />
    </div>
  );
}

export default HotelsTable;
