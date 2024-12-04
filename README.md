# Pokedex

## Project Description

A simple JavaScript application "Pokedex" that allows users to view details about various Pokémon characters. By clicking one of the buttons, a modal opens with a picture and details of the Pokémon character.

## How to Get the Project Running

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd <project-directory>
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Start the development server:
    ```sh
    npm start
    ```
5. Open your browser and navigate to `http://localhost:8080`.

## Project Dependencies

- JavaScript version: ES2023
- ESLint rules: Prettier-ESLint
- Development dependencies:
    - `prettier-eslint`: ^16.3.0
    - `jest`: ^29.0.0
    - `live-server`: ^1.2.1

## API Used

- Pokémon API: [https://pokeapi.co/](https://pokeapi.co/)

## Features

- Fetches a list of Pokémon from the Pokémon API.
- Displays the list of Pokémon as buttons.
- Opens a modal with Pokémon details (name, height, image) when a button is clicked.
