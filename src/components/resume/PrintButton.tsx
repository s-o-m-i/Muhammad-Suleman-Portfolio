"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <Button type="button" onClick={() => window.print()}>
      <Printer size={16} />
      Save as PDF
    </Button>
  );
}
