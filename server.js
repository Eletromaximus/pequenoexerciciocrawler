const express = require('express')
const puppeteer = require('puppeteer')

const server = express()

server.get('/', async (request, response) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.alura.com.br/cursos-online-front-end');

  const pageContent = await page.evaluate(() => {
    return {
      subtitle: document.querySelector('.pagina-categoria__descricao').innerHTML,
      // width: document.documentElement.clientWidth,
      // height: document.documentElement.clientHeight,
      // deviceSaleFactor: window.devicePixelRatio
    }
  })
  // Pegar dados da pagina da alura
  await browser.close();
  response.send({
    "subtitle": pageContent.subtitle
  })
})

const port = 3000
server.listen(port, () => {
  console.log(
    `Servidor subiu com sucesso :).
    Acesse em: http://localhost:${port}`
    )
})

// ;(async () => {

// })();