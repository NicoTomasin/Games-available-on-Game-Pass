<div align="center">

# 🎮 Games available on Game Pass

**Lista actualizada todos los días de los juegos de PC Game Pass, en un JSON listo para consumir.**

[![List is updated](https://github.com/NicoTomasin/Games-available-on-Game-Pass/actions/workflows/main.yml/badge.svg)](https://github.com/NicoTomasin/Games-available-on-Game-Pass/actions/workflows/main.yml)
![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white)
![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=flat-square&logo=puppeteer&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Español](#-español) · [English](#-english)

</div>

---

## 🇦🇷 Español

### ¿Qué es?

Un scraper que obtiene la lista de juegos disponibles en **PC Game Pass** directamente desde [xbox.com](https://www.xbox.com/en-US/games/browse) y la guarda en [`gameNames.json`](gameNames.json). Un workflow de GitHub Actions lo ejecuta **cada 24 hs** y commitea los cambios, así que el archivo siempre está al día.

En paralelo se creó una extensión de Chrome que, al navegar Steam, muestra un indicador visual si el juego está en Game Pass (la extensión no es pública).

### 📦 Usar la lista

Consumí el JSON directamente desde GitHub, sin instalar nada:

```
https://raw.githubusercontent.com/NicoTomasin/Games-available-on-Game-Pass/main/gameNames.json
```

```js
const res = await fetch(
  "https://raw.githubusercontent.com/NicoTomasin/Games-available-on-Game-Pass/main/gameNames.json"
);
const games = await res.json(); // ["persona 5 royal", "pentiment", ...]
const isOnGamePass = (title) => games.includes(title.toLowerCase());
```

El archivo es un array de strings con los nombres **en minúsculas**, tal cual aparecen en la tienda de Xbox (incluyendo símbolos como `™` o `®`).

### ⚙️ Cómo funciona

1. Puppeteer abre `xbox.com/games/browse` en modo headless.
2. Aplica los filtros **Subscriptions → Game Pass for PC** (con reintentos, porque la página carga de forma asíncrona).
3. Hace click en **Load more** hasta que no quedan más juegos.
4. Extrae los títulos, los normaliza a minúsculas y escribe `gameNames.json`.
5. El workflow [`main.yml`](.github/workflows/main.yml) corre todos los días a las 00:00 UTC y pushea si hubo cambios.

### 🚀 Correrlo localmente

Requisitos: [Bun](https://bun.sh/) (o Node.js 18+).

```bash
git clone https://github.com/NicoTomasin/Games-available-on-Game-Pass.git
cd Games-available-on-Game-Pass
bun install
bun scrapper.js
```

### 📁 Estructura

```
├── .github/workflows/main.yml   # Cron diario que corre el scraper y commitea
├── scrapper.js                  # Scraper con Puppeteer
└── gameNames.json               # Resultado: lista de juegos
```

---

## 🇺🇸 English

A scraper that pulls the list of **PC Game Pass** games from [xbox.com](https://www.xbox.com/en-US/games/browse) and saves it to [`gameNames.json`](gameNames.json). A GitHub Actions workflow runs it **every 24 hours** and commits the changes, so the file is always up to date.

**Use the list** without installing anything:

```
https://raw.githubusercontent.com/NicoTomasin/Games-available-on-Game-Pass/main/gameNames.json
```

It's an array of lowercase game titles, exactly as listed in the Xbox store.

**Run it locally:**

```bash
bun install
bun scrapper.js
```

---

## 🤝 Contribuir

¡Los aportes son bienvenidos! Leé la [guía de contribución](CONTRIBUTING.md) antes de abrir un PR.

## 📄 Licencia

Distribuido bajo la [Licencia MIT](LICENSE). Game Pass y Xbox son marcas de Microsoft; este proyecto no está afiliado a Microsoft.

---

<div align="center">Hecho por <a href="https://nicotomasin.com.ar">Nico Tomasin</a></div>
