"use client";
import { UploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import { HotelType } from "@/interfaces";
import { AddRoom, EditRoom } from "@/server-actions/rooms";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RoomsForm({
  type = "add",
  initialData,
  hotels,
}: {
  type?: string;
  initialData?: any;
  hotels: HotelType[];
}) {
  const [uploadedFiles, setUploadedFiles] = useState([]) as any[];
  const [existingMedia = [], setExistingMedia] = useState(
    initialData?.media || []
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const newUrls = await UploadImageToFirebaseAndReturnUrls(uploadedFiles);
      values.media = [...existingMedia, ...newUrls];
      let response:any = null;

      if (type === "add") {
        response = await AddRoom(values);
      } else {
        response = await EditRoom({
          roomId: initialData._id,
          payload: values,
        });
      }

      if (response?.success) {
        message.success(response.message);
        router.push("/subadmin/rooms");
      }
      if (!response?.success) {
        message.error(response?.error);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      className="grid grid-cols-3 gap-5  mt-5 mb-5"
      onFinish={onFinish}
      initialValues={initialData}
    >
      <Form.Item
        label="Hotel"
        name="hotel"
        rules={[{ required: true, message: " Hotel is required!" }]}
        className="col-span-3 lg:col-span-1 "
      >
        <Select placeholder="Type of Hotels...">
          {hotels.map((hotel) => (
            <Select.Option key={hotel._id} value={hotel._id}>
              {hotel.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: " Name is required!" }]}
        className="col-span-3 lg:col-span-1 "
      >
        <Input placeholder="Enter the name" />
      </Form.Item>

      <Form.Item
        label="Room Number"
        name="roomNumber"
        rules={[{ required: true, message: "Room Number is required!" }]}
        className="col-span-3 lg:col-span-1 "
      >
        <Input placeholder="Room Number" />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Type is required!" }]}
        className="col-span-3 lg:col-span-1 "
      >
        <Select placeholder="Type of Room...">
          <Select.Option key="delux" value="delux">
            Delux
          </Select.Option>
          <Select.Option key="premium" value="premium">
            Premium
          </Select.Option>
          <Select.Option key="standard" value="standard">
            Standard
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="BedRooms"
        name="bedrooms"
        rules={[{ required: true, message: "Bedrooms count is required!" }]}
        className="col-span-3 lg:col-span-1 "
      >
        <Input placeholder="Bedrooms.." />
      </Form.Item>

      <Form.Item
        label="Rent Per Day"
        name="rentPerDay"
        rules={[{ required: true, message: "Rent Per Day is required!" }]}
        className="col-span-3 lg:col-span-1 "
      >
        <Input placeholder="Rent Per Day" />
      </Form.Item>

      <Form.Item
        label="Amenities"
        name="amenities"
        rules={[{ required: true, message: "Amenities is required!" }]}
        className="col-span-3"
      >
        <Input placeholder="Amenities..." />
      </Form.Item>

      <div className="col-span-3 flex flex-wrap gap-5">
        {/* Container for existing media */}
        <div className="flex flex-wrap gap-5  p-3">
          {existingMedia.map((media: any, index: number) => (
            <div
              className="flex flex-col h-28 w-28 sm:h-24 sm:w-24 md:h-28 md:w-28  border-solid rounded border border-gray-200 gap-2 items-center"
              key={index}
              style={{ minWidth: "112px" }}
            >
              <img
                src={media}
                alt="media"
                className="h-20 w-20 sm:h-16 sm:w-16 md:h-20 md:w-20 object-cover"
              />
              <div
                className="text-teal-500 underline text-sm cursor-pointer"
                onClick={() => {
                  setExistingMedia(
                    existingMedia.filter(
                      (item: string, i: number) => i !== index
                    )
                  );
                }}
              >
                Remove
              </div>
            </div>
          ))}

          {/* Add an empty div to maintain border consistency when there are no media */}
          {/* {existingMedia.length === 0 && (
        <div className="h-28 w-28 sm:h-24 sm:w-24 md:h-28 md:w-28 border-0"></div>
      )} */}
        </div>

        {/* Upload component with responsive size */}
        <Upload
          listType="picture-card"
          className="h-28 w-28 sm:h-24 sm:w-24 md:h-28 md:w-28 flex items-center justify-center border-solid border-gray-200"
          beforeUpload={(file) => {
            setUploadedFiles((prev:any)=>[...prev,file]);
            return false;
          }}
          multiple
        >
          <span className="text-sm text-gray-500">Upload Media</span>
        </Upload>
      </div>

      <div className="col-span-3 flex justify-end gap-5">
        <Button disabled={loading} onClick={() => router.push("/subadmin/rooms")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {type === "add" ? "Add" : "Update"}
        </Button>
      </div>
    </Form>
  );
}

export default RoomsForm;
