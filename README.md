# Millionaire Game

A Who Wants to Be a Millionaire style quiz game built with Next.js and React.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Contributing](#contributing)

## Overview

This project is a quiz game inspired by the popular TV show "Who Wants to Be a Millionaire". Players can test their knowledge by answering increasingly difficult questions to win virtual money.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (latest LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:
   ```bash
   git https://github.com/MorgansX/millionaire-game.git
   cd millionaire-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or if you use yarn:
   ```bash
   yarn install
   ```

## Running the Project

### Development Mode

To run the project in development mode with hot-reloading:

```bash
npm run dev
```

This will start the development server using Turbopack. The application will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Create an optimized production build
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues
- `npm run format` - Format code using Prettier
- `npm run test` - Run Jest tests
- `npm run prepare` - Set up Husky git hooks

## Game Configuration

The game is configured through a JSON file located at:
- `/src/constants/questionsMock.json`

This file contains all questions, answers, difficulty levels, and prize values.

## Architecture

The project follows a modular architecture:

1. **Data Management**:
    - Game data is managed through a singleton class at `/src/utils/GameConfig.ts`
    - This class handles loading, parsing, generating questions and answers, providing access to the game configuration

2. **Game Logic**:
    - Core game logic is encapsulated in a custom hook at `src/components/pages/Game/useGameController.tsx`
    - This hook manages game state, user interactions, and gameplay flow

## Testing

The project uses Jest and React Testing Library for unit and integration tests:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm test -- --watch
```
