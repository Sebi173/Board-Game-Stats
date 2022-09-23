import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import SortNumericalArray from '../utilities/functions/SortNumericalArray';

let Winrates = (placements, registeredPlayers) => {
    let winrates_all_players = []
    let number_of_registered_players = registeredPlayers.length
    for (let i=0; i<number_of_registered_players; i++) {
      let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)
      let number_of_wins = rankings_player.filter(x => x.placement === 1).length
      let number_of_games = Math.max(rankings_player.length, 1)
      let win_rate = Math.round(number_of_wins / number_of_games * 100) / 100
      let winrate_player = {
        x: player,
        y: win_rate
      }
      winrates_all_players.push(winrate_player)
    }
    let sorted_winrates_all_players = SortNumericalArray(winrates_all_players, true)
    return sorted_winrates_all_players
  }

export default Winrates;