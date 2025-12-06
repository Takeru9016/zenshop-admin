"use client";

import { useParams, useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/common/Heading";
import DataTable from "@/components/common/DataTable";
import ApiList from "@/components/common/ApiList";
import {
  CategoryColumn,
  CategoryDataColumn,
} from "@/components/categories/CategoryDataColumn";

interface CategoryClientProps {
  data: CategoryColumn[];
}

export default function CategoryClient({ data }: CategoryClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage your categories"
        />
        <Button
          className="ml-auto"
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchColumn="name" data={data} columns={CategoryDataColumn} />
      <Heading title="API" description="API calls for categories" />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
}
