export interface CalculatorButtonProps {
  label: string;
  onPress: () => void;
  isOperation?: boolean;
  isWide?: boolean;
  icon?: React.ReactNode;
  testId?: string;
}

export interface ButtonTextProps {
  label: string;
  isOperation: boolean;
}
