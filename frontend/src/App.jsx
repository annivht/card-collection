
import { useState, useEffect } from 'react'
import cardService from './services/cards'
import './App.css'

// näyttää kortin
const Card = ({ card, deleteCard }) => {
  return (
    <tr>
      <td>{card.name}</td>
      <td>{card.set}</td>
      <td>{card.number}</td>
      <td>
        <button onClick={() => deleteCard(card.id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

// näyttää kortit taulukossa
const Cards = ({ cards, deleteCard }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Set</th>
          <th>Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cards.map(card =>
          <Card
            key={card.id}
            card={card}
            deleteCard={deleteCard}
          />
        )}
      </tbody>
    </table>
  )
}

// lomake kortin lisäämiseen
const CardForm = ({
  addCard,
  newName,
  setNewName,
  newSet,
  setNewSet,
  newNumber,
  setNewNumber
}) => {
  return (
    <form onSubmit={addCard}>
      <div>
        <label>Card name</label>
        <input
          value={newName}
          onChange={event => setNewName(event.target.value)}
        />
      </div>

      <div>
        <label>Set</label>
        <input
          value={newSet}
          onChange={event => setNewSet(event.target.value)}
        />
      </div>

      <div>
        <label>Card number</label>
        <input
          value={newNumber}
          onChange={event => setNewNumber(event.target.value)}
        />
      </div>

      <button type="submit">Add card</button>
    </form>
  )
}

const App = () => {
  // sovelluksen tilat
  const [cards, setCards] = useState([])
  const [newName, setNewName] = useState('')
  const [newSet, setNewSet] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // haetaan kortit backendistä
  useEffect(() => {
    cardService
      .getAll()
      .then(response => {
        setCards(response.data)
      })
  }, [])

  // lisää uuden kortin
  const addCard = (event) => {
    event.preventDefault()

    if (!newName || !newSet || !newNumber) {
      return
    }

    const cardObject = {
      name: newName,
      set: newSet,
      number: newNumber
    }

    cardService
      .create(cardObject)
      .then(response => {
        setCards(cards.concat(response.data))
        setNewName('')
        setNewSet('')
        setNewNumber('')
      })
  }

  // poistaa kortin
  const deleteCard = (id) => {
    const card = cards.find(card => card.id === id)

    if (window.confirm(`Delete ${card.name}?`)) {
      cardService
        .remove(id)
        .then(() => {
          setCards(cards.filter(card => card.id !== id))
        })
    }
  }

  // suodattaa kortit nimen tai sarjan mukaan
  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(search.toLowerCase()) ||
    card.set.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container">
      <h1>Pokémon Card Collection</h1>

      <h2>Add a new card</h2>
      <CardForm
        addCard={addCard}
        newName={newName}
        setNewName={setNewName}
        newSet={newSet}
        setNewSet={setNewSet}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>My collection ({cards.length})</h2>

      <div className="search">
        <label>Search cards</label>
        <input
          value={search}
          onChange={event => setSearch(event.target.value)}
          placeholder="Search by name or set"
        />
      </div>

      <Cards
        cards={filteredCards}
        deleteCard={deleteCard}
      />
    </div>
  )
}

export default App
