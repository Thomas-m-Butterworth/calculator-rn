export interface CalculatorButtonProps {
  label?: string;
  onPress: () => void;
  isOperation?: boolean;
  isWide?: boolean;
  icon?: React.ReactNode;
}

export interface ButtonTextProps {
  label: string;
  isOperation: boolean;
}
