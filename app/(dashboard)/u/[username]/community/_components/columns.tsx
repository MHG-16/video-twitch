"use client"

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { ColumnDef } from "@tanstack/react-table"
import { UnblockButton } from "./unblock-button";


export type BlockUser = {
  id: string;
  userId: string;
  imageUrl: string;
  username: string;
  createdAt: string;
}

export const columns: ColumnDef<BlockUser>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Username
        <ArrowUpDown className="ml-2 h-4 w-4"/>
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <UserAvatar 
          username={row.original.username}
          imageUrl={row.original.imageUrl}
        />
        <span>{row.original.username}</span>
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date blocked",
  },
  {
    id: "actions",
    cell: ({ row }) => <UnblockButton userId={row.original.userId} />
  },
]
