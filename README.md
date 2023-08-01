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

![Actions](https://lh3.googleusercontent.com/pw/AIL4fc9jvpmN2bpyiSLe4vvh0kOSKGARtCj77Ky7V4BJ3V8O9N_ci01NEGzMU_uijLszHKkS1znUbbG4sWtAqqVeWXG1iJpmV-IoL2y0WiBds3HUjc1uIS84H-iO00pt7N464XisHuMeB1nXj2XKYupnnhIwFurI-EjW5-aFFSShiPhE6weWopj3-7m-_JbnqUs5elBT0gGeOMMoVTsGbq_3V7VMEHH04Bcvep-OQmrN-wV3ms5H8y0qgXWhfDfkRnFrtRK4_vvI9-g4Y7gaTLWDO44Nz0Eo8ESmNC7Dlo_-RT0jvmcxFkQJs32GbbvXh9PUh7nf9FxwrSZnLycPLe4AFYgHSooztRIOQEG_g05JBmRyi2frKmnvTyJ9gyD6qy6slNnPUJbU6zAi6PJD2LsyA-NJJvKR_lwrlx3OJjKASetg3mR7SUaEaz2S7Az8qg8R6zHyip7KCUw0rMyeZWcT1k7LWg0xVVoUGHA1KksOP9usmL5g6UvlVCMvnY3LOpVEuEbSsAcQaq4wQ_awp_bgAbzBMioqmCwiF3-wt5mIzH4ERCFizck6bLvc5w718uiS0eRbkYjJrBu5BYJ-jLPTFd3UpoTYpRxPg3v882LGwJGg--Y3OIs94DPywBtcAN06OtwOtVkKAOIbdvINWINWJSmDtDjOhF45U-vpPnttZIsTLopyhk-bPUCx9DNgAbQUZ-ezRScHtg4EPf9X6bciQjwfeF0cAUBwqMSRCuDa-xvqCr-uer3frUKGz6djvbfblaC_2giZuGOlpWv9f5kfldizvQGVXoRa6ijOlalkmKi6dWCcwirCfjjABYl7s0NjNhrIopIZfsMV3auFZJYb5qFPzrSGGG6NILCfR64Fk2avAMT5HuJnJCGBdZjDjFZsAEzxwR5g6A1Om9lfu7ggTil2qLY5NAVrLDc1Tl5MTPHigQoQElynKwoaZXJydUvaYMrvCvSS1L2HTtb-nNs7t9lX=w1282-h1229-s-no?authuser=0)


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

![Actions](https://lh3.googleusercontent.com/pw/AIL4fc9jvpmN2bpyiSLe4vvh0kOSKGARtCj77Ky7V4BJ3V8O9N_ci01NEGzMU_uijLszHKkS1znUbbG4sWtAqqVeWXG1iJpmV-IoL2y0WiBds3HUjc1uIS84H-iO00pt7N464XisHuMeB1nXj2XKYupnnhIwFurI-EjW5-aFFSShiPhE6weWopj3-7m-_JbnqUs5elBT0gGeOMMoVTsGbq_3V7VMEHH04Bcvep-OQmrN-wV3ms5H8y0qgXWhfDfkRnFrtRK4_vvI9-g4Y7gaTLWDO44Nz0Eo8ESmNC7Dlo_-RT0jvmcxFkQJs32GbbvXh9PUh7nf9FxwrSZnLycPLe4AFYgHSooztRIOQEG_g05JBmRyi2frKmnvTyJ9gyD6qy6slNnPUJbU6zAi6PJD2LsyA-NJJvKR_lwrlx3OJjKASetg3mR7SUaEaz2S7Az8qg8R6zHyip7KCUw0rMyeZWcT1k7LWg0xVVoUGHA1KksOP9usmL5g6UvlVCMvnY3LOpVEuEbSsAcQaq4wQ_awp_bgAbzBMioqmCwiF3-wt5mIzH4ERCFizck6bLvc5w718uiS0eRbkYjJrBu5BYJ-jLPTFd3UpoTYpRxPg3v882LGwJGg--Y3OIs94DPywBtcAN06OtwOtVkKAOIbdvINWINWJSmDtDjOhF45U-vpPnttZIsTLopyhk-bPUCx9DNgAbQUZ-ezRScHtg4EPf9X6bciQjwfeF0cAUBwqMSRCuDa-xvqCr-uer3frUKGz6djvbfblaC_2giZuGOlpWv9f5kfldizvQGVXoRa6ijOlalkmKi6dWCcwirCfjjABYl7s0NjNhrIopIZfsMV3auFZJYb5qFPzrSGGG6NILCfR64Fk2avAMT5HuJnJCGBdZjDjFZsAEzxwR5g6A1Om9lfu7ggTil2qLY5NAVrLDc1Tl5MTPHigQoQElynKwoaZXJydUvaYMrvCvSS1L2HTtb-nNs7t9lX=w1282-h1229-s-no?authuser=0)
