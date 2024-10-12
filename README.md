
# Mines Game

This is a simple Mines game built with React. The game allows users to place bets, uncover fields, and avoid mines to win money. The balance and bet amounts are managed using React state, and the balance is persisted using localStorage.

## Features

-   **Balance Management**: The user's balance is stored in localStorage and updated after each game.
-   **Bet Management**: Users can increase or decrease their bet amount.
-   **Field Uncovering**: Users can click on fields to uncover them and find diamonds or avoid mines.
-   **Winning Conditions**: Users can win different amounts based on the number of uncovered fields and the current multiplier.

## Installation

1.  Clone the repository
    ```
    git  clone  https://github.com/mmacius/mines-game.git
    
    cd  mines-game
    ```
    
2.  Install dependencies:
    ```
    npm  install
    ```
    
3.  Start the development server:
    ```
    npm  start
    ```
    

## Usage

1.  **Start the Game**: Click the "Start Game" button to begin.
2.  **Adjust Bet**: Use the "+" and "-" buttons to increase or decrease your bet amount.
3.  **Set Mines Count**: Use the slider to set the number of mines in the game.
4.  **Uncover Fields**: Click on the fields to uncover them and avoid mines.
5.  **Check Balance**: Your current balance is displayed at the top.

## Code Overview

### State Variables

-   `balance`: The user's current balance, initialized from localStorage or set to 10000.
-   `minesAmount`: The number of mines in the game.
-   `mines`: An array representing the positions of the mines.
-   `discoveredFields`: An array representing the fields that have been uncovered.
-   `clickedFields`: An array representing the fields that have been clicked.
-   `bet`: The current bet amount.
-   `started`: A boolean indicating whether the game has started.
-   `buttonText`: The text displayed on the start/end game button.
-   `startFunction`: The function to be called when the start/end game button is clicked.
-   `winAmount`: The amount won in the current game.
-   `multiplier`: The current multiplier based on the number of uncovered fields.

### Functions

-   `startGame`: Starts the game, deducts the bet from the balance, and initializes the game state.
-   `endGame`: Ends the game, updates the balance with the win amount, and resets the game state.
-   `uncoverField`: Uncovers a field, updates the game state, and checks for mines.
-   `createTab`: Creates the mines array based on the number of mines.
-   `changeBet`: Changes the bet amount based on user input.
-   `changeMines`: Changes the number of mines based on user input.

### useEffect Hooks

-   **Balance Persistence**: Updates localStorage with the current balance whenever it changes.
-   **Win Amount Calculation**: Calculates the win amount based on the current multiplier and bet.
-   **Start Function Update**: Updates the start function based on whether the game has started.

## License

This project is licensed under the MIT License. See the LICENSE file for details.