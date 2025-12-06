"use client";

import { ColumnDef } from "@tanstack/react-table";

import CategoryCellAction from "@/components/categories/CategoryCellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const CategoryDataColumn: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => <CategoryCellAction data={row.original} />,
  },
];
