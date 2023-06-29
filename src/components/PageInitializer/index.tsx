"use client";

import { useRef } from "react";

import { usePage } from "@/stores";

export function PageInitializer({
  title,
  id,
  parentId,
}: {
  title: string;
  id: string;
  parentId?: string;
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    usePage.setState({ title, id, parentId });
    initialized.current = true;
  }

  return null;
}
