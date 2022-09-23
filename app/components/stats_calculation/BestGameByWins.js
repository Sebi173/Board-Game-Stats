import CountOccurences from '../utilities/functions/CountOccurences';
import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import MostFrequentElement from '../utilities/functions/MostFrequentElement';


const FindBestGameByWinsObject = (player, rankings_player) => {
  let all_wins = rankings_player.filter(x => x.placement === 1)
  if (all_wins.length != 0) {
    let all_wins_games = all_wins.map(x => x.game)
    let most_wins_game = MostFrequentElement(all_wins_games)
    var best_game_by_wins = {
      player: player,
      game: most_wins_game,
      wins: CountOccurences(most_wins_game, all_wins_games)
    }
  }
  else {
    var best_game_by_wins = {
      player: player,
      game: 'No Wins',
      wins: 0
    }
  }
  return best_game_by_wins
}


const BestGameByWins = (placements, registeredPlayers) => {
  let best_game_by_wins_all_players = []
  for (let i=0; i<registeredPlayers.length; i++) {

    let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)
    
    if (rankings_player.length === 0) {

      let best_game_by_wins = {
        player: player,
        game: 'No Wins',
        wins: 0
      }

      best_game_by_wins_all_players.push(best_game_by_wins)

    } else {
      
      let best_game_by_wins = FindBestGameByWinsObject(player, rankings_player)

      best_game_by_wins_all_players.push(best_game_by_wins)

    }
  }
  return best_game_by_wins_all_players
}

export default BestGameByWins;