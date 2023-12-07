const http = require('http')
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

app.use('/', express.static('public'))
app.use('/libs', express.static('libs'))

app.listen(3000)