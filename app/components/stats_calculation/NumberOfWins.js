import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import SortNumericalArray from '../utilities/functions/SortNumericalArray';

const NumberOfWins = (placements, registeredPlayers) => {
      let number_of_wins_all_players = []
      for (let i=0; i<registeredPlayers.length; i++) {
        let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)
        let number_of_wins = rankings_player.filter(x => x.placement === 1).length
        let number_of_wins_player = {
          x: player,
          y: number_of_wins
        }
        number_of_wins_all_players.push(number_of_wins_player)
      }
      let sorted_number_of_wins_all_players = SortNumericalArray(number_of_wins_all_players, true)
      return sorted_number_of_wins_all_players
    }

export default NumberOfWins;