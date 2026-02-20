# Minesweeper – React + TypeScript Technical Interview Assignment

This is a **Minesweeper game** built with **React** and **TypeScript**, designed as a technical interview assignment.  
It features a fully interactive game board, timer, keyboard navigation, flagging, and persistent state using `localStorage`.

---

## Features

- **Dynamic Board** – Configurable number of rows, columns, and bomb rate.
- **Reveal Cells** – Click or use keyboard to reveal cells, with auto-flood reveal for empty cells.
- **Flag Cells** – Mark suspected bombs with right-click or keyboard shortcuts.
- **Win/Lose Detection** – Automatically detects win or loss states.
- **Timer** – Tracks elapsed game time.
- **Reset Button** – Quickly reset the game board.
- **Keyboard Navigation** – Navigate cells using arrow keys, reveal with Enter, and flag with `F`.
- **Persistence** – Game state persists across page reloads using `localStorage`.
- **Unit Tests** – Fully tested context, game logic, and board generation.

---

## Tech Stack

- **React** (v19)
- **TypeScript**
- **Jest & React Testing Library** – For unit testing
- **CSS** – For styling
- **LocalStorage** – To persist game state

---

## Installation

1. Clone the Repository:

   `git clone https://github.com/hamidreza8968/minesweeper-schneider-interview.git`  
   `cd minesweeper-shnider-interview`

2. Install Dependencies:

   `npm install`

3. Run the Development Server:

   `npm start`

   The app will be available at `http://localhost:3000/`


## Available Scripts

- **dev**: Starts the development server (`npm run dev`).
- **build**: Builds the project for production (`npm run build`).
- **lint**: Runs ESLint checks (`npm run lint`).
- **test**: Runs tests with Vitest (`npm run test`).


## Testing

To run tests, execute:

`npm run test`


## License

This project is open-source and available under the [MIT License](LICENSE).
