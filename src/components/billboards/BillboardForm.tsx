"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/common/Heading";
import ImageUpload from "@/components/common/ImageUpload";
import AlertModal from "@/components/modals/AlertModal";
import {
  createBillboard,
  updateBillboard,
  deleteBillboard,
} from "@/actions/billboard";

import { Billboard } from "../../../generated/prisma/client";

interface BillboardFormProps {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(3, "Label must be at least 3 characters"),
  imageUrl: z.string().min(1, "Image URL is required"),
});

type BillboardFormValues = z.infer<typeof formSchema>;

export default function BillboardForm({ initialData }: BillboardFormProps) {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Billboard" : "Create Billboard";
  const description = initialData
    ? "Edit your billboard"
    : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated successfully"
    : "Billboard created successfully";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (values: BillboardFormValues) => {
    try {
      setLoading(true);
      const storeId = params.storeId as string;

      if (initialData) {
        const result = await updateBillboard(initialData.id, storeId, {
          label: values.label,
          imageUrl: values.imageUrl,
        });

        if (result.success) {
          toast.success(toastMessage);
          router.refresh();
          router.push(`/${storeId}/billboards`);
        } else {
          toast.error(result.error || "Something went wrong");
        }
      } else {
        const result = await createBillboard(storeId, {
          label: values.label,
          imageUrl: values.imageUrl,
        });

        if (result.success) {
          toast.success(toastMessage);
          router.refresh();
          router.push(`/${storeId}/billboards`);
        } else {
          toast.error(result.error || "Something went wrong");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      const storeId = params.storeId as string;
      const result = await deleteBillboard(initialData!.id, storeId);

      if (result.success) {
        toast.success("Billboard deleted successfully");
        router.refresh();
        router.push(`/${storeId}/billboards`);
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            disabled={loading}
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField 
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard Label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
}
