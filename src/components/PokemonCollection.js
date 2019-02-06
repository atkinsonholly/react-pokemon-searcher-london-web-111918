import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

const PokemonCollection = (props) => {
  return (
    <Card.Group itemsPerRow={6} className='ui cards' >
      <h1>Hello From Pokemon Collection</h1>
      { props.pokemonToRender.length > 0 ? props.pokemonToRender.map(card => <PokemonCard key={card.id} pokemon={card}/>) : null }
    </Card.Group>
  )
}

export default PokemonCollection
