"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"

export const columns = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Id
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
  },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Created Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
    },
    
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            return (
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
            )
        },
    },
]