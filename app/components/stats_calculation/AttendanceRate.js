import getPlayerAndHisRankings from '../utilities/functions/GetPlayerAndHisRankings';
import SortNumericalArray from '../utilities/functions/SortNumericalArray';


const AttendanceRate = (gameSession, placements, registeredPlayers) => {
  let attendance_rate_all_players = []
  for (let i=0; i<registeredPlayers.length; i++) {
    let {player, rankings_player} = getPlayerAndHisRankings(i, placements, registeredPlayers)
    let attendance_rate = rankings_player.length / gameSession
    let attendance_rate_player = {
      x: player,
      y: attendance_rate
    }
    attendance_rate_all_players.push(attendance_rate_player)
  }
  let sorted_attendance_rate_all_players = SortNumericalArray(attendance_rate_all_players, true)
  return sorted_attendance_rate_all_players
}

export default AttendanceRate;