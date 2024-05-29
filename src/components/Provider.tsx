"use client";
import { Theme } from "@radix-ui/themes";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Theme>{children}</Theme>
    </QueryClientProvider>
  );
};
