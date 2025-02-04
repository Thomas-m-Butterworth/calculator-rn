import { HandlerProps } from "../types";

export const handleResetCalculationHistory = ({ set }: HandlerProps) =>
  set({ calculationHistory: [] });
