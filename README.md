# React Native Calculator App
Thomas Butterworth

## What It It?
A simple calculator app f

## Stack
* React Native
* Expo
* Zustand (State Management)
* Jest (Testing)
* ESLint

## Features
* Colour scheme responds the the user's system settings (dark and light mode).
* Calculation history within the display.
* Persistent state storage so user's can keep active calculations (and history) between sessions
* Expression history - a seperate tab for previous calculations by the user.

## Limitations
* Negative Values
   * The user is able to start their calculation with a negative number, but not within the rest of the calculation
* User can only control colour scheme with their phone's system settings
* No means of using parenthesis for more advanced equations

## Nice to Haves in the Future
* More testing
   * Utils are tested but more frontend testing would be beneficial
      * Started the process with `testId` setting.
* Make use of unused state functions
   * Quite a few `set` handlers that aren't used since a lot of setting is done within the `SetState` object in zustand. These handlers would be useful if ever scaling the app to allow more user actions.
* `Require cycle: src/hooks/index.ts -> src/hooks/useThemeColor.ts -> src/hooks/index.ts`
   * Not breaking, but would be good to refactor out
   