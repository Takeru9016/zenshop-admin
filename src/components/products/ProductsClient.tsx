"use client";

import { useParams, useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/common/Heading";
import DataTable from "@/components/common/DataTable";
import {
  ProductsColumn,
  ProductsDataColumn,
} from "@/components/products/ProductsDataColumn";
import ApiList from "@/components/common/ApiList";

interface ProductsClientProps {
  data: ProductsColumn[];
}

export default function ProductsClient({ data }: ProductsClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage your products"
        />
        <Button
          className="ml-auto"
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchColumn="name" data={data} columns={ProductsDataColumn} />
      <Heading title="API" description="API calls for products" />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
}
