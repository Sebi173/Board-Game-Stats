import React, { useEffect, useState } from 'react';
import { ImageBackground, Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import firestore from '../../firebase';



// This screen is used to show stats of the various players

const StatsScreen = () => {
  
    //Data from the database
    let [oldPlayers, setOldPlayer] = useState([]) //all players in the database
    let [rankings, setRankings] = useState([]) //all the rankings in the database
    let [sessions, setSessions] = useState([])

    //Stats for a given player
    let [attendanceRate, setAttendanceRate] = useState([])
    let [averageDistanceToLast, setAverageDistanceToLast] = useState([])
    let [averageNumberOfOpponents, setAverageNumberOfOpponents] = useState([])
    let [averagePlace, setAveragePlace] = useState([])
    let [bestGameByWinrate, setBestGameByWinrate] = useState([])
    let [bestGameByWins, setBestGameByWins] = useState([]) 
    let [bestGameByPlace, setBestGameByPlace] = useState([])
    let [mostPlayedGame, setMostPlayedGame] = useState([])
    let [numberOfGamesPlayed, setNumberOfGamesPlayed] = useState([])
    let [numberOfWins, setNumberOfWins] = useState([])

    //Utilities
    let [showStats, setShowStats] = useState(false)
    let [gameSession, setGameSession] = useState([])


    useEffect(() => {
      {getRankings();
      getSessions();
      getPlayers()
      }
    }, []) 

    //Get all players from the database
    let getPlayers = async () => {
      let players = await getDocs(collection(firestore, 'Players'));
      let data = []
      players.forEach((doc) => {
          data.push(doc.data().player)
      })
      array = []
      for (let i=0; i < data.length; i++) {
        let player_object = {
          id: i,
          player: data[i]
        }
        array.push(player_object)
      }
      setOldPlayer(array)
    }


    //Get all rankings from the database
    let getRankings = async () => {
      let games = await getDocs(collection(firestore, 'PlacementsOverview'));
      let data = []
      games.forEach((doc) => {
          data.push(doc.data())
      })
      setRankings(data)
    }

    let getSessions = async () => {
      let games = await getDocs(collection(firestore, 'SessionsOverview'));
      let data = []
      games.forEach((doc) => {
          data.push(doc.data())
      })
      setSessions(data)
      setGameSession(FindMaximum(data.map(x => x.session)))
    }

    //Handle whenever a player is submitted
    let handleSubmit = (player) => {
      let rankings_player = rankings.filter(x => x.player === player)
      if (rankings_player.length === 0) {
        alert('No Games')
      }
      else {
        CalculateAveragePlace(rankings_player)
        CalculateAverageNumberOfOpponents(rankings_player)
        CalculateBestGameByWins(rankings_player)
        CalculateBestGameByWinrate(rankings_player)
        CalculateBestGameByPlace(rankings_player)
        CalculateMostPlayedGame(rankings_player)
        CalculateNumberOfWins(rankings_player)
        CalculateAverageDistanceToLast(rankings_player)
        CalculateAttendanceRate(rankings_player)
        CalculateNumberOfGamesPlayed(rankings_player)
        setShowStats(true)
      }
    }

    //Return the average of an array
    let Average = (array) => {
      return array.reduce((a,b) => a + b, 0) / array.length;
    }

    //Return the number of occurences of element in array
    let CountOccurences = (element, array) => {
      let count = 0
      array.forEach(x => {
        if (x === element) {
          count += 1;
        }
      })
      return count
    }

    //Drop duplicates in array and return array with unique elements
    let DropDuplicates = (array) => {
      return array.filter((x, index) => array.indexOf(x) === index)
    }

    //Return numerical maximum of array
    let FindMaximum = (array) => {
      return Math.max.apply(Math, array)
    }

    //Return the most frequent element of an array
    let MostFrequentElement = (array) => {
      const hashmap = array.reduce( (acc, val) => {
        acc[val] = (acc[val] || 0 ) + 1
        return acc
      },{})
      return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b);
    }

    //Calculate the attendance rate and reset its state
    let CalculateAttendanceRate = (rankings_player) => {
      setAttendanceRate(rankings_player.length / gameSession)
    }

    //Calculate average number of opponents and reset its state
    let CalculateAverageNumberOfOpponents = (rankings_player) => {
      let number_of_opponents = rankings_player.map(x => x.numberofplayers)
      setAverageNumberOfOpponents(Average(number_of_opponents))
    }

    //Calculate the average placement and reset its state
    let CalculateAveragePlace = (rankings_player) => {
      let placings = rankings_player.map(x => x.placement)
      let average_placement = Average(placings);
      setAveragePlace(average_placement)
    }

    //Calculate the average distance to last and reset its state
    let CalculateAverageDistanceToLast = (rankings_player) => {
      let avg_distance_to_last = 0
      for (let i=0; i<rankings_player.length; i++) {
        avg_distance_to_last = avg_distance_to_last + (rankings_player[i].numberofplayers - rankings_player[i].placement)
      }
      setAverageDistanceToLast(avg_distance_to_last / rankings_player.length)
    }

    let CalculateBestGameByWins = (rankings_player) => {
      let all_wins = rankings_player.filter(x => x.placement === 1)
      if (all_wins.length != 0) {
        let all_wins_games = all_wins.map(x => x.game)
        let most_wins_game = MostFrequentElement(all_wins_games)
        setBestGameByWins({
          game: most_wins_game,
          wins: CountOccurences(most_wins_game, all_wins_games).toString() + ' Wins'
        })
      }
      else {
        setBestGameByWins({
          game: 'No Wins',
          wins: 'you suck'
        })
      }
    }

    let CalculateBestGameByWinrate = (rankings_player) => {
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
        let max = FindMaximum(win_rates)
        let index = win_rates.indexOf(max)
        setBestGameByWinrate({
          game: games[index],
          win_rate: (max * 100).toString() + '%'
        })
      }
      else {
        setBestGameByWinrate({
          game: 'No Wins',
          win_rate: 'you suck'
        })
      }
    }

    let CalculateBestGameByPlace = (rankings_player) => {
      let games_played = rankings_player.map(x => x.game)
      let unique_games_played = games_played.filter((x, index) => games_played.indexOf(x) === index)
      let best_game_by_place = 'No Games Played'
      let best_average_place = 100
      for (let i=0; i < unique_games_played.length; i++) {
        let game = unique_games_played[i]
        let average_place_in_game = Average(rankings_player.filter(x => x.game == game).map(y => y.placement))
        if (average_place_in_game < best_average_place) {
          best_average_place = average_place_in_game
          best_game_by_place = game
          }
      }
      setBestGameByPlace({
        game: best_game_by_place,
        avg_placement: best_average_place
      })
    }



    let CalculateMostPlayedGame = (rankings_player) => {
      let games_played = rankings_player.map(x => x.game)
      let most_played_game = MostFrequentElement(games_played)
      setMostPlayedGame({
        game: most_played_game,
        plays: CountOccurences(most_played_game, games_played)
      })
    }

    let CalculateNumberOfGamesPlayed = (rankings_player) => {
      setNumberOfGamesPlayed(rankings_player.length)
    }

    let CalculateNumberOfWins = (rankings_player) => {
      let first_places_player = rankings_player.filter(x => x.placement === 1)
      setNumberOfWins(first_places_player.length)
    }



    return (
      <ImageBackground style={styles.image_background} source={{uri: 'https://cdn.wallpapersafari.com/78/91/aPClZg.jpg'}}>
        <View style={styles.container}>
          <View style={styles.placements_choices}>
            <Picker
              onValueChange={(item) => handleSubmit(item)}
            >
              <Picker.Item label={'Please select Player'} value={0} />
            {Array.from(oldPlayers, x => (
              <Picker.Item key={x.id} label={x.player} value={x.player} />))}
            </Picker>
          </View>
          {showStats && <View> 
            <Text>Average Place: {averagePlace}</Text>
            <Text>Best Game by Wins: {bestGameByWins.game} ({bestGameByWins.wins})</Text>
            <Text>Best Game by Winrate: {bestGameByWinrate.game} ({bestGameByWinrate.win_rate})</Text>
            <Text>Best Game by Place: {bestGameByPlace.game} ({bestGameByPlace.avg_placement}. Place on average)</Text>
            <Text>Most Played Game: {mostPlayedGame.game} ({mostPlayedGame.plays} times played)</Text>
            <Text>Number of Wins: {numberOfWins}</Text>
            <Text>Number of Games Played: {numberOfGamesPlayed}</Text>
            <Text>Average Distance to Last: {averageDistanceToLast}</Text>
            <Text>Attendance Rate: {attendanceRate}</Text>
            <Text>Average Number of Oppononents: {averageNumberOfOpponents}</Text>  
          </View>}
        </View>
      </ImageBackground>
    );
}

export default StatsScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 20
  },
  container: {
    justifyContent: 'center',
  },
  image_background: {
    paddingTop: '25%',
    flex:1
  },
  text: {
    justifyContent: 'center',
    padding: 20
  },
  placements: {
    justifyContent: 'center'
  },
  placements_choices: {
    width: '75%', 
    height: 40
  },
  points: {
    width: '25%',
     height: 40
  },
})