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

/**
 * Función global para hacer click con reintentos inteligentes
 * @param {Function} clickAction - Función que retorna true si el click fue exitoso, false si falló
 * @param {string} actionName - Nombre de la acción para logs
 * @param {number} retryDelay - Delay incremental entre intentos en ms (default: 250)
 * @param {number} maxWaitTime - Tiempo máximo total de espera en ms (default: 5000)
 * @returns {Promise<boolean>} - true si tuvo éxito, false si falló después de todos los intentos
 */
async function clickWithRetry(
  clickAction,
  actionName,
  retryDelay = 250,
  maxWaitTime = 5000
) {
  let totalWaitTime = 0;
  let attemptNumber = 0;

  while (totalWaitTime <= maxWaitTime) {
    attemptNumber++;

    try {
      const success = await clickAction();
      if (success) {
        if (attemptNumber > 1) {
          console.log(
            `  ✓ ${actionName} exitoso en intento #${attemptNumber} (después de ${totalWaitTime}ms)`
          );
        }
        return true;
      }
    } catch (error) {
      // Continuar al siguiente intento
      if (attemptNumber === 1) {
        console.log(`  ⏳ ${actionName} - Reintentando con delays...`);
      }
    }

    // Si no fue exitoso y no hemos alcanzado el máximo, esperar y reintentar
    if (totalWaitTime < maxWaitTime) {
      await delay(retryDelay);
      totalWaitTime += retryDelay;
    } else {
      break;
    }
  }

  console.log(
    `  ✗ ${actionName} falló después de ${attemptNumber} intentos (${totalWaitTime}ms total)`
  );
  return false;
}

async function checkGame() {
  console.log("🚀 Abriendo navegador");
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();

  console.log("📱 Navegando a la página de Xbox Browse");
  await page.goto("https://www.xbox.com/en-US/games/browse", {
    waitUntil: "networkidle2",
    timeout: 60000,
  });

  console.log("\n🔍 Buscando y haciendo click en 'Subscriptions'...");

  // Hacer click en "Subscriptions" con retry
  const subscriptionsClicked = await clickWithRetry(async () => {
    return await page.evaluate(() => {
      const spans = Array.from(document.querySelectorAll("span"));
      const subscriptionsSpan = spans.find(
        (span) => span.textContent.trim() === "Subscriptions"
      );

      if (subscriptionsSpan) {
        subscriptionsSpan.click();
        return true;
      }
      return false;
    });
  }, "Click en 'Subscriptions'");

  if (subscriptionsClicked) {
    console.log("✓ Click en 'Subscriptions' exitoso");
  } else {
    console.log("✗ No se encontró 'Subscriptions'");
  }

  console.log("\n🎮 Buscando y haciendo click en 'Game Pass for PC'...");

  // Hacer click en "Game Pass for PC" con retry
  const gamePassClicked = await clickWithRetry(async () => {
    return await page.evaluate(() => {
      // Buscar el botón por ID o por texto
      const button =
        document.querySelector("#CFQ7TTC0KGQ8") ||
        Array.from(document.querySelectorAll("button")).find((btn) =>
          btn.textContent.includes("Game Pass for PC")
        );

      if (button) {
        button.click();
        return true;
      }
      return false;
    });
  }, "Click en 'Game Pass for PC'");

  if (gamePassClicked) {
    console.log("✓ Filtro 'Game Pass for PC' aplicado correctamente");
  } else {
    console.log("✗ No se pudo encontrar 'Game Pass for PC'");
  }

  console.log(
    "\n⏬ Cargando todos los juegos (haciendo click en 'Load more')..."
  );

  let loadMoreClicks = 0;
  let hasLoadMoreButton = true;

  // Hacer click en "Load more" hasta que no exista más
  while (hasLoadMoreButton) {
    const buttonFound = await clickWithRetry(
      async () => {
        return await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll("button"));
          const loadMoreButton = buttons.find(
            (btn) =>
              btn.getAttribute("aria-label") === "Load more" ||
              btn.textContent.includes("Load more")
          );

          if (loadMoreButton) {
            // Verificar que el botón esté visible
            const rect = loadMoreButton.getBoundingClientRect();
            const isVisible = rect.height > 0 && rect.width > 0;

            if (isVisible) {
              loadMoreButton.click();
              return true;
            }
          }
          return false;
        });
      },
      `Click #${loadMoreClicks + 1} en 'Load more'`,
      250,
      3000 // Para Load more usamos un timeout más corto (3 segundos)
    );

    if (buttonFound) {
      loadMoreClicks++;
      console.log(`  ✓ Click #${loadMoreClicks} en 'Load more' exitoso`);
      await delay(800); // Delay mínimo para que los nuevos juegos se carguen en el DOM
    } else {
      console.log("\n🏁 No hay más juegos para cargar");
      hasLoadMoreButton = false;
    }
  }

  console.log(`\n📝 Total de clicks en 'Load more': ${loadMoreClicks}`);
  console.log("📦 Extrayendo nombres de juegos...\n");

  // Extraer todos los nombres de juegos
  const extractedGames = await page.evaluate(() => {
    const games = [];

    // Buscar los elementos ProductCard
    const titleSelectors = ['span[class*="ProductCard-module__title"]'];

    for (const selector of titleSelectors) {
      const elements = document.querySelectorAll(selector);

      for (const element of elements) {
        let text = element.textContent.trim();

        // Filtrar solo elementos válidos
        if (text && text.length > 2 && text.length < 150) {
          games.push(text);
        }
      }

      // Si ya encontramos juegos con este selector, no seguir buscando
      if (games.length > 0) break;
    }

    // Si no encontramos con los selectores específicos, intentar con aria-label
    if (games.length === 0) {
      const cards = document.querySelectorAll(
        'div[class*="ProductCard"] a[aria-label]'
      );

      for (const card of cards) {
        const ariaLabel = card.getAttribute("aria-label");
        if (ariaLabel) {
          // Extraer solo el nombre, quitando el precio al final (ej: "Game Name, $19.99")
          const gameName = ariaLabel.split(",")[0].trim();
          if (gameName && gameName.length > 2 && gameName.length < 150) {
            games.push(gameName);
          }
        }
      }
    }

    return games;
  });

  console.log(`🎯 Juegos encontrados: ${extractedGames.length}`);

  // Procesar y limpiar nombres
  for (let gameName of extractedGames) {
    // Limpiar el nombre del juego
    gameName = gameName.toLowerCase();
    gameName = gameName.replace(/[()]/g, "");
    gameName = gameName.replace(
      /\s*(Xbox\s*Series\s*X\s*\|\s*S|Xbox\s*One|Xbox\s*One\s*&\s*Xbox\s*Series\s*X\|S\s*\(Xbox\s*Series\s*X\|S\s*&\s*PC\)|-\s*Standard\s*Edition|Standard\s*Edition)(?=\s*|\))/gi,
      ""
    );
    gameName = gameName.trim();

    if (gameName.length > 0) {
      console.log(`  ✓ ${gameName}`);
      gameNames.push(gameName);
    }
  }

  console.log("\n🔒 Cerrando navegador");
  await browser.close();

  console.log("\n💾 Guardando los nombres de los juegos en un archivo");
  if (fs.existsSync("gameNames.json")) {
    fs.unlinkSync("gameNames.json");
  }

  // Eliminar duplicados y mezclar
  gameNames = [...new Set(gameNames)];
  console.log(
    `✨ Juegos únicos después de eliminar duplicados: ${gameNames.length}`
  );
  gameNames = shuffle(gameNames);

  fs.writeFile("gameNames.json", JSON.stringify(gameNames, null, 2), (err) => {
    if (err) throw err;
    console.log("✅ El archivo gameNames.json ha sido guardado exitosamente\n");
  });
}

checkGame();
