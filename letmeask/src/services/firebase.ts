import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCXiFiYLeeorbDjxE4b8-O71zYKP3m5eXg",
    authDomain: "letmeask-6f4cb.firebaseapp.com",
    databaseURL: "https://letmeask-6f4cb-default-rtdb.firebaseio.com",
    projectId: "letmeask-6f4cb",
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  }
  
  firebase.initializeApp(firebaseConfig)

 const auth = firebase.auth()
 const database = firebase.database()

 export { firebase, auth, database }