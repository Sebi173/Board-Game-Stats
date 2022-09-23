import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import SortNumericalArray from '../utilities/functions/SortNumericalArray';


let NumberOfSessionsPlayed = (placements, registeredPlayers) => {
  let number_of_games_played_all_players = []
  for (let i=0; i<registeredPlayers.length; i++) {
    let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)
    let number_of_games_played = rankings_player.length
    let number_of_games_played_player = {
      x: player,
      y: number_of_games_played
    }
    number_of_games_played_all_players.push(number_of_games_played_player)
  }
  let sorted_number_of_games_played_all_players = SortNumericalArray(number_of_games_played_all_players, true)
  return sorted_number_of_games_played_all_players
}

export default NumberOfSessionsPlayed;