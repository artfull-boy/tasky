"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"

export const columns = [
  {
      accessorKey: "id",
      header: ({ column }) => (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
              Id
              <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      ),
  },
  {
      accessorKey: "name",
      header: ({ column }) => (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
              Project Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      ),
      cell: ({ row }) => (
          <a 
          href={`/dashboard/projects/${row.original.id}`} 
              style={{ color: 'inherit', textDecoration: 'none' }}
          >
              {row.original.name}
          </a>
      ),
  },
  {
      accessorKey: "status",
      header: ({ column }) => (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      ),
  },
  {
      accessorKey: "created_at",
      header: ({ column }) => (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
              Created Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      ),
  },
  {
      accessorKey: "due_date",
      header: ({ column }) => (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
              Due Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      ),
  },
  {
      accessorKey: "createdByName",
      header: "Created By",
      id: "createdByName",
  },
  {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
          <div className="flex gap-2">
              <Button 
                  className="w-fit h-fit text-[12px]" 
                  variant="outline"
              >
                  <Pencil className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button 
                  className="w-fit h-fit text-[12px]" 
                  variant="destructive"
              >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
          </div>
      ),
  },
];
