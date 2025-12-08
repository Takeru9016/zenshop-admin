"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  disabled?: boolean;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export default function ImageUpload({
  disabled,
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    console.log("Single upload completed:", result.info.secure_url);
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[300px] w-[500px] overflow-hidden rounded-md"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="destructive"
                size="icon"
                type="button"
                disabled={disabled}
                onClick={() => onRemove(url)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="Billboard Image"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset="zenshop-admin"
        options={{
          multiple: true,
          maxFiles: 10,
        }}
      >
        {({ open }) => (
          <Button
            type="button"
            disabled={disabled}
            onClick={() => open()}
            className="ml-auto"
            variant="secondary"
          >
            <ImagePlus className="h-4 w-4" />
            Upload Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
}
