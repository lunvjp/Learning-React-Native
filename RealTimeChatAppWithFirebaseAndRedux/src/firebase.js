import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBz455Y8EoqnzqYmdjm5HyKCruw_G1EpZk",
  authDomain: "wedrive-1527435684187.firebaseapp.com",
  databaseURL: "https://wedrive-1527435684187.firebaseio.com",
  projectId: "wedrive-1527435684187",
  storageBucket: "wedrive-1527435684187.appspot.com",
  messagingSenderId: "521411552255"
};

firebase.initializeApp(config);
export default firebase;