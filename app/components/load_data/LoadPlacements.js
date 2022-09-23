import firestore from '../../../firebase';
import { collection, getDocs } from "firebase/firestore";


//Get all rankings from the database
let loadPlacements = async () => {
    let games = await getDocs(collection(firestore, 'PlacementsOverview'));
    let data = []
    games.forEach((doc) => {
        data.push(doc.data())
    })
    return data
}

export default loadPlacements;