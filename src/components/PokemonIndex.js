import React, {Component} from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const API = 'http://localhost:3000/pokemon'

export default class PokemonPage extends Component {

  state = {
    pokemon: [],
    searchTerm: ''
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

  filteredPokemon = (value) => {
    const copyPokemon = [...this.state.pokemon]
    if (value === '') {
      return copyPokemon
    }
    const filteredPokemon = copyPokemon.filter( pokemon => pokemon.name.includes(value))
    console.log(filteredPokemon)
    return filteredPokemon
  }

  setSearchState = (value) => {
    const searchInput = value
    console.log(searchInput)
    this.setState({
      searchTerm: searchInput
    })
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={ (event) => this.setSearchState(event.target.value) } />
        <br />
        <PokemonCollection pokemonToRender={this.filteredPokemon(this.state.searchTerm)} />
        <br />
        <PokemonForm />
      </div>
    )
  }

}
