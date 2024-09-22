import { createContext, useContext } from "react";

export const SiteAssignContext = createContext(undefined); // Create a context with a default value of undefined

export function useSiteAssignContext() {
  const context = useContext(SiteAssignContext); // Use the context in a component
  if (!context) {
    // If the context is not available, throw an error
    throw new Error(
      "useSiteAssignContext must be used within a SiteAssignProvider"
    ); // Throw an error with a message
  } else {
    return context; // Return the context
  }
  const { assignSite, editInfo, filter, setFilter } =
    useContext(SiteAssignContext);
  if (!assignSite || !editInfo || !filter || !setFilter) {
    throw new Error(
      "useSiteAssignContext must be used within a SiteAssignProvider"
    );
  }
  return { assignSite, editInfo, filter, setFilter }; // Return the values from the context
}
