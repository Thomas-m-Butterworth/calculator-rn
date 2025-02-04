import { NumberHandlerProps } from "../types";

export const handleSetCalculationHistory = ({
  set,
  get,
  num,
}: NumberHandlerProps) => {
  const { calculationHistory } = get();
  set({ calculationHistory: [...calculationHistory, num] });
};
