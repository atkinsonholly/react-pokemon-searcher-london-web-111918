import React from 'react'
import { Card } from 'semantic-ui-react'

const PokemonCard = (props) => {
  return (
    <Card>
      <div>
        <div className="ui card">
          <img src={props.pokemon.frontUrl} alt="oh no!" />
        </div>
        <div className="content">
          <div className="header">{props.pokemon.name}</div>
        </div>
        <div className="extra content">
          <span>
            <i className="icon heartbeat red" />
            {props.pokemon.hp} hp
          </span>
        </div>
      </div>
    </Card>
  )
}


export default PokemonCard
