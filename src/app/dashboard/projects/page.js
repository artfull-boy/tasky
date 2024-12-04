"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export default function Page() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState({}); // Store user data as an object for efficient lookup

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/projects");
      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }
      const { data } = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }

    try {
      const res = await fetch("http://localhost:8002/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await res.json();
      // Convert the users array to an object for quick lookup
      const userMap = data.data.reduce((map, user) => {
        map[user.id] = user.name; // Assuming `id` and `name` are in the response
        return map;
      }, {});
      setUsers(userMap);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  // Enhance projects with user names
  const enhancedProjects = projects.map((project) => ({
    ...project,
    createdByName: users[project.createdBy] || "Unknown", // Map user ID to user name
  }));

  return (
    <div className="flex flex-col gap-9 mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 py-[40px]">
      <div className="flex flex-col w-full gap-[12px]">
        <DataTable
          columns={columns}
          data={enhancedProjects} // Use the enhanced data
          onProjectUpdate={fetchProjects}
          onProjectDelete={fetchProjects}
        />
      </div>
    </div>
  );
}
