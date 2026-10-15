
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

// sallitaan frontendin pyynnöt
app.use(cors())

// muutetaan json-data javascriptiksi
app.use(express.json())

// näytetään pyynnöt terminaalissa
app.use(morgan('tiny'))

// kortit alussa
let cards = [
  { id: 1, name: 'Lugia V', set: 'Silver Tempest', number: '186/195' },
  { id: 2, name: 'Charizard ex', set: '151', number: '199/165' },
  { id: 3, name: 'Pikachu', set: 'Paldea Evolved', number: '62/193' }
]

// seuraavan kortin id
let nextId = 4

// hakee kaikki kortit
app.get('/api/cards', (request, response) => {
  response.json(cards)
})

// lisää uuden kortin
app.post('/api/cards', (request, response) => {
  const body = request.body

  const card = {
    id: nextId,
    name: body.name,
    set: body.set,
    number: body.number
  }

  nextId = nextId + 1

  cards = cards.concat(card)
  response.status(201).json(card)
})

// poistaa kortin
app.delete('/api/cards/:id', (request, response) => {
  const id = Number(request.params.id)
  cards = cards.filter(card => card.id !== id)
  response.status(204).end()
})

// palvelin käyntiin
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
