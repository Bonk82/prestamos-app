import { useContext } from "react";
import {SupaContext} from './SupabaseContextProvider'

export const useSupa = () => {
  const context = useContext(SupaContext);
  if (context === undefined) {
    throw new Error("useSupa debe ser usado en un ContextProvider");
  }
  return context;
};