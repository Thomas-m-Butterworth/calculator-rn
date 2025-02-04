import { NumberHandlerProps } from "../types";

export const handleSetExpressionHistory = ({
  set,
  get,
  num,
}: NumberHandlerProps) => {
  const { expressionHistory } = get();
  set({ expressionHistory: [...expressionHistory, num] });
};
