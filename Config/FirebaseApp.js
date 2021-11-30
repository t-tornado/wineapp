import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const AppConfig = {
  apiKey: 'AIzaSyCvxTKFX5wWC1riUTlxQH6F4-Q8HKd4j0E',
  authDomain: 'wine-app-afa00.firebaseapp.com',
  projectId: 'wine-app-afa00',
  storageBucket: 'wine-app-afa00.appspot.com',
  messagingSenderId: '438261332793',
  appId: '1:438261332793:web:4b083da29a078ed6dac6e8',
  measurementId: 'G-MZ60SQL3HJ',
};

const config = {
  name: 'KWineFo Config',
};

!firebase.app.length === 0
  ? firebase.initializeApp(AppConfig, config)
  : firebase.app();

const AppUser = firebase.auth(firebase.app());
export {AppUser};
export {firestore};
export {firebase};
