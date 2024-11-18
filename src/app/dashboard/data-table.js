"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,

} from "@tanstack/react-table";

import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/lib/const.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export function DataTable({ columns, data }) {
    const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
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
                  {cell.column.id === "status" ? 
                  ( // Adjust based on your column ID for "status"
                    <span
                      className={
                        "px-2 py-1 rounded text-white " +
                        TASK_STATUS_CLASS_MAP[row.original.status.toLowerCase()] // Ensure consistent key lookup
                      }
                    >
                      {TASK_STATUS_TEXT_MAP[row.original.status.toLowerCase()]} {/* Human-readable text */}
                    </span>
                  ) : cell.column.id === "priority" ?
                  (
                    <span
                      className={
                        "px-2 py-1 rounded text-white " +
                        TASK_PRIORITY_CLASS_MAP[row.original.priority.toLowerCase()] // Ensure consistent key lookup
                      }
                    >
                      {TASK_PRIORITY_TEXT_MAP[row.original.priority.toLowerCase()]} {/* Human-readable text */}
                    </span>
                  ) 
                  :
                    (flexRender(cell.column.columnDef.cell, cell.getContext()))
                  }
                </TableCell>
                
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
