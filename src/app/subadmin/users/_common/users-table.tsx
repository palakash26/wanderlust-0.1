// "use client";
// import { UserType } from "@/interfaces";
// import { UpdateUserRole } from "@/server-actions/users";
// import { message, Table } from "antd";
// import dayjs from "dayjs";
// import React from "react";

// function UsersTable({ users }: { users: UserType[] }) {
//   const [loading, setLoading] = React.useState(false);
//   const onRoleChnage = async (userId: string, isAdmin: boolean,isSubAdmin:boolean) => {
//     try {
//       setLoading(true);
//       const response = await UpdateUserRole(userId, isAdmin,isSubAdmin);
//       if (response.success) {
//         message.success(response.message);
//       } else {
//         message.error(response.message);
//       }
//     } catch (error: any) {
//       message.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "User Id",
//       dataIndex: "_id",
//       key: "_id",
//     },
//     {
//       title: "Joined At",
//       dataIndex: "createdAt",
//       render: (value: string) => dayjs(value).format("MMM DD, YYYY hh:mm A"),
//       key: "createdAt",
//     },
//     {
//       title: "Role",
//       dataIndex: "isAdmin",
//       render: (isAdmin: boolean, user: UserType) => (
//         <select
//           className="w-full px-2 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//           onChange={(e) => onRoleChnage(user._id, e.target.value === "admin")}
//         >
//           <option value="admin" selected={isAdmin}>
//             Admin
//           </option>
//           <option value="user" selected={!isAdmin}>
//             User
//           </option>
//           {/* <option
//             value="subadmin"
//             selected={user.isAdmin === false && !user.isActive}
//           >
//             Subadmin
//           </option> */}
//         </select>
//       ),
//     },
//   ];

//   return (
//     <Table
//       dataSource={users}
//       columns={columns}
//       pagination={{ pageSize: 10 }}
//       scroll={{ x: 800 }}
//       loading={loading}
//     />
//   );
// }

// export default UsersTable;
"use client";
import { UserType } from "@/interfaces";
import { UpdateUserRole } from "@/server-actions/users";
import { message, Table } from "antd";
import dayjs from "dayjs";
import React from "react";

function UsersTable({ users }: { users: UserType[] }) {
  const [loading, setLoading] = React.useState(false);

  const onRoleChange = async (userId: string, role: string) => {
    try {
      setLoading(true);
      const response = await UpdateUserRole(userId, role);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      message.error(error.message || "An error occurred while updating role");
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      render: (value: string) => dayjs(value).format("MMM DD, YYYY hh:mm A"),
      key: "createdAt",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_: string, user: UserType) => (
        <select
          className="w-full px-2 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          defaultValue={user.isSubAdmin ? "subadmin" : "user"}
          onChange={(e) => {
            if (user.isSubAdmin && e.target.value === "user") {
              message.warning("Sub-admins cannot be downgraded to User.");
              return;
            }
            onRoleChange(user._id, e.target.value);
          }}
        >
          <option value="subadmin">Sub-admin</option>
          <option value="user" disabled={user.isSubAdmin}>
            User
          </option>
        </select>
      ),
      key: "role",
    },
  ];

  return (
    <Table
      dataSource={users.filter((user) => !user.isAdmin)}
      columns={columns}
      pagination={{ pageSize: 10 }}
      scroll={{ x: 800 }}
      loading={loading}
      rowKey="_id"
    />
  );
}

export default UsersTable;
