const http = require('http')
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const OpenAI = require("openai")
const openai = new OpenAI();

app.use('/', express.static('public'))
app.use('/libs', express.static('libs'))
app.use('/cdn', express.static('cdn'))

app.get("/api/gpt/:ask", async (req, res) => {

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: req.params.ask }],
      model: "gpt-3.5-turbo",
    });

    res.send(completion.choices[0])
    
  } catch (error) {
    res.send('Service indisponible, nous sommes désolés du désagrément.')
  }


})

app.get("/api/pollution/:lat/:long", async (req, res) => {
  let url = `https://api.openweathermap.org/data/2.5/air_pollution`
  url += `?lat=${req.params.lat}`
  url += `&lon=${req.params.long}`
  url += `&appid=${process.env.OPENW_KEY}`
  
  const data = await fetch(url)
  const weatherInfos = await data.json()

  res.json(weatherInfos)
})

app.get("/api/city/:lat/:long", async (req, res) => {
  let url = `https://api.openweathermap.org/data/2.5/reverse`
  url += `?lat=${+(+req.params.lat).toFixed(2)}`
  url += `&lon=${+(+req.params.long).toFixed(2)}`
  url += `&appid=${process.env.OPENW_KEY}`

  const data = await fetch(url)
  const weatherInfos = await data.json()

  res.json(weatherInfos)
})

app.listen(3000)