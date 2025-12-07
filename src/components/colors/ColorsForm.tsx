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
import AlertModal from "@/components/modals/AlertModal";
import { createColor, updateColor, deleteColor } from "@/actions/color";

import { Color } from "../../../generated/prisma/client";

interface ColorsFormProps {
  initialData: Color | null;
}

const formSchema = z.object({
  name: z.string().min(3, "Label must be at least 3 characters"),
  value: z
    .string()
    .min(1)
    .regex(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      "Color must be a valid hex code",
    ),
});

type ColorsFormValues = z.infer<typeof formSchema>;

export default function ColorsForm({ initialData }: ColorsFormProps) {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Color" : "Create Color";
  const description = initialData ? "Edit your color" : "Add a new color";
  const toastMessage = initialData
    ? "Color updated successfully"
    : "Color created successfully";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<ColorsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (values: ColorsFormValues) => {
    try {
      setLoading(true);
      const storeId = params.storeId as string;

      if (initialData) {
        const result = await updateColor(initialData.id, storeId, {
          name: values.name,
          value: values.value,
        });

        if (result.success) {
          toast.success(toastMessage);
          router.refresh();
          router.push(`/${storeId}/colors`);
        } else {
          toast.error(result.error || "Something went wrong");
        }
      } else {
        const result = await createColor(storeId, {
          name: values.name,
          value: values.value,
        });

        if (result.success) {
          toast.success(toastMessage);
          router.refresh();
          router.push(`/${storeId}/colors`);
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
      const result = await deleteColor(initialData!.id, storeId);

      if (result.success) {
        toast.success("Color deleted successfully");
        router.refresh();
        router.push(`/${storeId}/colors`);
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color Value"
                        {...field}
                      />
                      <div className="flex items-center gap-x-2">
                        <span
                          className="h-6 w-6 rounded-full border p-4"
                          style={{ backgroundColor: field.value }}
                        />
                      </div>
                    </div>
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
