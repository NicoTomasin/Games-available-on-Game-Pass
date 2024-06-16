const puppeteer = require("puppeteer");
const fs = require("fs");
let gameNames = [];
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

async function checkGame() {
  console.log("Abriendo navegador");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("Abriendo la página de Xbox Game Pass");
  await page.goto("https://www.xbox.com/en-US/xbox-game-pass/games");
  console.log("Esperando para acceder a .platselectbutton .platpc");
  await page.waitForSelector(".platselectbutton.platpc", { timeout: 10000 });
  await page.click(".platselectbutton.platpc");
  try {
    console.log("Esperando a que carguen los nombres de los juegos");
    await page.waitForSelector(
      'h3.c-subheading-4.x1GameName[itemprop="product name"]'
    );
  } catch (error) {
    console.log("No se encontraron los titulos de los juegos");
  }
  while (true) {
    console.log("Chequeando si está el botón de cargar más juegos");
    try {
      await page.waitForSelector(
        'a[aria-label="load more, reveal additional games"]',
        { timeout: 5000 }
      );
      await page.click('a[aria-label="load more, reveal additional games"]');
      await delay(2000);
    } catch (error) {
      console.log("No se encontró el botón de cargar más juegos");
      break;
    }
  }
  const gameNameElements = await page.$$(
    'h3.c-subheading-4.x1GameName[itemprop="product name"]'
  );
  for (let element of gameNameElements) {
    let innerText = await page.evaluate((e) => e.innerText, element);
    innerText = innerText.toLowerCase();
    innerText = innerText.replace(/[()]/g, "");
    innerText = innerText.replace(
      /\s*(Xbox\s*Series\s*X\s*\|\s*S|Xbox\s*One|Xbox\s*One\s*&\s*Xbox\s*Series\s*X\|S\s*\(Xbox\s*Series\s*X\|S\s*&\s*PC\)|-\s*Standard\s*Edition|Standard\s*Edition)(?=\s*|\))/gi,
      ""
    );
    console.log(innerText + " ha sido añadido");
    gameNames.push(innerText);
  }
  console.log("Cerrando navegador");
  await browser.close();

  console.log("Guardando los nombres de los juegos en un archivo");
  if (fs.existsSync("gameNames.json")) {
    fs.unlinkSync("gameNames.json");
  }
  gameNames = shuffle(gameNames);
  gameNames = [...new Set(gameNames)];

  fs.writeFile("gameNames.json", JSON.stringify(gameNames), (err) => {
    if (err) throw err;
    console.log("El archivo ha sido guardado");
  });
}

checkGame();
