import AsyncStorage from "@react-native-async-storage/async-storage";
import { cloneDeep } from "lodash";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  handleAppendDigit,
  handleCalculate,
  handleClear,
  handleRemoveDigit,
  handleResetCalculationHistory,
  handleResetDisplayValue,
  handleSetCalculationHistory,
  handleSetExpressionHistory,
  handleSetOperation,
} from "./handlers";
import { CalculatorStoreType, initialState } from "./types";

export const useCalculatorStore = create(
  persist<CalculatorStoreType>(
    (set, get) => ({
      ...cloneDeep(initialState),
      expressionHistory: [],
      setCalculationHistory: (num) =>
        handleSetCalculationHistory({ set, get, num }),
      resetCalculationHistory: () => handleResetCalculationHistory({ set }),
      setExpressionHistory: (num) =>
        handleSetExpressionHistory({ set, get, num }),
      appendDigit: (num) => handleAppendDigit({ set, get, num }),
      removeDigit: () => handleRemoveDigit({ set, get }),
      setOperation: (op) => handleSetOperation({ set, get, op }),
      calculate: () => handleCalculate({ set, get }),
      resetDisplayValue: () => handleResetDisplayValue({ set }),
      clear: () => handleClear({ set }),
    }),
    {
      name: "calculator-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
