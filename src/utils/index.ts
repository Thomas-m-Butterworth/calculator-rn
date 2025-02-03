const operators = new Set(["+", "÷", "%", "=", "-", "x"]);

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

export const truncateStart = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(-maxLength).replace(/^\s+/, "");
  return `...${truncated}`;
};
