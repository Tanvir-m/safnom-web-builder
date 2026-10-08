"use client";

import { useEditor } from "@/contexts/EditorContext";
import type { BusinessContextInput } from "@/types/ai";

export function useEditorBusinessContext(): BusinessContextInput | undefined {
  const { website } = useEditor();
  if (!website) return undefined;
  return {
    businessName: website.name,
    businessDescription: website.description ?? undefined,
  };
}
