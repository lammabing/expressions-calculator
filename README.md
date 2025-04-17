# Advanced Expression Calculator

A powerful web-based calculator built with React, TypeScript, and Tailwind CSS that supports complex mathematical expressions, custom functions, and constants.

## Features

- **Advanced Expression Evaluation**
  - Basic arithmetic operations (+, -, *, /, ^)
  - Support for parentheses and nested expressions
  - Access to previous results using '#' symbol

- **Built-in Functions**
  - Mathematical: `sin`, `cos`, `tan`, `sqrt`, `pow`, `log`, `log10`
  - Statistical: `sum`, `avg`, `min`, `max`
  - Rounding: `round`, `floor`, `ceil`, `abs`

- **Built-in Constants**
  - π (pi): Mathematical constant pi
  - e: Euler's number

- **Custom Functions & Constants**
  - Create and manage custom mathematical functions
  - Define personal constants for frequent use
  - Import/Export functionality for functions
  - Persistent storage using localStorage

- **Variable Support**
  - Define and use variables in calculations
  - Store intermediate results

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint

## Project Structure

```text
expressions-calculator/
├── src/
│   ├── components/
│   │   ├── Calculator.tsx
│   │   ├── SettingsPanel.tsx
│   │   └── settings/
│   │       ├── ConstantEditor.tsx
│   │       └── FunctionEditor.tsx
│   ├── lib/
│   │   ├── parser/
│   │   │   ├── expressionEvaluator.ts
│   │   │   ├── functionEvaluator.ts
│   │   │   └── types.ts
│   │   ├── constants.ts
│   │   ├── evaluator.ts
│   │   ├── functions.ts
│   │   ├── history.ts
│   │   ├── parser.ts
│   │   ├── storage.ts
│   │   └── tokenizer.ts
│   ├── store/
│   │   └── calculatorStore.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── calculator-functions.json
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Download, Installation & starting the calculator
```bash
git clone https://github.com/lammabing/expressions-calculator
cd expressions-calculator
npm install
npm run dev
```



