"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  value?: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [isCopied, setisCopied] = useState(false);
  const onCopy = () => {
    if (!value) return;
    setisCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setisCopied(false);
    }, 1000);
  };
  const Icon = isCopied ? CheckCheck : Copy;
  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={onCopy}
      disabled={!value || isCopied}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};
