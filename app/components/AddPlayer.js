import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import AppButton from './AppButton'
import EntryForm from './EntryForm'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import firestore from '../../firebase';

const AddPlayer = () => {

   let [newPlayer, setNewPlayer] = useState([])
   let [oldPlayers, setOldPlayer] = useState([])

   useEffect(() => {
      getPlayers()
   }, []) 

   let getPlayers = async () => {
      let players = await getDocs(collection(firestore, 'Players'));
      let result = []
      players.forEach((doc) => {
          result.push(doc.data().player)
      })
      setOldPlayer(result)
   }

   let createPlayer = async () => {
      const docRef = await addDoc(collection(firestore, 'Players'), {
         player: newPlayer
      })
   }

   let handleSubmit = () => {
      if (oldPlayers.map(a => a.toLowerCase()).includes(newPlayer.toLowerCase())) {
         Alert.alert('Not a new player!', newPlayer + ' is already in the Database')
      } else {
         Alert.alert('Successfull Submit', 'Thank you for submitting ' + newPlayer)
         createPlayer()
         setOldPlayer((oldPlayers) => ([...oldPlayers, newPlayer]));
      }
   }

   return (
      <View style = {styles.container}>
         <View style = {{}}>
            <EntryForm
               onChangeText = {(text) => setNewPlayer(text)}
               placeholder = 'Name of the Player' />
         </View>
         <View style = {styles.button}>
            <AppButton 
               onPress = {
                  () => handleSubmit()
               }
               text='Submit Player'

               width='90%'
               />
         </View>
         <View style = {styles.title_view}>
            <Text style = {styles.title_text}
            >List of registered Players</Text>
         </View>
         <View style = {styles.game_list_view}>
            {oldPlayers.sort().map((item, key) => (
               <Text key={key} style={styles.game_list_text}> {item} </Text>
            ))}
         </View>
      </View>
   )  
}


export default AddPlayer


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