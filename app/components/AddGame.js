import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import AppButton from './AppButton'
import EntryForm from './EntryForm'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import firestore from '../../firebase';

const AddGame = () => {

   let [newGame, setNewGame] = useState([])
   let [oldGamesNames, setOldGamesNames] = useState([])

   useEffect(() => {
      getGames()
   }, []) 

   let getGames = async () => {
      let games = await getDocs(collection(firestore, 'Games'));
      let result = []
      games.forEach((doc) => {
          result.push(doc.data().game)
      })
      setOldGamesNames(result)
   }

   let createGame = async () => {
      const docRef = await addDoc(collection(firestore, 'Games'), {
         game: newGame
      })
   }

   let handleSubmit = () => {
      if (oldGamesNames.map(a => a.toLowerCase()).includes(newGame.toLowerCase())) {
         Alert.alert('Not a new game!', newGame + ' is already in the Database')
      } else {
         Alert.alert('Successful Submit', 'Thank you for submitting ' + newGame)
         createGame()
         setOldGamesNames((oldGamesNames) => ([...oldGamesNames, newGame]));
      }
   }

   return (
      <View style = {styles.container}>
         <View style = {{}}>
            <EntryForm
               onChangeText = {(text) => setNewGame(text)}
               placeholder = 'Name of the Board Game' />
         </View>
         <View style = {styles.button}>
            <AppButton 
               onPress = {
                  () => handleSubmit()
               }
               text='Submit Game'

               width='90%'
               />
         </View>
         <View style = {styles.title_view}>
            <Text style = {styles.title_text}
            >List of registered Games</Text>
         </View>
         <View style = {styles.game_list_view}>
            {oldGamesNames.sort().map((item, key) => (
               <Text key={key} style={styles.game_list_text}> {item} </Text>
            ))}
         </View>
      </View>
   )  
}


export default AddGame


const styles = StyleSheet.create({
   button: {
      alignItems: 'center',
      padding:20
   },
   container: {
      paddingTop: 23
   },
   game_list_view: {
      alignItems: 'center'
   },
   game_list_text: {
      fontSize: 15
   },
   title_text: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingBottom: 10
   },
   title_view: {
      alignItems: 'center'
   }
})