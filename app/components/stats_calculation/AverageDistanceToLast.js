import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import SortNumericalArray from '../utilities/functions/SortNumericalArray';


const AverageDistanceToLast = (placements, registeredPlayers) => {

  let average_distance_to_last_all_players = []

  for (let i=0; i<registeredPlayers.length; i++) {

    let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)

    if (rankings_player.length === 0) {

      let distance_to_last_player = {
        x: player,
        y: 0
      }

      average_distance_to_last_all_players.push(distance_to_last_player)

    } else {
      let summed_distance_to_last = 0
      for (let i=0; i<rankings_player.length; i++) {
        summed_distance_to_last = summed_distance_to_last + (rankings_player[i].numberofplayers - rankings_player[i].placement)
      }

      let average_distance_to_last = Math.round(summed_distance_to_last / rankings_player.length * 100) / 100

      let distance_to_last_player = {
        x: player,
        y: average_distance_to_last
      }

      average_distance_to_last_all_players.push(distance_to_last_player)

    }
  }
  let sorted_average_distance_to_last_all_players = SortNumericalArray(average_distance_to_last_all_players, true)
  return sorted_average_distance_to_last_all_players
}

export default AverageDistanceToLast;