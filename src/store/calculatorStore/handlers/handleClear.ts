import { HandlerProps, initialState } from "../types";

export const handleClear = ({ set }: HandlerProps) => {
  set(initialState);
};
