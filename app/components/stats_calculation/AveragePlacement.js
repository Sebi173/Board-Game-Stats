import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import NumericalAverage from '../utilities/functions/NumericalAverage';
import SortNumericalArray from '../utilities/functions/SortNumericalArray';


const AveragePlacement = (placements, registeredPlayers) => {

    let average_placement_all_players = []

    for (let i=0; i<registeredPlayers.length; i++) {
      let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)
      if (rankings_player.length === 0) {
        let average_placement_player = {
          x: player,
          y: 5
        }
        average_placement_all_players.push(average_placement_player)
      } else {
        let placings_player = rankings_player.map(x => x.placement)
        let average_placement = Math.round(NumericalAverage(placings_player) * 100) / 100
        let average_placement_player = {
          x: player,
          y: average_placement
        }
        average_placement_all_players.push(average_placement_player)
      }
    }
    let sorted_average_placement_all_players = SortNumericalArray(average_placement_all_players, false)
    return sorted_average_placement_all_players
  }

export default AveragePlacement;