const operators = new Set(["+", "/", "%", "=", "-", "*"]);

export const isLastEntryOperator = (arr: string[]) =>
  operators.has(arr.at(-1) ?? "");

export const formatHistory = (history: string[]) => {
  const historyString = history.join("");
  const formattedHistory = historyString
    .replace(/\*/g, "x")
    .replace(/\//g, "÷")
    .replace(/([+÷%=\-x/])/g, " $1 ");
  return formattedHistory;
};

export const formatExpression = (history: string[]) => {
  const formattedHistory = formatHistory(history);
  const formattedExpression = formattedHistory.replace(
    /=\s+([-+x÷%])\s+/g,
    "= $1"
  );
  return formattedExpression;
};

export const truncateStart = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(-maxLength).replace(/^\s+/, "");
  return `...${truncated}`;
};

export const createExpressionSring = (history: string[], result: string) => {
  const newExpression = [...history, "=", result];
  const expressionString = formatExpression(newExpression);
  return expressionString;
};
