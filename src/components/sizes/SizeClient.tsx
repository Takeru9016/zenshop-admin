"use client";

import { useParams, useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/common/Heading";
import DataTable from "@/components/common/DataTable";
import ApiList from "@/components/common/ApiList";
import { SizeColumn, SizeDataColumn } from "@/components/sizes/SizeDataColumn";

interface SizeClientProps {
  data: SizeColumn[];
}

export default function SizeClient({ data }: SizeClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage your sizes"
        />
        <Button
          className="ml-auto"
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchColumn="name" data={data} columns={SizeDataColumn} />
      <Heading title="API" description="API calls for Sizes" />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
}
