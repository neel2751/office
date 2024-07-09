"use client";
import { AdminProvider } from "@/context/UserContext";
import React from "react";
import EmptyState from "./EmptyState";

const EmptyWrapper = (prop) => {
  return (
    <AdminProvider>
      <EmptyState {...prop} />
    </AdminProvider>
  );
};

export default EmptyWrapper;
