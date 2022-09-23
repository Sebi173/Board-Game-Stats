import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import NumericalAverage from '../utilities/functions/NumericalAverage';
import SortNumericalArray from '../utilities/functions/SortNumericalArray';


const AverageNumberOfPlayers = (placements, registeredPlayers) => {
    let average_number_of_players_all_players = []
    for (let i=0; i<registeredPlayers.length; i++) {
      let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)
      if (rankings_player.length === 0) {
        let average_number_of_players_player = {
          x: player,
          y: 0
        }
        average_number_of_players_all_players.push(average_number_of_players_player)
      } else {
        let all_numbers_of_players = rankings_player.map(x => x.numberofplayers)
        let average_number_of_players = Math.round(NumericalAverage(all_numbers_of_players) * 100) / 100
        let average_number_of_players_player = {
          x: player,
          y: average_number_of_players
      }
      average_number_of_players_all_players.push(average_number_of_players_player)
    }
    }
    let sorted_average_number_of_players_all_players = SortNumericalArray(average_number_of_players_all_players, true)
    return sorted_average_number_of_players_all_players
  }

export default AverageNumberOfPlayers;