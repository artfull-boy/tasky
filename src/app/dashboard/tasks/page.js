"use client"
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export default function page() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8001/api/admin/tasks", {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setTasks(data);
    } catch {
      setTasks([
        {
            "id": 1,
            "project_name": "Project 1",
            "status": "completed",
            "priority": "medium",
            "created_date": "2024-02-02",
            "due_date": "2024-05-07",
            "created_by": "Creator 1",
            "assigned_to": "Assignee 1",
            "task_name": "Task 1"
        },
        {
            "id": 2,
            "project_name": "Project 2",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-03-03",
            "due_date": "2024-06-08",
            "created_by": "Creator 2",
            "assigned_to": "Assignee 2",
            "task_name": "Task 2"
        },
        {
            "id": 3,
            "project_name": "Project 3",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-04-04",
            "due_date": "2024-07-09",
            "created_by": "Creator 3",
            "assigned_to": "Assignee 3",
            "task_name": "Task 3"
        },
        {
            "id": 4,
            "project_name": "Project 4",
            "status": "completed",
            "priority": "high",
            "created_date": "2024-05-05",
            "due_date": "2024-08-10",
            "created_by": "Creator 4",
            "assigned_to": "Assignee 4",
            "task_name": "Task 4"
        },
        {
            "id": 5,
            "project_name": "Project 5",
            "status": "pending",
            "priority": "medium",
            "created_date": "2024-06-06",
            "due_date": "2024-09-11",
            "created_by": "Creator 5",
            "assigned_to": "Assignee 5",
            "task_name": "Task 5"
        },
        {
            "id": 6,
            "project_name": "Project 6",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-07-07",
            "due_date": "2024-10-12",
            "created_by": "Creator 6",
            "assigned_to": "Assignee 6",
            "task_name": "Task 6"
        },
        {
            "id": 7,
            "project_name": "Project 7",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-08-08",
            "due_date": "2024-11-13",
            "created_by": "Creator 7",
            "assigned_to": "Assignee 7",
            "task_name": "Task 7"
        },
        {
            "id": 8,
            "project_name": "Project 8",
            "status": "pending",
            "priority": "high",
            "created_date": "2024-09-09",
            "due_date": "2024-12-14",
            "created_by": "Creator 8",
            "assigned_to": "Assignee 8",
            "task_name": "Task 8"
        },
        {
            "id": 9,
            "project_name": "Project 9",
            "status": "in_progress",
            "priority": "medium",
            "created_date": "2024-10-10",
            "due_date": "2024-01-15",
            "created_by": "Creator 9",
            "assigned_to": "Assignee 9",
            "task_name": "Task 9"
        },
        {
            "id": 10,
            "project_name": "Project 10",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-11-11",
            "due_date": "2024-02-16",
            "created_by": "Creator 10",
            "assigned_to": "Assignee 10",
            "task_name": "Task 10"
        },
        {
            "id": 11,
            "project_name": "Project 11",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-12-12",
            "due_date": "2024-03-17",
            "created_by": "Creator 11",
            "assigned_to": "Assignee 11",
            "task_name": "Task 11"
        },
        {
            "id": 12,
            "project_name": "Project 12",
            "status": "in_progress",
            "priority": "high",
            "created_date": "2024-01-13",
            "due_date": "2024-04-18",
            "created_by": "Creator 12",
            "assigned_to": "Assignee 12",
            "task_name": "Task 12"
        },
        {
            "id": 13,
            "project_name": "Project 13",
            "status": "completed",
            "priority": "medium",
            "created_date": "2024-02-14",
            "due_date": "2024-05-19",
            "created_by": "Creator 13",
            "assigned_to": "Assignee 13",
            "task_name": "Task 13"
        },
        {
            "id": 14,
            "project_name": "Project 14",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-03-15",
            "due_date": "2024-06-20",
            "created_by": "Creator 14",
            "assigned_to": "Assignee 14",
            "task_name": "Task 14"
        },
        {
            "id": 15,
            "project_name": "Project 15",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-04-16",
            "due_date": "2024-07-21",
            "created_by": "Creator 15",
            "assigned_to": "Assignee 15",
            "task_name": "Task 15"
        },
        {
            "id": 16,
            "project_name": "Project 16",
            "status": "completed",
            "priority": "high",
            "created_date": "2024-05-17",
            "due_date": "2024-08-22",
            "created_by": "Creator 16",
            "assigned_to": "Assignee 16",
            "task_name": "Task 16"
        },
        {
            "id": 17,
            "project_name": "Project 17",
            "status": "pending",
            "priority": "medium",
            "created_date": "2024-06-18",
            "due_date": "2024-09-23",
            "created_by": "Creator 17",
            "assigned_to": "Assignee 17",
            "task_name": "Task 17"
        },
        {
            "id": 18,
            "project_name": "Project 18",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-07-19",
            "due_date": "2024-10-24",
            "created_by": "Creator 18",
            "assigned_to": "Assignee 18",
            "task_name": "Task 18"
        },
        {
            "id": 19,
            "project_name": "Project 19",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-08-20",
            "due_date": "2024-11-25",
            "created_by": "Creator 19",
            "assigned_to": "Assignee 19",
            "task_name": "Task 19"
        },
        {
            "id": 20,
            "project_name": "Project 20",
            "status": "pending",
            "priority": "high",
            "created_date": "2024-09-21",
            "due_date": "2024-12-26",
            "created_by": "Creator 20",
            "assigned_to": "Assignee 20",
            "task_name": "Task 20"
        },
        {
            "id": 21,
            "project_name": "Project 21",
            "status": "in_progress",
            "priority": "medium",
            "created_date": "2024-10-22",
            "due_date": "2024-01-27",
            "created_by": "Creator 21",
            "assigned_to": "Assignee 21",
            "task_name": "Task 21"
        },
        {
            "id": 22,
            "project_name": "Project 22",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-11-23",
            "due_date": "2024-02-28",
            "created_by": "Creator 22",
            "assigned_to": "Assignee 22",
            "task_name": "Task 22"
        },
        {
            "id": 23,
            "project_name": "Project 23",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-12-24",
            "due_date": "2024-03-01",
            "created_by": "Creator 23",
            "assigned_to": "Assignee 23",
            "task_name": "Task 23"
        },
        {
            "id": 24,
            "project_name": "Project 24",
            "status": "in_progress",
            "priority": "high",
            "created_date": "2024-01-25",
            "due_date": "2024-04-02",
            "created_by": "Creator 24",
            "assigned_to": "Assignee 24",
            "task_name": "Task 24"
        },
        {
            "id": 25,
            "project_name": "Project 25",
            "status": "completed",
            "priority": "medium",
            "created_date": "2024-02-26",
            "due_date": "2024-05-03",
            "created_by": "Creator 25",
            "assigned_to": "Assignee 25",
            "task_name": "Task 25"
        },
        {
            "id": 26,
            "project_name": "Project 26",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-03-27",
            "due_date": "2024-06-04",
            "created_by": "Creator 26",
            "assigned_to": "Assignee 26",
            "task_name": "Task 26"
        },
        {
            "id": 27,
            "project_name": "Project 27",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-04-28",
            "due_date": "2024-07-05",
            "created_by": "Creator 27",
            "assigned_to": "Assignee 27",
            "task_name": "Task 27"
        },
        {
            "id": 28,
            "project_name": "Project 28",
            "status": "completed",
            "priority": "high",
            "created_date": "2024-05-01",
            "due_date": "2024-08-06",
            "created_by": "Creator 28",
            "assigned_to": "Assignee 28",
            "task_name": "Task 28"
        },
        {
            "id": 29,
            "project_name": "Project 29",
            "status": "pending",
            "priority": "medium",
            "created_date": "2024-06-02",
            "due_date": "2024-09-07",
            "created_by": "Creator 29",
            "assigned_to": "Assignee 29",
            "task_name": "Task 29"
        },
        {
            "id": 30,
            "project_name": "Project 30",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-07-03",
            "due_date": "2024-10-08",
            "created_by": "Creator 30",
            "assigned_to": "Assignee 30",
            "task_name": "Task 30"
        },
        {
            "id": 31,
            "project_name": "Project 31",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-08-04",
            "due_date": "2024-11-09",
            "created_by": "Creator 31",
            "assigned_to": "Assignee 31",
            "task_name": "Task 31"
        },
        {
            "id": 32,
            "project_name": "Project 32",
            "status": "pending",
            "priority": "high",
            "created_date": "2024-09-05",
            "due_date": "2024-12-10",
            "created_by": "Creator 32",
            "assigned_to": "Assignee 32",
            "task_name": "Task 32"
        },
        {
            "id": 33,
            "project_name": "Project 33",
            "status": "in_progress",
            "priority": "medium",
            "created_date": "2024-10-06",
            "due_date": "2024-01-11",
            "created_by": "Creator 33",
            "assigned_to": "Assignee 33",
            "task_name": "Task 33"
        },
        {
            "id": 34,
            "project_name": "Project 34",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-11-07",
            "due_date": "2024-02-12",
            "created_by": "Creator 34",
            "assigned_to": "Assignee 34",
            "task_name": "Task 34"
        },
        {
            "id": 35,
            "project_name": "Project 35",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-12-08",
            "due_date": "2024-03-13",
            "created_by": "Creator 35",
            "assigned_to": "Assignee 35",
            "task_name": "Task 35"
        },
        {
            "id": 36,
            "project_name": "Project 36",
            "status": "in_progress",
            "priority": "high",
            "created_date": "2024-01-09",
            "due_date": "2024-04-14",
            "created_by": "Creator 36",
            "assigned_to": "Assignee 36",
            "task_name": "Task 36"
        },
        {
            "id": 37,
            "project_name": "Project 37",
            "status": "completed",
            "priority": "medium",
            "created_date": "2024-02-10",
            "due_date": "2024-05-15",
            "created_by": "Creator 37",
            "assigned_to": "Assignee 37",
            "task_name": "Task 37"
        },
        {
            "id": 38,
            "project_name": "Project 38",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-03-11",
            "due_date": "2024-06-16",
            "created_by": "Creator 38",
            "assigned_to": "Assignee 38",
            "task_name": "Task 38"
        },
        {
            "id": 39,
            "project_name": "Project 39",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-04-12",
            "due_date": "2024-07-17",
            "created_by": "Creator 39",
            "assigned_to": "Assignee 39",
            "task_name": "Task 39"
        },
        {
            "id": 40,
            "project_name": "Project 40",
            "status": "completed",
            "priority": "high",
            "created_date": "2024-05-13",
            "due_date": "2024-08-18",
            "created_by": "Creator 40",
            "assigned_to": "Assignee 40",
            "task_name": "Task 40"
        },
        {
            "id": 41,
            "project_name": "Project 41",
            "status": "pending",
            "priority": "medium",
            "created_date": "2024-06-14",
            "due_date": "2024-09-19",
            "created_by": "Creator 41",
            "assigned_to": "Assignee 41",
            "task_name": "Task 41"
        },
        {
            "id": 42,
            "project_name": "Project 42",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-07-15",
            "due_date": "2024-10-20",
            "created_by": "Creator 42",
            "assigned_to": "Assignee 42",
            "task_name": "Task 42"
        },
        {
            "id": 43,
            "project_name": "Project 43",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-08-16",
            "due_date": "2024-11-21",
            "created_by": "Creator 43",
            "assigned_to": "Assignee 43",
            "task_name": "Task 43"
        },
        {
            "id": 44,
            "project_name": "Project 44",
            "status": "pending",
            "priority": "high",
            "created_date": "2024-09-17",
            "due_date": "2024-12-22",
            "created_by": "Creator 44",
            "assigned_to": "Assignee 44",
            "task_name": "Task 44"
        },
        {
            "id": 45,
            "project_name": "Project 45",
            "status": "in_progress",
            "priority": "medium",
            "created_date": "2024-10-18",
            "due_date": "2024-01-23",
            "created_by": "Creator 45",
            "assigned_to": "Assignee 45",
            "task_name": "Task 45"
        },
        {
            "id": 46,
            "project_name": "Project 46",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-11-19",
            "due_date": "2024-02-24",
            "created_by": "Creator 46",
            "assigned_to": "Assignee 46",
            "task_name": "Task 46"
        },
        {
            "id": 47,
            "project_name": "Project 47",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-12-20",
            "due_date": "2024-03-25",
            "created_by": "Creator 47",
            "assigned_to": "Assignee 47",
            "task_name": "Task 47"
        },
        {
            "id": 48,
            "project_name": "Project 48",
            "status": "in_progress",
            "priority": "high",
            "created_date": "2024-01-21",
            "due_date": "2024-04-26",
            "created_by": "Creator 48",
            "assigned_to": "Assignee 48",
            "task_name": "Task 48"
        },
        {
            "id": 49,
            "project_name": "Project 49",
            "status": "completed",
            "priority": "medium",
            "created_date": "2024-02-22",
            "due_date": "2024-05-27",
            "created_by": "Creator 49",
            "assigned_to": "Assignee 49",
            "task_name": "Task 49"
        },
        {
            "id": 50,
            "project_name": "Project 50",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-03-23",
            "due_date": "2024-06-28",
            "created_by": "Creator 50",
            "assigned_to": "Assignee 50",
            "task_name": "Task 50"
        },
        {
            "id": 51,
            "project_name": "Project 51",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-04-24",
            "due_date": "2024-07-01",
            "created_by": "Creator 51",
            "assigned_to": "Assignee 51",
            "task_name": "Task 51"
        },
        {
            "id": 52,
            "project_name": "Project 52",
            "status": "completed",
            "priority": "high",
            "created_date": "2024-05-25",
            "due_date": "2024-08-02",
            "created_by": "Creator 52",
            "assigned_to": "Assignee 52",
            "task_name": "Task 52"
        },
        {
            "id": 53,
            "project_name": "Project 53",
            "status": "pending",
            "priority": "medium",
            "created_date": "2024-06-26",
            "due_date": "2024-09-03",
            "created_by": "Creator 53",
            "assigned_to": "Assignee 53",
            "task_name": "Task 53"
        },
        {
            "id": 54,
            "project_name": "Project 54",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-07-27",
            "due_date": "2024-10-04",
            "created_by": "Creator 54",
            "assigned_to": "Assignee 54",
            "task_name": "Task 54"
        },
        {
            "id": 55,
            "project_name": "Project 55",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-08-28",
            "due_date": "2024-11-05",
            "created_by": "Creator 55",
            "assigned_to": "Assignee 55",
            "task_name": "Task 55"
        },
        {
            "id": 56,
            "project_name": "Project 56",
            "status": "pending",
            "priority": "high",
            "created_date": "2024-09-01",
            "due_date": "2024-12-06",
            "created_by": "Creator 56",
            "assigned_to": "Assignee 56",
            "task_name": "Task 56"
        },
        {
            "id": 57,
            "project_name": "Project 57",
            "status": "in_progress",
            "priority": "medium",
            "created_date": "2024-10-02",
            "due_date": "2024-01-07",
            "created_by": "Creator 57",
            "assigned_to": "Assignee 57",
            "task_name": "Task 57"
        },
        {
            "id": 58,
            "project_name": "Project 58",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-11-03",
            "due_date": "2024-02-08",
            "created_by": "Creator 58",
            "assigned_to": "Assignee 58",
            "task_name": "Task 58"
        },
        {
            "id": 59,
            "project_name": "Project 59",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-12-04",
            "due_date": "2024-03-09",
            "created_by": "Creator 59",
            "assigned_to": "Assignee 59",
            "task_name": "Task 59"
        },
        {
            "id": 60,
            "project_name": "Project 60",
            "status": "in_progress",
            "priority": "high",
            "created_date": "2024-01-05",
            "due_date": "2024-04-10",
            "created_by": "Creator 60",
            "assigned_to": "Assignee 60",
            "task_name": "Task 60"
        },
        {
            "id": 61,
            "project_name": "Project 61",
            "status": "completed",
            "priority": "medium",
            "created_date": "2024-02-06",
            "due_date": "2024-05-11",
            "created_by": "Creator 61",
            "assigned_to": "Assignee 61",
            "task_name": "Task 61"
        },
        {
            "id": 62,
            "project_name": "Project 62",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-03-07",
            "due_date": "2024-06-12",
            "created_by": "Creator 62",
            "assigned_to": "Assignee 62",
            "task_name": "Task 62"
        },
        {
            "id": 63,
            "project_name": "Project 63",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-04-08",
            "due_date": "2024-07-13",
            "created_by": "Creator 63",
            "assigned_to": "Assignee 63",
            "task_name": "Task 63"
        },
        {
            "id": 64,
            "project_name": "Project 64",
            "status": "completed",
            "priority": "high",
            "created_date": "2024-05-09",
            "due_date": "2024-08-14",
            "created_by": "Creator 64",
            "assigned_to": "Assignee 64",
            "task_name": "Task 64"
        },
        {
            "id": 65,
            "project_name": "Project 65",
            "status": "pending",
            "priority": "medium",
            "created_date": "2024-06-10",
            "due_date": "2024-09-15",
            "created_by": "Creator 65",
            "assigned_to": "Assignee 65",
            "task_name": "Task 65"
        },
        {
            "id": 66,
            "project_name": "Project 66",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-07-11",
            "due_date": "2024-10-16",
            "created_by": "Creator 66",
            "assigned_to": "Assignee 66",
            "task_name": "Task 66"
        },
        {
            "id": 67,
            "project_name": "Project 67",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-08-12",
            "due_date": "2024-11-17",
            "created_by": "Creator 67",
            "assigned_to": "Assignee 67",
            "task_name": "Task 67"
        },
        {
            "id": 68,
            "project_name": "Project 68",
            "status": "pending",
            "priority": "high",
            "created_date": "2024-09-13",
            "due_date": "2024-12-18",
            "created_by": "Creator 68",
            "assigned_to": "Assignee 68",
            "task_name": "Task 68"
        },
        {
            "id": 69,
            "project_name": "Project 69",
            "status": "in_progress",
            "priority": "medium",
            "created_date": "2024-10-14",
            "due_date": "2024-01-19",
            "created_by": "Creator 69",
            "assigned_to": "Assignee 69",
            "task_name": "Task 69"
        },
        {
            "id": 70,
            "project_name": "Project 70",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-11-15",
            "due_date": "2024-02-20",
            "created_by": "Creator 70",
            "assigned_to": "Assignee 70",
            "task_name": "Task 70"
        },
        {
            "id": 71,
            "project_name": "Project 71",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-12-16",
            "due_date": "2024-03-21",
            "created_by": "Creator 71",
            "assigned_to": "Assignee 71",
            "task_name": "Task 71"
        },
        {
            "id": 72,
            "project_name": "Project 72",
            "status": "in_progress",
            "priority": "high",
            "created_date": "2024-01-17",
            "due_date": "2024-04-22",
            "created_by": "Creator 72",
            "assigned_to": "Assignee 72",
            "task_name": "Task 72"
        },
        {
            "id": 73,
            "project_name": "Project 73",
            "status": "completed",
            "priority": "medium",
            "created_date": "2024-02-18",
            "due_date": "2024-05-23",
            "created_by": "Creator 73",
            "assigned_to": "Assignee 73",
            "task_name": "Task 73"
        },
        {
            "id": 74,
            "project_name": "Project 74",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-03-19",
            "due_date": "2024-06-24",
            "created_by": "Creator 74",
            "assigned_to": "Assignee 74",
            "task_name": "Task 74"
        },
        {
            "id": 75,
            "project_name": "Project 75",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-04-20",
            "due_date": "2024-07-25",
            "created_by": "Creator 75",
            "assigned_to": "Assignee 75",
            "task_name": "Task 75"
        },
        {
            "id": 76,
            "project_name": "Project 76",
            "status": "completed",
            "priority": "high",
            "created_date": "2024-05-21",
            "due_date": "2024-08-26",
            "created_by": "Creator 76",
            "assigned_to": "Assignee 76",
            "task_name": "Task 76"
        },
        {
            "id": 77,
            "project_name": "Project 77",
            "status": "pending",
            "priority": "medium",
            "created_date": "2024-06-22",
            "due_date": "2024-09-27",
            "created_by": "Creator 77",
            "assigned_to": "Assignee 77",
            "task_name": "Task 77"
        },
        {
            "id": 78,
            "project_name": "Project 78",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-07-23",
            "due_date": "2024-10-28",
            "created_by": "Creator 78",
            "assigned_to": "Assignee 78",
            "task_name": "Task 78"
        },
        {
            "id": 79,
            "project_name": "Project 79",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-08-24",
            "due_date": "2024-11-01",
            "created_by": "Creator 79",
            "assigned_to": "Assignee 79",
            "task_name": "Task 79"
        },
        {
            "id": 80,
            "project_name": "Project 80",
            "status": "pending",
            "priority": "high",
            "created_date": "2024-09-25",
            "due_date": "2024-12-02",
            "created_by": "Creator 80",
            "assigned_to": "Assignee 80",
            "task_name": "Task 80"
        },
        {
            "id": 81,
            "project_name": "Project 81",
            "status": "in_progress",
            "priority": "medium",
            "created_date": "2024-10-26",
            "due_date": "2024-01-03",
            "created_by": "Creator 81",
            "assigned_to": "Assignee 81",
            "task_name": "Task 81"
        },
        {
            "id": 82,
            "project_name": "Project 82",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-11-27",
            "due_date": "2024-02-04",
            "created_by": "Creator 82",
            "assigned_to": "Assignee 82",
            "task_name": "Task 82"
        },
        {
            "id": 83,
            "project_name": "Project 83",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-12-28",
            "due_date": "2024-03-05",
            "created_by": "Creator 83",
            "assigned_to": "Assignee 83",
            "task_name": "Task 83"
        },
        {
            "id": 84,
            "project_name": "Project 84",
            "status": "in_progress",
            "priority": "high",
            "created_date": "2024-01-01",
            "due_date": "2024-04-06",
            "created_by": "Creator 84",
            "assigned_to": "Assignee 84",
            "task_name": "Task 84"
        },
        {
            "id": 85,
            "project_name": "Project 85",
            "status": "completed",
            "priority": "medium",
            "created_date": "2024-02-02",
            "due_date": "2024-05-07",
            "created_by": "Creator 85",
            "assigned_to": "Assignee 85",
            "task_name": "Task 85"
        },
        {
            "id": 86,
            "project_name": "Project 86",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-03-03",
            "due_date": "2024-06-08",
            "created_by": "Creator 86",
            "assigned_to": "Assignee 86",
            "task_name": "Task 86"
        },
        {
            "id": 87,
            "project_name": "Project 87",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-04-04",
            "due_date": "2024-07-09",
            "created_by": "Creator 87",
            "assigned_to": "Assignee 87",
            "task_name": "Task 87"
        },
        {
            "id": 88,
            "project_name": "Project 88",
            "status": "completed",
            "priority": "high",
            "created_date": "2024-05-05",
            "due_date": "2024-08-10",
            "created_by": "Creator 88",
            "assigned_to": "Assignee 88",
            "task_name": "Task 88"
        },
        {
            "id": 89,
            "project_name": "Project 89",
            "status": "pending",
            "priority": "medium",
            "created_date": "2024-06-06",
            "due_date": "2024-09-11",
            "created_by": "Creator 89",
            "assigned_to": "Assignee 89",
            "task_name": "Task 89"
        },
        {
            "id": 90,
            "project_name": "Project 90",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-07-07",
            "due_date": "2024-10-12",
            "created_by": "Creator 90",
            "assigned_to": "Assignee 90",
            "task_name": "Task 90"
        },
        {
            "id": 91,
            "project_name": "Project 91",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-08-08",
            "due_date": "2024-11-13",
            "created_by": "Creator 91",
            "assigned_to": "Assignee 91",
            "task_name": "Task 91"
        },
        {
            "id": 92,
            "project_name": "Project 92",
            "status": "pending",
            "priority": "high",
            "created_date": "2024-09-09",
            "due_date": "2024-12-14",
            "created_by": "Creator 92",
            "assigned_to": "Assignee 92",
            "task_name": "Task 92"
        },
        {
            "id": 93,
            "project_name": "Project 93",
            "status": "in_progress",
            "priority": "medium",
            "created_date": "2024-10-10",
            "due_date": "2024-01-15",
            "created_by": "Creator 93",
            "assigned_to": "Assignee 93",
            "task_name": "Task 93"
        },
        {
            "id": 94,
            "project_name": "Project 94",
            "status": "completed",
            "priority": "low",
            "created_date": "2024-11-11",
            "due_date": "2024-02-16",
            "created_by": "Creator 94",
            "assigned_to": "Assignee 94",
            "task_name": "Task 94"
        },
        {
            "id": 95,
            "project_name": "Project 95",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-12-12",
            "due_date": "2024-03-17",
            "created_by": "Creator 95",
            "assigned_to": "Assignee 95",
            "task_name": "Task 95"
        },
        {
            "id": 96,
            "project_name": "Project 96",
            "status": "in_progress",
            "priority": "high",
            "created_date": "2024-01-13",
            "due_date": "2024-04-18",
            "created_by": "Creator 96",
            "assigned_to": "Assignee 96",
            "task_name": "Task 96"
        },
        {
            "id": 97,
            "project_name": "Project 97",
            "status": "completed",
            "priority": "medium",
            "created_date": "2024-02-14",
            "due_date": "2024-05-19",
            "created_by": "Creator 97",
            "assigned_to": "Assignee 97",
            "task_name": "Task 97"
        },
        {
            "id": 98,
            "project_name": "Project 98",
            "status": "pending",
            "priority": "low",
            "created_date": "2024-03-15",
            "due_date": "2024-06-20",
            "created_by": "Creator 98",
            "assigned_to": "Assignee 98",
            "task_name": "Task 98"
        },
        {
            "id": 99,
            "project_name": "Project 99",
            "status": "in_progress",
            "priority": "low",
            "created_date": "2024-04-16",
            "due_date": "2024-07-21",
            "created_by": "Creator 99",
            "assigned_to": "Assignee 99",
            "task_name": "Task 99"
        },
        {
            "id": 100,
            "project_name": "Project 100",
            "status": "completed",
            "priority": "high",
            "created_date": "2024-05-17",
            "due_date": "2024-08-22",
            "created_by": "Creator 100",
            "assigned_to": "Assignee 100",
            "task_name": "Task 100"
        }
    ]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col gap-9 mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 py-[40px]">
      <div className="flex flex-col w-full gap-[12px]">
        <DataTable
          columns={columns}
          data={tasks}
          onProjectUpdate={fetchTasks}
          onProjectDelete={fetchTasks}
        />
      </div>
    </div>
  );
}
