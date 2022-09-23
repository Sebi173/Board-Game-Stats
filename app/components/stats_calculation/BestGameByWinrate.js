import CountOccurences from '../utilities/functions/CountOccurences';
import DropDuplicates from '../utilities/functions/DropDuplicates';
import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import NumericalMax from '../utilities/functions/NumericalMax';


const FindBestGameByWinrateObject = (player, rankings_player) => {
  let all_wins = rankings_player.filter(x => x.placement === 1)
  let games_played = rankings_player.map(x => x.game)
  let games_won = all_wins.map(x => x.game)
  let unique_games_won = DropDuplicates(games_won)
  let win_rates = []
  let games = []
  if (all_wins.length != 0) {
    for (let i=0; i<unique_games_won.length; i++) {
      let game = unique_games_won[i]
      let win_rate = CountOccurences(game, games_won.filter(x => x === game)) / CountOccurences(game, games_played.filter(x => x === game))
      win_rates.push(win_rate)
      games.push(game)
    }
    let highestWinrate = NumericalMax(win_rates)
    let index = win_rates.indexOf(highestWinrate)
    let game_with_highest_winrate = games[index]
    var best_game_by_winrate = {
      player: player,
      game: game_with_highest_winrate,
      win_rate: highestWinrate
    }
  }
  else {
    var best_game_by_winrate = {
      player: player,
      game: 'No Wins',
      win_rate: 0
    }
  }
  return best_game_by_winrate
}

const BestGameByWinrate = (placements, registeredPlayers) => {
  let best_game_by_winrate_all_players = []

  for (let i=0; i<registeredPlayers.length; i++) {

    let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)
    
    if (rankings_player.length === 0) {

      let best_game_by_winrate = {
        player: player,
        game: 'No Wins',
        win_rate: 0
      }

      best_game_by_winrate_all_players.push(best_game_by_winrate)

    } else {
      
      let best_game_by_winrate = FindBestGameByWinrateObject(player, rankings_player)

      best_game_by_winrate_all_players.push(best_game_by_winrate)

    }
  }
  return best_game_by_winrate_all_players
}

export default BestGameByWinrate;