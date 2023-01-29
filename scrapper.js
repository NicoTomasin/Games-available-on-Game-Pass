const puppeteer = require('puppeteer');
const fs = require('fs');
let gameNames = [];
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
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.xbox.com/en-US/xbox-game-pass/games');
  //interact with the page

  await page.waitForSelector(
    '#unique-id-for-paglist-generated-select-menu-trigger'
  );
  await page.click('#unique-id-for-paglist-generated-select-menu-trigger');
  await page.waitForSelector('#unique-id-for-paglist-generated-select-menu-3');
  await page.click('#unique-id-for-paglist-generated-select-menu-3');
  await page.click('a[data-theplat="pc"].platselectbutton.platpc');
  while (true) {
    await page.waitForSelector(
      'h3.c-subheading-4.x1GameName[itemprop="product name"]'
    );
    const gameNameElements = await page.$$(
      'h3.c-subheading-4.x1GameName[itemprop="product name"]'
    );

    for (let element of gameNameElements) {
      let innerText = await page.evaluate((e) => e.innerText, element);
      innerText = innerText.toLowerCase();
      innerText = innerText.replace(/[()]/g, '');
      innerText = innerText.replace(
        /\s*(Xbox\s*Series\s*X\s*\|\s*S|Xbox\s*One|Xbox\s*One\s*&\s*Xbox\s*Series\s*X\|S\s*\(Xbox\s*Series\s*X\|S\s*&\s*PC\)|-\s*Standard\s*Edition|Standard\s*Edition)(?=\s*|\))/gi,
        ''
      );

      gameNames.push(innerText);
    }

    if ((await page.$('li.paginatenext.pag-disabled')) === null) {
      await page.waitForSelector('a[aria-label="Next Page"]');
      await page.click('a[aria-label="Next Page"]');
    } else {
      break;
    }
  }
  await browser.close();
  if (fs.existsSync('gameNames.json')) {
    fs.unlinkSync('gameNames.json');
  }
  gameNames = shuffle(gameNames);
  gameNames = [...new Set(gameNames)];

  fs.writeFile('gameNames.json', JSON.stringify(gameNames), (err) => {
    if (err) throw err;
    console.log('El archivo ha sido guardado');
  });
}

checkGame();
