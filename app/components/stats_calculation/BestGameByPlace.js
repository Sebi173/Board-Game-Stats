import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import NumericalAverage from '../utilities/functions/NumericalAverage';


const FindBestGameByPlaceObject = (player, rankings_player) => {
  let games_played = rankings_player.map(x => x.game)
  let unique_games_played = games_played.filter((x, index) => games_played.indexOf(x) === index)
  let best_game_by_place = 'No Games Played'
  let best_average_place = 5
  for (let i=0; i < unique_games_played.length; i++) {
    let game = unique_games_played[i]
    let average_place_in_game = NumericalAverage(rankings_player.filter(x => x.game == game).map(y => y.placement))
    if (average_place_in_game < best_average_place) {
      best_average_place = average_place_in_game
      best_game_by_place = game
      }
  }
  let best_game_by_place_object = {
    player: player,
    game: best_game_by_place,
    avg_placement: best_average_place
  }
  return best_game_by_place_object
}


const BestGameByPlace = (placements, registeredPlayers) => {

  let best_game_by_placement_all_players = []

  for (let i=0; i<registeredPlayers.length; i++) {

    let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)
    
    if (rankings_player.length === 0) {

      let best_game_by_placement = {
        player: player,
        game: 'No Wins',
        avg_placement: 0
      }

      best_game_by_placement_all_players.push(best_game_by_placement)

    } else {
      
      let best_game_by_placement = FindBestGameByPlaceObject(player, rankings_player)

      best_game_by_placement_all_players.push(best_game_by_placement)

    }
  }
  return best_game_by_placement_all_players
}


export default BestGameByPlace;

