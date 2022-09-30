import React from "react";
import { QueryClientProvider } from "react-query";
import { App } from "./App";
import { ReactQueryClient } from "./lib";

export const Index = () => {
  return (
    <QueryClientProvider client={ReactQueryClient}>
      <App />
    </QueryClientProvider>
  );
};
