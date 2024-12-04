"use client"
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export default function Page() {  // Convention: component names should start with uppercase
  const [tasks, setTasks] = useState([]);

  const getData = async () => {
    try {
      const tasksResponse = await fetch("http://localhost:8001/api/tasks", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const projectsResponse = await fetch("http://localhost:8000/api/projects", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!tasksResponse.ok || !projectsResponse.ok) {
        throw new Error("Failed to fetch data from APIs");
      }

      const tasksData = await tasksResponse.json();
      const projectsData = await projectsResponse.json();

      // Map project IDs to names for quick lookup
      const projectMap = {};
      projectsData.data.forEach((project) => {
        projectMap[project.id] = project.name;
      });

      // Combine tasks with project names and limit to 5 tasks
      const combinedData = tasksData.data.map((task) => ({
        id: task.id,
        task_name: task.name,
        project_name: projectMap[task.project_id] || "Unknown Project",
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
      }));
      setTasks(combinedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();  // Calling getData instead of fetchTasks
  }, []);

  return (
    <div className="flex flex-col gap-9 mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 py-[40px]">
      <div className="flex flex-col w-full gap-[12px]">
        <DataTable
          columns={columns}
          data={tasks}
          onProjectUpdate={getData}  // Use getData for updates
          onProjectDelete={getData}  // Use getData for deletions
        />
      </div>
    </div>
  );
}
