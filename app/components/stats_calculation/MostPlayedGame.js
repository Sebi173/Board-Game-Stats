import CountOccurences from '../utilities/functions/CountOccurences';
import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import MostFrequentElement from '../utilities/functions/MostFrequentElement';


const MostPlayedGame = (placements, registeredPlayers) => {

  let most_played_game_all_players = []

  for (let i=0; i<registeredPlayers.length; i++) {

    let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)
    
    if (rankings_player.length === 0) {

      let most_played_game_player = {
        player: player,
        game: 'No Games played',
        times_played: 0
      }

      most_played_game_all_players.push(most_played_game_player)

    } else {
      
      let games_played = rankings_player.map(x => x.game)
      let most_played_game = MostFrequentElement(games_played)
      let number_of_times_played = CountOccurences(most_played_game, games_played)
      let most_played_game_player = {
        player: player,
        game: most_played_game,
        times_played: number_of_times_played
      }

      most_played_game_all_players.push(most_played_game_player)

    }
  }
  return most_played_game_all_players
}

export default MostPlayedGame;