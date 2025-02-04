import { HandlerProps } from "../types";

export const handleResetDisplayValue = ({ set }: HandlerProps) => {
  set({ displayValue: "0" });
};
