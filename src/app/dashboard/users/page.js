"use client"
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export default function page() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8002/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setUsers(data.data.data);
    } catch {
      setUsers([
        {
          id:"1",
          user_name:"Ahmed Wardi",
          email:"ivarrais2001@gmail.com",
          created_date:"2025-10-28"
        },
        {
          id:"1",
          user_name:"Ilias Rais",
          email:"ivarrais2001@gmail.com",
          created_date:"2025-10-28"
        },
        {
          id:"1",
          user_name:"Ilias Rais",
          email:"ivarrais2001@gmail.com",
          created_date:"2025-10-28"
        },
        {
          id:"1",
          user_name:"Ilias Rais",
          email:"ivarrais2001@gmail.com",
          created_date:"2025-10-28"
        },
      ]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-9 mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 py-[40px]">
      <div className="flex flex-col w-full gap-[12px]">
        <DataTable
          columns={columns}
          data={users}
          onUserUpdate={fetchUsers}
          onUserDelete={fetchUsers}
        />
      </div>
    </div>
  );
}
