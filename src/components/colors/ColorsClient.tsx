"use client";

import { useParams, useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/common/Heading";
import DataTable from "@/components/common/DataTable";
import ApiList from "@/components/common/ApiList";
import {
  ColorsColumn,
  ColorsDataColumn,
} from "@/components/colors/ColorsDataColumn";

interface ColorsClientProps {
  data: ColorsColumn[];
}

export default function ColorsClient({ data }: ColorsClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage your colors"
        />
        <Button
          className="ml-auto"
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchColumn="name" data={data} columns={ColorsDataColumn} />
      <Heading title="API" description="API calls for Colors" />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
}
