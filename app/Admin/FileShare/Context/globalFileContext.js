import { useContext, createContext } from "react";

export const GlobalFileContext = createContext();
// export const useGlobalFile = () => useContext(GlobalFileContext);

export const useGlobalFileContext = () => {
  const context = useContext(GlobalFileContext);
  console.log(context);
  if (!context) {
    throw new Error(
      "useGlobalFileContext must be used within a GlobalFileContext Provider"
    );
  }
  return context;
};
