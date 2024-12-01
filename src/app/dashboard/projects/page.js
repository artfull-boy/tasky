"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export default function Page() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/data.json");
      if (!res.ok) {
        throw new Error("Failed to fetch the data");
      }
      const data = await res.json();
      console.log("Fetched data:", data); 
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]); 
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col gap-9 mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 py-[40px]">
      <div className="flex flex-col w-full gap-[12px]">
        <DataTable
          columns={columns}
          data={projects} 
          onProjectUpdate={fetchProjects}
          onProjectDelete={fetchProjects}
        />
      </div>
    </div>
  );
}