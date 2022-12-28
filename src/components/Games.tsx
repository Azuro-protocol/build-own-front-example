import React from 'react'
import useGames from './useGames'
import Game from './Game'

const Games: React.FC = () => {
  const { data, isLoading } = useGames()

  return (
    <div className="p-4">
      <div className="mb-6 text-2xl">Games</div>
      {
        isLoading && (
          <div>Loading...</div>
        )
      }
      {
        !data?.length ? (
          <div>There are no games</div>
        ) : (
          <div className="space-y-6">
            {
              data.map(({ name, games }) => {

                return (
                  <div key={name}>
                    <div className="mb-2 text-xl font-semibold">{name}</div>
                    {
                      !games?.length ? (
                        <div className="text-md text-gray-500">No games</div>
                      ) : (
                        <div className="space-y-2">
                          {
                            games.map((game) => (
                              <Game key={game.gameId} {...game} />
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default Games
