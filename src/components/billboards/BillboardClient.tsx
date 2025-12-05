"use client";

import { useParams, useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/common/Heading";
import DataTable from "@/components/common/DataTable";
import {
  BillboardColumn,
  DataColumn,
} from "@/components/billboards/DataColumn";
import ApiList from "../common/ApiList";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export default function BillboardClient({ data }: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage your billboards"
        />
        <Button
          className="ml-auto"
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchColumn="label" data={data} columns={DataColumn} />
      <Heading title="API" description="API calls for billboards" />
      <ApiList
        entityName="billboards"
        entityIdName="billboardId"
      />
    </>
  );
}
