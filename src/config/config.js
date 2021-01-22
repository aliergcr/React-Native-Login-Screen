import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// let config = {
//   apiKey: process.env.REACT_APP_FIRE_BASE_KEY,
//   authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
//   // databaseURL: process.env.REACT_APP_FIRE_BASE_DB_URL,
//   projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIRE_BASE_MEASURMENT_ID,
// };
let config = {
  apiKey: 'AIzaSyDB6Rs94qZ1ke0XKsWOTfqSZghWQzH0u0g',
  authDomain: 'sillion-aa6df.firebaseapp.com',
  projectId: 'sillion-aa6df',
  storageBucket: 'sillion-aa6df.appspot.com',
  databaseURL: 'https://sillion-aa6df-default-rtdb.firebaseio.com',
  messagingSenderId: '440334477324',
  appId: '1:440334477324:web:cdc428ec2c41747249a629',
  measurementId: 'G-781Q9LW8GS',
};

//firebase.initializeApp(config);
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}

export { firebase, auth, database };
