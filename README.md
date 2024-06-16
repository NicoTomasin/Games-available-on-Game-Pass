[![List is updated](https://github.com/NicoTomasin/Games-available-on-Game-Pass/actions/workflows/main.yml/badge.svg)](https://github.com/NicoTomasin/Games-available-on-Game-Pass/actions/workflows/main.yml)

# Games available on Game Pass [en]
The idea behind this script is to obtain the updated list of games available on GamePass. Additionally, a Chrome extension was created for Steam that adds a visual indicator to check if a game is available on GamePass or not (The extension is not available to the public).

## Technologies and Usage
Using [**Puppeteer**](https://pptr.dev/), the updated list of games available for PC is scraped from the Microsoft website.

You can access this list from:

    https://raw.githubusercontent.com/NicoTomasin/GamePassGames/main/gameNames.json
    - or -
    https://github.com/NicoTomasin/GamePassGames/blob/main/gameNames.json

Alternatively, you can clone the repository and run it locally:

    - npm i
    - node scrapper.js

The list is kept up to date by running a **[GitHub Actions](https://github.com/features/actions)** every 24 hours, which executes the script and pushes the changes to the repository.

# Games available on Game Pass (Juegos disponibles en el GamePass) [es]
La idea detras de este script es obtener la lista actualizada de juegos disponibles en el gamepass
Paralelo a esto se creo una extension para chrome que al entrar a Steam que agrega un indicador visual para saber si ese juego esta en el gamepass o no (La extension no esta disponible al publico)

## Tecnologias y uso
Usando  [**Puppeteer**](https://pptr.dev/) se obtiene de la la pagina de Microsoft la lista actualizada de juegos disponibles para PC

Para acceder a esta lista podes hacerlo desde:

    https://raw.githubusercontent.com/NicoTomasin/GamePassGames/main/gameNames.json
    - o -
    https://github.com/NicoTomasin/GamePassGames/blob/main/gameNames.json
   
O podes bajarte el repo y ejecutarlo localmente:

    - npm i
    - node scrapper.js
    
La lista se mantiene actualizada ya que cada 24hs se corre un **[GitHub Actions](https://github.com/features/actions)** 
que corre el script y pushea los cambios en el repo.
