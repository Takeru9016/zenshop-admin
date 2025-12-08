"use client";

import { Separator } from "@/components/ui/separator";
import Heading from "@/components/common/Heading";
import DataTable from "@/components/common/DataTable";
import {
  OrdersColumn,
  OrdersDataColumn,
} from "@/components/orders/OrdersDataColumn";

interface OrdersClientProps {
  data: OrdersColumn[];
}

export default function OrdersClient({ data }: OrdersClientProps) {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage your orders"
      />
      <Separator />
      <DataTable
        searchColumn="products"
        data={data}
        columns={OrdersDataColumn}
      />
    </>
  );
}
