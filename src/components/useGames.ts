import axios from 'axios'
import useSwr from 'swr'

const GRAPHQL_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/azuro-protocol/azuro-api-dev'

const QUERY = `
  query Games($gameFilter: Game_filter) {
    sports {
      name
      countries(first: 2) {
        leagues(first: 2) {
          games(where: $gameFilter) {
            gameId
            title
            league {
              name
              country {
                name
              } 
            }
            participants {
              name
              image
            }
            startsAt
            status
          }
        }
      }
    }
  }
`

export default () => {
  return useSwr('/games', async () => {
    const { data } = await axios.post(GRAPHQL_ENDPOINT, {
      query: QUERY,
      variables: {
        gameFilter: {
          startsAt_gt: String(Math.floor(Date.now() / 1000)), // in seconds
          hasActiveConditions: true,
        },
      }
    })

    return data?.data.sports.map(({ countries, ...sport }) => {
      const games = countries?.map(({ leagues }) => {
        return leagues?.map(({ games }) => games).flat()
      }).flat()

      return {
        ...sport,
        games
      }
    })
  })
}
