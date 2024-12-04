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

import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/lib/const.jsx";
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

export function DataTable({ columns, data, onProjectUpdate, onProjectDelete }) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState();
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const divRef = useRef(null);

  const handleOpenDialog = () => {
    setEditingProject(null);
    setProjectName("");
    setDescription("");
    setDeadline(null);
    setStatus("");
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
    setIsButtonDisabled(projectName && description && deadline && status);
    setError(false);
  }, [projectName, description, deadline, status]);

  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  const handleOpenDeleteDialog = (project) => {
    setProjectIdToDelete(project.id); // Store the project ID
    setOpenDialogDelete(true); // Open the dialog
  };

  const handleCloseDeleteDialog = () => {
    setProjectIdToDelete(null); // Clear the ID
    setOpenDialogDelete(false); // Close the dialog
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectName(project.name);
    setDescription(project.description);
    setDeadline(new Date(project.due_date));
    setStatus(project.status);
    setOpenDialog(true);
  };

  const handleDeleteProject = async () => {
    if (!projectIdToDelete) return;
    try {
      const res = await fetch(
        `http://localhost:8000/api/projects/${projectIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        onProjectDelete();
        handleCloseDeleteDialog();
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any required auth headers
          // "Authorization": `Bearer ${yourToken}`
        },
        body: JSON.stringify({
          name: projectName,
          description: description,
          due_date: deadline,
          status: status,
          created_by: "1",
          updated_by: "1",
        }), // Ensure correct data structure
      });

      if (!res.ok) {
        // Handle non-200 responses
        const errorBody = await res.text();
        console.error("Server responded with:", res.status, errorBody);
        throw new Error(`HTTP error! status: ${res.status}`);
      } else {
        onProjectUpdate();
        handleOpenSuccessDialog();
      }

      // Handle successful response
    } catch (error) {
      console.error("Error creating project:", error);
      // Handle network errors or exceptions
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8000/api/projects/${editingProject.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: projectName,
            description: description,
            due_date: deadline,
            status: status,
          }),
        }
      );

      if (res.ok) {
        onProjectUpdate();
        handleOpenSuccessDialog();
        setEditingProject(null);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Update failed", error);
      setError(true);
    }
  };

  const handleSubmit = editingProject
    ? handleUpdateProject
    : handleCreateProject;

  const modifiedColumns = columns.map((column) => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }) => {
          const project = row.original;
          return (
            <div className="flex gap-2">
              <Button
                className="w-fit h-fit text-[12px]"
                variant="outline"
                onClick={() => handleEditProject(project)}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                className="w-fit h-fit text-[12px]"
                variant="destructive"
                onClick={() => handleOpenDeleteDialog(project)}
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
          Add Project
        </Button>
      </div>
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter by Project Name"
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="w-[429px] flex flex-col gap-[24px]">
          <DialogHeader className={"flex flex-col gap-[0px]"}>
            <DialogTitle className={`text-[30px]`}>
              {editingProject ? "Edit Project" : "Add Project"}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? "Update the information for this project"
                : "Please fill the information to add a project"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[8px]">
              <label className={`text-[14px] font-medium`} htmlFor="name">
                Project Name
                <span className="text-[#EF4444]">*</span>
              </label>
              <Input
                id="name"
                type="text"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
                placeholder="Web Development Project"
                className={`${error ? "border-[#F53D6B]" : "border-[#ff]"}`}
                required
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className={`text-[14px] font-medium`} htmlFor="desc">
                Project Description <span className="text-[#EF4444]">*</span>
              </label>
              <Textarea
                id="desc"
                type="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className={`${error ? "border-[#F53D6B]" : "border-[#ff]"}`}
                required
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className={`text-[14px] font-medium`} htmlFor="status">
                Status <span className="text-[#EF4444]">*</span>
              </label>
              <Select
                onValueChange={(value) => setStatus(value)}
                value={status}
              >
                <SelectTrigger
                  className={` flex items-center justify-between gap-[8px] border-[1px]`}
                >
                  <SelectValue
                    placeholder="Status"
                    className={` font-normal text-[12px]`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className={`text-[#F53D6B] ${error ? "block" : "hidden"}`}>
                An error occurred, Please Try later.
              </p>
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className={`text-[14px] font-medium`} htmlFor="due_date">
                Project Deadline
                <span className="text-[#EF4444]">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      " justify-start text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? (
                      format(deadline, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
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
            <div className="flex items-center justify-between w-full">
              <Button
                type="button"
                variant="outline"
                className={` w-fit`}
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={` w-fit`}
                disabled={!isButtonDisabled}
              >
                {editingProject ? "Update" : "Continue"}
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
            <Button variant="destructive" onClick={() => handleDeleteProject()}>
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
                  {editingProject
                    ? "Project Updated Successfully"
                    : "Project Created Successfully"}
                </h2>
              </div>
            </DialogTitle>
            <DialogDescription>
              <p className="text-[14px] leading-[24px] text-center">
                {editingProject
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
