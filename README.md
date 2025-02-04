# React Native Calculator App  
**Thomas Butterworth**  

## What Is It?  
A simple, user-friendly calculator app built with React Native. It supports basic arithmetic operations and retains calculation history and active calculations for a seamless experience.  

## Stack  
- **React Native** (UI framework)  
- **Expo** (Development)  
- **Zustand** (State management)  
- **Jest** (Testing framework)  
- **ESLint** (Code quality & linting)  

## Features  
✅ **Basic Arithmetic** – Supports addition, subtraction, multiplication, and division.  
✅ **Dark & Light Mode** – Adapts to the user's system settings.  
✅ **Calculation History** – Keeps track of ongoing calculations within the display.  
✅ **Persistent Storage** – Active calculations and history are saved between sessions.  
✅ **Expression History** – A separate tab for viewing previous calculations.  

## Limitations  
🚫 **Negative Values** – Users can start with a negative number but cannot enter negatives within the rest of the equation.  
🚫 **System-Dependent Theme** – Users can only switch between light/dark mode via their system settings.  
🚫 **No Parentheses Support** – The calculator does not support bracketed expressions for more complex equations.  

## Future Improvements  
🔹 **More Testing** – While utility functions are covered, UI and interaction tests need improvement (testID usage has been initiated).  
🔹 **Optimize State Management** – Some `set` functions in Zustand remain unused but could support future app scaling - these have however proved useful in debugging.
🔹 **Fix Require Cycle Warning** – `src/hooks/index.ts -> src/hooks/useThemeColor.ts -> src/hooks/index.ts` is not breaking but should be refactored.  
🔹 **Improve Mocking** - `expo-fonts` etc. can be mocked in a config file to avoid mocking it in every front end test.
~~🔹 **Refactor Page Container** - Platform specific padding fixes cross-platform spacing issue (content going behind the header when enabled) without a header, but creates issues when the header is enabled. refactor page container to acknowlege if a enabled is enabled.~~

## Assumptions  
- Users will perform both integer arithmetic and floating-point calculations. (It is very difficult to use a calculator without encountering a decimal point)
- Users rely on system settings for theme switching.  
- Basic operations are sufficient. Advanced mathematical functions are out of scope.  

## Running the App  
### **1. Clone the Repository**  
```sh
git clone https://github.com/thomas-m-butterworth/calculator-rn.git
cd calculator-rn
```

### **2. Install Dependencies**
```sh
npm install
```

### **3. Run the App**
**For iOS (requires macOS + Xcode)**
```sh
npx expo run:ios
```
**For Android**
```sh
npx expo run:android
```
Or run `npm start` and use the directions in metro.



