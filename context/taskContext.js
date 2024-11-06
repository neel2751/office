import { createContext, useContext } from "react";

export const TaskAssignContext = createContext(undefined); // Create a context with a default value of undefined

export function useTaskAssignContext() {
  const context = useContext(TaskAssignContext); // Use the context in a component
  if (!context) {
    // If the context is not available, throw an error
    throw new Error(
      "useTaskAssignContext must be used within a TaskAssignProvider"
    ); // Throw an error with a message
  } else {
    return context; // Return the context
  }
}
