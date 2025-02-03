import { performCalculation } from "../utils";

describe("performCalculation", () => {
  it("performs addition", () => {
    expect(performCalculation(3, 5, "+")).toBe(8);
  });
  it("performs subtraction", () => {
    expect(performCalculation(8, 5, "-")).toBe(3);
  });
  it("performs multiplication", () => {
    expect(performCalculation(3, 5, "*")).toBe(15);
  });
  it("performs division", () => {
    expect(performCalculation(16, 2, "/")).toBe(8);
  });
  it("returns second digit with an unknown operator", () => {
    expect(performCalculation(16, 2, "&")).toBe(2);
  });
});
