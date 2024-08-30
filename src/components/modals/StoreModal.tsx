"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import Modal from "../Modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(5),
});

export default function StoreModal() {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post("/api/stores", values);
      toast.success("Store created successfully");
    } catch (error) {
      toast.error("Failed to create store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Your Shop"
      description="Add a new shop to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Enter shop name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-6 items-center">
              <Button
                variant="outline"
                disabled={loading}
                onClick={storeModal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
