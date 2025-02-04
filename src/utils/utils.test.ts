import {
  createExpressionSring,
  formatExpression,
  formatHistory,
  isLastEntryOperator,
  truncateStart,
} from ".";

describe("formatHistory", () => {
  it("replaces instances of * with X", () => {
    const historyArr = ["1", "*", "2"];
    const string = "1 x 2";
    expect(formatHistory(historyArr)).toEqual(string);
  });
  it("replaces instances of / with ÷", () => {
    const historyArr = ["3", "/", "5"];
    const string = "3 ÷ 5";
    expect(formatHistory(historyArr)).toEqual(string);
  });
  it("surrounds operators with whitespace", () => {
    expect(formatHistory(["/"])).toEqual(" ÷ ");
    expect(formatHistory(["*"])).toEqual(" x ");
    expect(formatHistory(["="])).toEqual(" = ");
    expect(formatHistory(["%"])).toEqual(" % ");
  });
  it("does not surround numbers with whitespace", () => {
    expect(formatHistory(["8", "1", "3"])).toEqual("813");
    expect(formatHistory(["8", "-", "1", "3"])).toEqual("8 - 13");
  });
  it("formats a mix of operators and numbers correctly", () => {
    const allOperatorsArr = [
      "1",
      "*",
      "2",
      "+",
      "3",
      "-",
      "4",
      "%",
      "1",
      "0",
      "0",
    ];
    expect(formatHistory(allOperatorsArr)).toEqual("1 x 2 + 3 - 4 % 100");
  });
  it("returns an empty string for an empty history array", () => {
    expect(formatHistory([])).toEqual("");
  });
});

describe("truncateStart", () => {
  const longString = "lots and lots of characters but enough to count";
  const truncString = "...and lots of characters but enough to count";
  it("adds elipsis at the start of the string when max character limit is met", () => {
    expect(truncateStart(longString, 42)).toBe(truncString);
  });
  it("does not modify a string below the max limit", () => {
    expect(truncateStart(longString, 100)).toBe(longString);
  });
  it("returns the string as-is if it is exactly the max length", () => {
    const exactLengthString = "1234567890";
    expect(truncateStart(exactLengthString, 10)).toBe(exactLengthString);
  });
  it("returns an empty string when input is empty", () => {
    expect(truncateStart("", 10)).toBe("");
  });
  it("adds ellipsis when string length exceeds max by one character", () => {
    expect(truncateStart("abcdef", 5)).toBe("...bcdef");
  });
  it("removes whitespace from the start of a truncated string", () => {
    expect(truncateStart("               f", 5)).toBe("...f");
  });
});

describe("formatExpression", () => {
  it("removes whitespace from expression results", () => {
    const minusExpression = ["1", "-", "2", "=", "-", "1"];
    const minusExpressionString = "1 - 2 = -1";
    expect(formatExpression(minusExpression)).toBe(minusExpressionString);
  });
  it("returns a standard formatted history when no operators are in the results", () => {
    const minusExpression = ["2", "-", "1", "=", "1"];
    const minusExpressionString = "2 - 1 = 1";
    expect(formatExpression(minusExpression)).toBe(minusExpressionString);
  });
});

describe("createExpressionString", () => {
  it("creates an expression string from user calculations", () => {
    const historyArr = ["2", "0", "+", "25"];
    const resultString = "45";
    const expString = "20 + 25 = 45";
    expect(createExpressionSring(historyArr, resultString)).toBe(expString);
  });
});

describe("isLastEntryOperator", () => {
  it("returns true when last entry in the array is an operator", () => {
    expect(isLastEntryOperator(["1", "5", "%"])).toBeTruthy();
    expect(isLastEntryOperator(["1", "5", "x"])).toBeTruthy();
    expect(isLastEntryOperator(["1", "5", "="])).toBeTruthy();
    expect(isLastEntryOperator(["1", "5", "+"])).toBeTruthy();
    expect(isLastEntryOperator(["1", "5", "-"])).toBeTruthy();
    expect(isLastEntryOperator(["1", "5"])).toBeFalsy();
  });
});
