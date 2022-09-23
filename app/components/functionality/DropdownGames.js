import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import AppButton from '../utilities/general/AppButton';
import { collection, addDoc, getDocs } from "firebase/firestore";
import firestore from '../../../firebase';
import EntryForm from '../utilities/general/EntryForm'
import { Picker } from '@react-native-picker/picker';



const DropdownGames = () => {

  //Initialize States
  let [playedGame, setPlayedGame] = useState('Choose your Game')
  let [oldGamesNames, setOldGamesNames] = useState([])
  let [numberOfPlayers, setNumberOfPlayers] = useState(0)
  let [oldPlayers, setOldPlayer] = useState([])
  let [gameSession, setGameSession] = useState(1)
  let [showNumberOfPlayers, setShowNumberOfPlayers] = useState(false)
  let [showPlacements, setShowPlacements] = useState(false)
  let [showButton, setShowButton] = useState(false)
  let [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])
  let [players, setPlayers] = useState(['', '', '', '', '', '', ''])
  let [comments, setComments] = useState('')


  var items = [{ id: 2, numberofplayers: '2' }, { id: 3, numberofplayers: '3' }, { id: 4, numberofplayers: '4' }, { id: 5, numberofplayers: '5' }, { id: 6, numberofplayers: '6' }, { id: 7, numberofplayers: '7' }]

  useEffect(() => {
    {
      getPlayers();
      getGameSession();
      getGames()
    }
  }, [])

  //Load all the Players from the Database
  let getPlayers = async () => {
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
    setOldPlayer(array)
  }

  //Load all the Games from the Database
  let getGames = async () => {
    let games = await getDocs(collection(firestore, 'Games'));
    let data = []
    games.forEach((doc) => {
      data.push(doc.data().game)
    })
    data = data.sort()
    let array = []
    for (let i = 0; i < data.length; i++) {
      let game_object = {
        id: i,
        game: data[i]
      }
      array.push(game_object)
    }
    setOldGamesNames(array)
  }

  //Load all the Game Sessions
  let getGameSession = async () => {
    let games = await getDocs(collection(firestore, 'PlacementsOverview'));
    let data = []
    games.forEach((doc) => {
      data.push(doc.data())
    })
    if (data.length != 0) {
      setGameSession(FindMaximum(data.map(x => x.session)))
    } else {
      setGameSession(1)
    }
  }

  //Find the Maximum out of an array
  let FindMaximum = (array) => {
    return Math.max.apply(Math, array)
  }

  //Calculate the Placement based on the points per Player
  let CalculatePlacement = () => {
    let sorted_points = points.slice(0).sort((a, b) => b - a)
    let placements = []
    for (let i = 0; i < points.length; i++) {
      let placement = sorted_points.indexOf(points[i]) + 1
      placements.push(placement)
    }
    return placements
  }

  //Handle the Changing of Points
  let handleChangePoints = (number, key) => {
    let current_points = points
    current_points[key] = number
    setPoints(current_points)
  }

  //Handle the Changing of Comments
  let handleChangeComments = (string) => {
    setComments(string)
  }

  //Fill the current_rankings with game, numberofplayer, placement and session
  let handleSubmitButton = () => {
    let real_players = []
    for (let i = 0; i < players.length; i++) {
      if (players[i] != '') {
        real_players.push(players[i])
      }
    }

    let uniqueSelectedPlayers = real_players.filter((item, index) => real_players.indexOf(item) === index)
    if (real_players.length < numberOfPlayers) {
      Alert.alert('Missing Players', 'You have selected that ' + numberOfPlayers + ' Players have played, but you only filled in ' + real_players.length + ' Players!')
    }
    else if (real_players.length > numberOfPlayers) {
      Alert.alert('Too many Players', 'You have placed ' + real_players.length + ' Players, but only ' + numberOfPlayers + ' have played. Try again!')
    }
    else if (real_players.length > uniqueSelectedPlayers.length) {
      Alert.alert('Same Player twice', 'You have selected a Player twice')
    }
    else if (points.slice(0, numberOfPlayers).includes('')) {
      Alert.alert('Forgotten Points', 'Atleast one Player was given no points')
    }
    else {
      let current_date = new Date()
      let current_rankings = []
      let placements = CalculatePlacement()
      for (let i = 0; i < real_players.length; i++) {
        let rankings_object = {
          game: playedGame,
          numberofplayers: numberOfPlayers,
          placement: placements[i],
          player: real_players[i],
          points: points[i],
          session: gameSession,
          date: current_date.getDate().toString() + '/' + current_date.getMonth().toString() + '/' + current_date.getFullYear().toString(),
        }
        current_rankings.push(rankings_object)
      }
      current_rankings = current_rankings.sort((a, b) => a.placement - b.placement)
      let string_alert = ''
      for (let i = 0; i < current_rankings.length; i++) {
        string_alert = string_alert + (i + 1).toString() + '. Place: ' + current_rankings[i].player + ' with ' + current_rankings[i].points + ' Points' + '\n'
      }
      Alert.alert('You choose the following', 'Game: ' + playedGame + '\n' + string_alert + '\nDo you confirm?',
        [
          {
            text: 'YES', onPress: () => {
              createRankings(current_rankings);
              CreateSessionOverview(current_rankings);
              setGameSession(currGameSession => currGameSession + 1)
            }
          },
          { text: 'NO' }
        ]
      )
    }
  }

  //Handle the Submit of a Game
  let handleSubmitGame = (item) => {
    if (item != 0) {
      setPlayedGame(item);
      setShowNumberOfPlayers(true);
    }
  }

  //Handle the Submit of number of Players
  let handleSubmitNumberOfPlayers = (item) => {
    if (item != 0) {
      if (players.length > item) {
        let new_players = players
        let new_points = points
        for (let i = players[players.length - 1]; i > item; i--) {
          new_players[i] = ''
          new_points[i] = 0
        }
        setPlayers(new_players);
        setPoints(new_points);
      }
      setNumberOfPlayers(item);
      setShowPlacements(true);
    }
  }

  //Handle the Submit of Player
  let handleSubmitPlayer = (player, key) => {
    if (player != 0) {
      let current_players = players
      current_players[key] = player
      if (!current_players.slice(0, numberOfPlayers).includes('')) {
        setShowButton(true)
      }
      setPlayers(current_players)
    }
  }

  //Add the Inputs to the Database, one row for each player
  let createRankings = async (current_rankings) => {
    for (let i = 0; i < current_rankings.length; i++) {
      let row = current_rankings[i]
      const docRef = await addDoc(collection(firestore, 'PlacementsOverview'), row)
    }
  }

  //Add the Inputs to the Database, one row for each Gaming Session
  let CreateSessionOverview = async (current_rankings) => {
    let current_date = new Date()
    let session_overview = {
      game: playedGame,
      players: current_rankings.map(x => x.player),
      points: current_rankings.map(x => x.points),
      session: gameSession,
      comments: comments,
      date: current_date.getDate().toString() + '/' + current_date.getMonth().toString() + '/' + current_date.getFullYear().toString(),
    }
    const docRef = await addDoc(collection(firestore, 'SessionsOverview'), session_overview)
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxes}>
        <View style={{ alignItems: 'center' }}>
          <Picker
            selectedValue={playedGame}
            style={styles.picker}
            onValueChange={(item) => {
              handleSubmitGame(item);
            }}
          >
            <Picker.Item label={'Select Board Game'} value={0} />
            {Array.from(oldGamesNames, item => (
              <Picker.Item key={item.id} label={item.game} value={item.game} />))}
          </Picker>
        </View>
      </View>
      {showNumberOfPlayers && <View style={styles.boxes}>
        <View style={{ alignItems: 'center' }}>
          <Picker
            selectedValue={numberOfPlayers.toString()}
            style={styles.picker}
            onValueChange={(item) => { handleSubmitNumberOfPlayers(parseInt(item)) }}
          >
            <Picker.Item label={'Select Number of Players'} value={0} />
            {Array.from(items, item => (
              <Picker.Item key={item.id} label={item.numberofplayers} value={item.numberofplayers} />))}
          </Picker>
        </View>
      </View>}
      {showPlacements && <View style={styles.boxes}>
        {Array.from({ length: numberOfPlayers }, (_, i) => i + 1).map((item, key) => (
          <View key={key} style={styles.placements}>
            <View style={styles.placements_choices}>
              <Picker
                onValueChange={(player) => handleSubmitPlayer(player, key)}
                selectedValue={players[key]}
              >
                <Picker.Item key={100 * key} label={'Please select ' + item + '. Place'} value={0} />
                {Array.from(oldPlayers, x => (
                  <Picker.Item key={100 * key + x.id} label={x.player} value={x.player} />))}
              </Picker>
            </View>
            <View style={styles.points}>
              <TextInput
                keyboardType="numeric"
                onChangeText={(number) => handleChangePoints(parseInt(number), key)}
                placeholder='Points'
              />
            </View>
          </View>))}
      </View>}
      {showButton && <View style={{ paddingTop: 25 }}>
        <View style={{}}>
          <EntryForm onChangeText={(string) => handleChangeComments(string)} placeholder='Comments'>

          </EntryForm>
        </View>
        <View style={styles.button}>
          <AppButton
            onPress={() => handleSubmitButton()}
            text='Submit'
            width='90%' />
        </View>
      </View>}
    </View>
  );
}

export default DropdownGames;

const styles = StyleSheet.create({
  boxes: {
    borderColor: 'black',
    borderRadius: 5
  },
  button: {
    alignItems: 'center',
    padding: 20
  },
  container: {
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '70%'
  },
  picker_place: {
    height: 50,
    flex: 1
  },
  placements: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  placements_choices: {
    width: '75%',
    height: 40
  },
  points: {
    width: '25%',
    height: 40
  },
  text: {
    alignItems: 'center'
  },
  titles: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
