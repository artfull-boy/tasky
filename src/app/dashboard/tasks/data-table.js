"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Pencil, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/lib/const.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DataTable({ columns, data, onTaskUpdate, onTaskDelete }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState();
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [project, setProject] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskIdToDelete, setTaskIdToDelete] = useState();
  const divRef = useRef(null);

  // State for populating dropdowns
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch projects and users on component mount
  useEffect(() => {
    const fetchProjectsAndUsers = async () => {
      try {
        const [projectsResponse, usersResponse] = await Promise.all([
          fetch("http://127.0.0.1:8001/api/admin/projects", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
          fetch("http://127.0.0.1:8001/api/admin/users", {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        const projectsData = await projectsResponse.json();
        const usersData = await usersResponse.json();

        setProjects(projectsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch projects and users", error);
      }
    };

    fetchProjectsAndUsers();
  }, []);

  const handleOpenDialog = () => {
    setEditingTask(null);
    setTaskName("");
    setDescription("");
    setDeadline(null);
    setStatus("");
    setPriority("");
    setProject("");
    setAssignedTo("");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenSuccessDialog = () => {
    setOpenDialog(false);
    setSuccessDialog(true);
  };

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [columnFilters, setColumnFilters] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(taskName && description && deadline && status && assignedTo && priority && project);
    setError(false);
  }, [taskName, description, deadline, status, assignedTo, priority, project]);


  const handleOpenDeleteDialog = (project) => {
    setTaskIdToDelete(project.id); // Store the project ID
    setOpenDialogDelete(true); // Open the dialog
  };

  const handleCloseDeleteDialog = () => {
    setTaskIdToDelete(null); // Clear the ID
    setOpenDialogDelete(false); // Close the dialog
  };

  const handleEditTask = async (task) => {
    
    setEditingTask(task);
    setTaskName(task.task_name);
    setDescription(task.description);
    setDeadline(new Date(task.due_date));
    setStatus(task.status);
    setPriority(task.priority);
    setProject(task.project);
    setAssignedTo(task.assigned_to);
    setOpenDialog(true);
  };

  const handleDeleteTask = async () => {
    if (!taskIdToDelete) return;
    try {
      const res = await fetch(
        `http://127.0.0.1:8001/api/admin/delete_task/${taskIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        onTaskDelete();
        handleCloseDeleteDialog();
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8001/api/admin/create_task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        task_name: taskName,
        description: description,
        due_date: deadline,
        status: status,
        priority: priority,
        project: project,
        assigned_to: assignedTo
      }),
    });

    if (res.ok) {
      onTaskUpdate();
      setOpenDialog(false);
      setSuccessDialog(true);
    } else {
      setError(true);
    }
  };
  
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://127.0.0.1:8001/api/admin/update_task/${editingTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            task_name: taskName,
            description: description,
            due_date: deadline,
            status: status,
            priority: priority,
            project: project,
            assigned_to: assignedTo
          }),
        }
      );

      if (res.ok) {
        onTaskUpdate();
        setOpenDialog(false);
        setSuccessDialog(true);
        setEditingTask(null);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Update failed", error);
      setError(true);
    }
  };


  const handleSubmit = editingTask ? handleUpdateTask : handleCreateTask;


  const modifiedColumns = columns.map((column) => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }) => {
          const task = row.original;
          return (
            <div className="flex gap-2">
              <Button
                className="w-fit h-fit text-[12px]"
                variant="outline"
                onClick={() => handleEditTask(task)}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                className="w-fit h-fit text-[12px]"
                variant="destructive"
                onClick={() => handleOpenDeleteDialog(task)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          );
        },
      };
    }
    return column;
  });


  const table = useReactTable({
    data,
    columns: modifiedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 8,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleDivClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <p className="text-[30px] font-semibold">Projects</p>
        <Button onClick={handleOpenDialog}>
          <Plus />
          Create Task
        </Button>
      </div>
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter by Task Name"
          value={table.getColumn("task_name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("task_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Select
          value={table.getColumn("status")?.getFilterValue() ?? ""}
          onValueChange={(value) =>
            table.getColumn("status")?.setFilterValue(value)
          }
          className="max-w-sm"
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem>All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={table.getColumn("priority")?.getFilterValue() ?? ""}
          onValueChange={(value) =>
            table.getColumn("priority")?.setFilterValue(value)
          }
          className="max-w-sm"
        >
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem>All</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="w-[429px] flex flex-col gap-[24px]">
          <DialogHeader className={"flex flex-col gap-[0px]"}>
            <DialogTitle className={`text-[30px]`}>
              {editingTask ? "Edit Task" : "Add Task"}
            </DialogTitle>
            <DialogDescription>
              {editingTask
                ? "Update the information for this task"
                : "Please fill the information to add a task"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <label className={`text-[14px] font-medium`} htmlFor="task_name">
                Task Name <span className="text-[#EF4444]">*</span>
              </label>
              <Input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
                required
              />
            </div>
            
            <div className="flex flex-col gap-[8px]">
              <label className={`text-[14px] font-medium`} htmlFor="description">
                Description <span className="text-[#EF4444]">*</span>
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-[8px]">
                <label className={`text-[14px] font-medium`}>
                  Project <span className="text-[#EF4444]">*</span>
                </label>
                <Select 
                  value={project} 
                  onValueChange={setProject}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((proj) => (
                      <SelectItem key={proj.id} value={proj.id.toString()}>
                        {proj.project_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className={`text-[14px] font-medium`}>
                  Assigned To <span className="text-[#EF4444]">*</span>
                </label>
                <Select 
                  value={assignedTo} 
                  onValueChange={setAssignedTo}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select User" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-[8px]">
                <label className={`text-[14px] font-medium`}>
                  Status <span className="text-[#EF4444]">*</span>
                </label>
                <Select 
                  value={status} 
                  onValueChange={setStatus}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className={`text-[14px] font-medium`}>
                  Priority <span className="text-[#EF4444]">*</span>
                </label>
                <Select 
                  value={priority} 
                  onValueChange={setPriority}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-[8px]">
              <label className={`text-[14px] font-medium`}>
                Due Date <span className="text-[#EF4444]">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {error && (
              <p className="text-red-500 text-sm">
                An error occurred. Please try again later.
              </p>
            )}

            <div className="flex items-center justify-between w-full">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isButtonDisabled}
              >
                {editingTask ? "Update Task" : "Create Task"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={openDialogDelete} onOpenChange={setOpenDialogDelete}>
        <AlertDialogContent className="w-[512px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this project?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action is irreversible
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenDialogDelete(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => handleDeleteTask()}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={successDialog} onOpenChange={setSuccessDialog}>
        <DialogContent className="flex flex-col justify-center items-center gap-[32px] p-[32px] w-[487px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-col items-center justify-center gap-[20px]">
                <img src="/success.svg" width={80} height={80}></img>
                <h2 className="text-center leading-[36px] tracking-[-0.75%] ">
                  {editingTask
                    ? "Project Updated Successfully"
                    : "Project Created Successfully"}
                </h2>
              </div>
            </DialogTitle>
            <DialogDescription>
              <p className="text-[14px] leading-[24px] text-center">
                {editingTask
                  ? "The project details have been updated!"
                  : "The project is added to the list of projects!"}
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link href={"/dashboard/projects"}>
              <Button className={` w-full`}>Open Projects</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {cell.column.id === "status" ? (
                        // Adjust based on your column ID for "status"
                        <span
                          className={
                            "px-2 py-1 rounded " +
                            TASK_STATUS_CLASS_MAP[
                              row.original.status.toLowerCase()
                            ] // Ensure consistent key lookup
                          }
                        >
                          {
                            TASK_STATUS_TEXT_MAP[
                              row.original.status.toLowerCase()
                            ]
                          }{" "}
                          {/* Human-readable text */}
                        </span>
                      ) : cell.column.id === "priority" ? (
                        <span
                          className={
                            "px-2 py-1 rounded " +
                            TASK_PRIORITY_CLASS_MAP[
                              row.original.priority.toLowerCase()
                            ] // Ensure consistent key lookup
                          }
                        >
                          {
                            TASK_PRIORITY_TEXT_MAP[
                              row.original.priority.toLowerCase()
                            ]
                          }{" "}
                          {/* Human-readable text */}
                        </span>
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-[8px] self-center  items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronFirst width={16} height={16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft width={16} height={16} />
        </Button>
        <p className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} sur{" "}
          {table.getPageCount()}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight width={16} height={16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronLast width={16} height={16} />
        </Button>
      </div>
    </div>
  );
}
