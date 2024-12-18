"use client";
import { UploadImageToFirebaseAndReturnUrls } from "@/helpers/image-upload";
import { AddHotel, EditHotel } from "@/server-actions/hotels";
import { Button, Form, Input, message, Upload } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function HotelForm({
  type = "add",
  initialData,
}: {
  type: string;
  initialData?: any;
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
      let response = null;

      if (type === "add") {
        response = await AddHotel(values);
      } else {
        response = await EditHotel({
          hotelId: initialData._id,
          payload: values,
        });
      }

      if (response?.success) {
        message.success(response.message);
        router.push("/admin/hotels");
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
        label="Hotel Name"
        name="name"
        className="col-span-3 "
        rules={[{ required: true, message: "Please input hotel name!" }]}
      >
        <Input placeholder="Hotel Name" />
      </Form.Item>
      <Form.Item
        label="Owner Name"
        name="owner"
        className="col-span-3 lg:col-span-1  "
        rules={[{ required: true, message: "Please input owner name!" }]}
      >
        <Input placeholder="Owner Name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        className="col-span-3 lg:col-span-1 "
        rules={[{ required: true, message: "Please input email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        className="col-span-3 lg:col-span-1  "
        rules={[{ required: true, message: "Please input phone!" }]}
      >
        <Input placeholder="Phone" />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        className="col-span-3"
        rules={[{ required: true, message: "Please input address!" }]}
      >
        <Input placeholder="Address" />
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
            setUploadedFiles([...uploadedFiles, file]);
            return false;
          }}
          multiple
        >
          <span className="text-sm text-gray-500">Upload Media</span>
        </Upload>
      </div>

      <div className="col-span-3 flex justify-end gap-5">
        <Button disabled={loading} onClick={() => router.push("/admin/hotels")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {type === "add" ? "Add" : "Update"}
        </Button>
      </div>
    </Form>
  );
}

export default HotelForm;
