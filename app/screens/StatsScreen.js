// packages
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { VictoryChart, VictoryBar } from "victory-native";
import { Picker } from '@react-native-picker/picker';

//database
import firestore from '../../firebase';

//stats_calculation
import CalculateNumberOfWins from '../components/stats_calculation/NumberOfWins';
import CalculateAveragePlacement from '../components/stats_calculation/AveragePlacement';
import CalculateAverageNumberOfPlayers from '../components/stats_calculation/AverageNumberOfPlayers';
import CalculateAverageDistanceToLast from '../components/stats_calculation/AverageDistanceToLast';
import CalculateAttendanceRate from '../components/stats_calculation/AttendanceRate';
import CalculateWinrates from '../components/stats_calculation/Winrates';
import CalculateNumberOfSessionsPlayed from '../components/stats_calculation/NumberOfSessionsPlayed';
import CalculateBestGameByWinrate from '../components/stats_calculation/BestGameByWinrate';
import CalculateBestGameByPlace from '../components/stats_calculation/BestGameByPlace';
import CalculateBestGameByWins from '../components/stats_calculation/BestGameByWins';
import CalculateMostPlayedGame from '../components/stats_calculation/MostPlayedGame';



// This screen is used to show stats of the various players
const StatsScreen = () => {

  //Data from the database will be stored in these states
  const [registeredPlayers, setRegisteredPlayers] = useState([]) //all players in the database
  const [placements, setPlacements] = useState([]) //all the rankings in the database
  const [sessions, setSessions] = useState([])

  //Stats for a given player
  const [attendanceRate, setAttendanceRate] = useState([])
  const [averageDistanceToLast, setAverageDistanceToLast] = useState([])
  const [averageNumberOfPlayers, setAverageNumberOfPlayers] = useState([])
  const [averagePlacement, setAveragePlacement] = useState([])
  const [bestGameByWinrate, setBestGameByWinrate] = useState([])
  const [bestGameByWins, setBestGameByWins] = useState([])
  const [bestGameByPlace, setBestGameByPlace] = useState([])
  const [mostPlayedGame, setMostPlayedGame] = useState([])
  const [numberOfSessionsPlayed, setNumberOfSessionsPlayed] = useState([])
  const [numberOfWins, setNumberOfWins] = useState([])
  const [winrates, setWinrates] = useState([])

  //Plot
  const [shownStat, setShownStat] = useState([{ init: 0, player: 'Init' }])
  const [labels, setLabels] = useState([])

  //Utilities
  const [showStats, setShowStats] = useState(false)
  const [statsLoaded, setStatsLoaded] = useState(false)
  const [gameSession, setGameSession] = useState([])
  const [selectedStat, setSelectedStat] = useState({
    id: 1,
    name: 'Number of Wins'
  })
  const [selectedStatName, setSelectedStatName] = useState('Choose Stat');


  //load_data
  useEffect(() => {
    {
      getRankings() &&
        getSessions() &&
        getPlayers()
    }
  }, [])

  var selectable_stats = [
    {
      id: 0,
      name: 'Choose Stat'
    },
    {
      id: 1,
      name: 'Number of Wins'
    },
    {
      id: 2,
      name: 'Winrate'
    },
    {
      id: 3,
      name: 'Average Number of Players'
    },
    {
      id: 4,
      name: 'Number of Games played'
    },
    {
      id: 5,
      name: 'Average Placement'
    },
    {
      id: 6,
      name: 'Average Distance to Last'
    },
  ]

  //Get all players from the database
  const getPlayers = async () => {
    let players = await getDocs(collection(firestore, 'Players'));
    let data = []
    players.forEach((doc) => {
      data.push(doc.data().player)
    })
    let array = []
    for (let i = 0; i < data.length; i++) {
      let player_object = {
        id: i,
        player: data[i]
      }
      array.push(player_object)
    }
    setRegisteredPlayers(array)
  }

  //Get all rankings from the database
  const getRankings = async () => {
    let games = await getDocs(collection(firestore, 'PlacementsOverview'));
    let data = []
    games.forEach((doc) => {
      data.push(doc.data())
    })
    setPlacements(data)
  }

  //Get all the Sessions from the database
  const getSessions = async () => {
    let games = await getDocs(collection(firestore, 'SessionsOverview'));
    let data = []
    games.forEach((doc) => {
      data.push(doc.data())
    })
    setSessions(data)
    setGameSession(FindMaximum(data.map(x => x.session)))
  }


  //Return numerical maximum of array
  const FindMaximum = (array) => {
    return Math.max.apply(Math, array)
  }

  //Update the graph based on the stat chosen
  const updateGraph = (stat) => {
    let labels = stat.map(item => item.y)
    setShownStat(stat)
    setLabels(labels)
  }

  //Handle whenever a stat is selected
  const HandleSelectStat = (stat) => {
    setShowStats(true)
    setSelectedStat(stat)
    setSelectedStatName(stat.name)
    if (stat.id === 1) {
      updateGraph(numberOfWins)
    } else if (stat.id === 2) {
      updateGraph(winrates)
    } else if (stat.id === 3) {
      updateGraph(averageNumberOfPlayers)
    } else if (stat.id === 4) {
      updateGraph(numberOfSessionsPlayed)
    } else if (stat.id === 5) {
      updateGraph(averagePlacement)
    } else if (stat.id === 6) {
      updateGraph(averageDistanceToLast)
    } else if (stat.id === 7) {
      updateGraph(attendanceRate)
    }
  }

  //Load all the different stats from ../components/stats_calculation
  let LoadStats = () => {
    setAveragePlacement(CalculateAveragePlacement(placements, registeredPlayers))
    setAverageNumberOfPlayers(CalculateAverageNumberOfPlayers(placements, registeredPlayers))
    setBestGameByWins(CalculateBestGameByWins(placements, registeredPlayers))
    setBestGameByWinrate(CalculateBestGameByWinrate(placements, registeredPlayers))
    setBestGameByPlace(CalculateBestGameByPlace(placements, registeredPlayers))
    setMostPlayedGame(CalculateMostPlayedGame(placements, registeredPlayers))
    setNumberOfWins(CalculateNumberOfWins(placements, registeredPlayers))
    setAverageDistanceToLast(CalculateAverageDistanceToLast(placements, registeredPlayers))
    setAttendanceRate(CalculateAttendanceRate(gameSession, placements, registeredPlayers))
    setNumberOfSessionsPlayed(CalculateNumberOfSessionsPlayed(placements, registeredPlayers))
    setWinrates(CalculateWinrates(placements, registeredPlayers))
  }

  return (
    <ImageBackground style={styles.image_background} source={{ uri: 'https://cdn.wallpapersafari.com/78/91/aPClZg.jpg' }}>
      <View style={styles.container}>
        <View>
          <Picker
            style={styles.picker}
            onValueChange={(stat) =>
              HandleSelectStat(stat)
            }>
            {Array.from(selectable_stats, stat => (
              <Picker.Item key={stat.id} label={stat.name} value={stat} />))}
          </Picker>
        </View>
        <View style={styles.title}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }} onPress={() => LoadStats()}>{selectedStatName}</Text>
        </View>
        {showStats && <View>
          <VictoryChart
            height={600}
            domainPadding={20}
            horizontal
            theme={chartTheme}
          >
            <VictoryBar style={{ data: { stroke: '#34d5eb', fill: '#00ccff' } }} data={shownStat} x="x" y="y" />
          </VictoryChart>
        </View>}
      </View>
    </ImageBackground>
  );
}

export default StatsScreen;

//Define the Chart Theme
const chartTheme = {
  axis: {
    style: {
      tickLabels: {
        fill: 'white',
      },
    },
  },
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image_background: {
    paddingTop: '25%',
    flex: 1
  },
  picker: {
    width: '100%',
    height: 80
  },
  title: {
    alignItems: 'center'
  },
})
