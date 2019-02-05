import React, {Component} from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const API = 'http://localhost:3000/pokemon'

export default class PokemonPage extends Component {

  state = {
    pokemon: []  
  }

  fetchPokemon = async(API) => {
    return await fetch(API)
    .then(response => response.json())
  }

  async componentDidMount() {
    this.renderPokemon()
  }

  async renderPokemon(){
    const pokemonToParse = await this.fetchPokemon(API)

    if (pokemonToParse.length > 0) {

      //console.log(pokemonToParse[0].name)

      const newPokemon = pokemonToParse.map( data => ({
        id: data.id,
        name: data.name,
        hp: data.stats[5].value,
        frontUrl: data.sprites.front,
        backUrl: data.sprites.back,
        toggle: false
      })
      )
      //console.log(newPokemon[0])

      this.setState({
        pokemon: newPokemon
      })
      console.log(this.state.pokemon[0])
    }
  }

  filteredPokemon = (event) => {
    event.persist()
    const searchInput = event.target.value
    const copyPokemon = [...this.state.pokemon]
    this.setState({
      searchTerm: searchInput
    })
    return copyPokemon.filter( pokemon => pokemon.name.includes(searchInput ))
  }


  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(() => console.log('🤔'), 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemonToRender={this.state.pokemon} />
        <br />
        <PokemonForm />
      </div>
    )
  }

}
