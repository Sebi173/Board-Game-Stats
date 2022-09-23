const getPlayerAndHisRankings = (index, placements, registeredPlayers) => {
    let player = registeredPlayers[index].player
    let rankings_player = placements.filter(x => x.player === player)
    return {player, rankings_player};
  }

export default getPlayerAndHisRankings;