"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Calendar as CalendarIcon, Pencil, Trash2 } from "lucide-react";

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

import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DataTable({ columns, data, onUserUpdate, onUserDelete }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [successDialog, setSuccessDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const divRef = useRef(null);

  const handleOpenDialog = () => {
    setEditingUser(null);
    setUserName("");
    setEmail("");
    setPassword("");
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
    setIsButtonDisabled(userName && email && password);
    setError(false);
  }, [userName, email, password]);

  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleOpenDeleteDialog = (user) => {
    setUserIdToDelete(user.id); // Store the user ID
    setOpenDialogDelete(true); // Open the dialog
  };

  const handleCloseDeleteDialog = () => {
    setUserIdToDelete(null); // Clear the ID
    setOpenDialogDelete(false); // Close the dialog
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setOpenDialog(true);
  };

  const handleDeleteUser = async () => {
    if (!userIdToDelete) return;
    try {
      const res = await fetch(
        `http://localhost:8002/api/users/${userIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        onUserDelete();
        handleCloseDeleteDialog();
      } else {
        console.error("Delete failed");
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

 
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8002/api/users/${editingUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: userName,
            email: email,
            password: password,
          }),
        }
      );

      if (res.ok) {
        onUserUpdate();
        handleOpenSuccessDialog();
        setEditingUser(null);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Update failed", error);
      setError(true);
    }
  };

  const handleSubmit =  handleUpdateUser

  const modifiedColumns = columns.map((column) => {
    if (column.id === "actions") {
      return {
        ...column,
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex gap-2">
              <Button
                className="w-fit h-fit text-[12px]"
                variant="outline"
                onClick={() => handleEditUser(user)}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button
                className="w-fit h-fit text-[12px]"
                variant="destructive"
                onClick={() => handleOpenDeleteDialog(user)}
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center w-full">
        <p className="text-[30px] font-semibold">Users</p>
        
      </div>
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter by User Name"
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="w-[429px] flex flex-col gap-[24px]">
          <DialogHeader className={"flex flex-col gap-[0px]"}>
            <DialogTitle className={`text-[30px]`}>
              {editingUser ? "Edit User" : "Add User"}
            </DialogTitle>
            <DialogDescription>
              {editingUser
                ? "Update the information for this user"
                : "Please fill the information to add a user"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[8px]">
              <label className={`text-[14px] font-medium`} htmlFor="name">
                User Name
                <span className="text-[#EF4444]">*</span>
              </label>
              <Input
                id="name"
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="Karim Ali"
                className={`${error ? "border-[#F53D6B]" : "border-[#ff]"}`}
                required
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className={`text-[14px] font-medium`} htmlFor="desc">
                Email <span className="text-[#EF4444]">*</span>
              </label>
              <Input
                id="desc"
                type="text"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className={`${error ? "border-[#F53D6B]" : "border-[#ff]"}`}
                required
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label className={`text-[14px] font-medium`} htmlFor="password">
                Password <span className="text-[#EF4444]">*</span>
              </label>
              <Input
                id="password"
                type="password"
                placeholder="*********"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className={`${error ? "border-[#F53D6B]" : "border-[#ff]"}`}
                required
              />
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
                {editingUser ? "Update" : "Continue"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={openDialogDelete} onOpenChange={setOpenDialogDelete}>
        <AlertDialogContent className="w-[512px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this user?
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
            <Button variant="destructive" onClick={() => handleDeleteUser()}>
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
                  {editingUser
                    ? "User Updated Successfully"
                    : "User Created Successfully"}
                </h2>
              </div>
            </DialogTitle>
            <DialogDescription>
              <p className="text-[14px] leading-[24px] text-center">
                {editingUser
                  ? "The user details have been updated!"
                  : "The user is added to the list of users!"}
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link href={"/dashboard/users"}>
              <Button className={` w-full`}>Open Users</Button>
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      
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
