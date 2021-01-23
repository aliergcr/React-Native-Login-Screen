import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

let config = {
  apiKey: '**************',
  authDomain: '**************',
  projectId: '**************',
  storageBucket: '**************',
  messagingSenderId: '**************',
  appId: '**************',
  measurementId: '**************',
};

//firebase.initializeApp(config);
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}

export { firebase, auth };
