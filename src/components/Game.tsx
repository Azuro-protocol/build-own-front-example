import React from 'react'

const Game = (props) => {
  const { gameId, title, country, league, participants, startsAt, status, liquidityPool, conditions } = props

  return (
    <div className="w-[300px] p-2 border border-gray-400 rounded">
      {
        participants.map(({ name, image }) => (
          <div key={name} className="flex items-center">
            <img className="w-[20px] h-[20px]" src={image} alt={name} />
            <div className="text-md">{name}</div>
          </div>
        ))
      }
    </div>
  )
}

export default Game
