"use client";

import { ColumnDef } from "@tanstack/react-table";

import ColorsCellAction from "@/components/colors/ColorsCellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorsColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const ColorsDataColumn: ColumnDef<ColorsColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="mr-2">{row.getValue("value")}</span>
        <div
          className="h-6 w-6 rounded-full"
          style={{ backgroundColor: row.getValue("value") }}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <ColorsCellAction data={row.original} />,
  },
];
