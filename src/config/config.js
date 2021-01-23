import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

let config = {
  apiKey: 'AIzaSyA84kGIeM9kq5GS1oNoUyhCfas51ERM4gA',
  authDomain: 'loginapp-ab6a6.firebaseapp.com',
  projectId: 'loginapp-ab6a6',
  storageBucket: 'loginapp-ab6a6.appspot.com',
  messagingSenderId: '439000684413',
  appId: '1:439000684413:web:d1d00bcd341df6af169e14',
  measurementId: 'G-4RQQ2E23WG',
};

//firebase.initializeApp(config);
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}

export { firebase, auth };
