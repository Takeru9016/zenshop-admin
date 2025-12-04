"use client";

import { type VariantProps } from "class-variance-authority";
import { Copy, Server } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ApiAlertProp {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProp["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<
  ApiAlertProp["variant"],
  VariantProps<typeof badgeVariants>["variant"]
> = {
  public: "secondary",
  admin: "destructive",
};

export default function ApiAlert({
  title,
  description,
  variant = "public",
}: ApiAlertProp) {
  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to clipboard");
  };

  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="bg-muted test-sm relative rounded px-[0.3rem] py-[0.2rem] font-mono font-semibold">
          {description}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onCopy(description)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
