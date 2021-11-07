import {firestore} from '../FirebaseApp';
import auth from '@react-native-firebase/auth';

export function createNewUser(email, password, username) {
  // auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then(user => {
  //     console.log('new user created');
  //     firestore()
  //       .collection('users')
  //       .add({
  //         email,
  //         username,
  //       })
  //       .then(console.log('user document created'))
  //       .catch(e => console.log('could not create user document', e));
  //   })
  //   .catch(error => {
  //     console.log('ERROR: could not create new users  ', error);
  //   });
}
