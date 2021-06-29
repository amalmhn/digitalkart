import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBs3QmUdHB81634aE1VCUB_MgHTbiU6L_U",
    authDomain: "digitalkart-1785a.firebaseapp.com",
    projectId: "digitalkart-1785a",
    storageBucket: "digitalkart-1785a.appspot.com",
    messagingSenderId: "890162203335",
    appId: "1:890162203335:web:cb37e4da03dcd563160ce2",
    measurementId: "G-J4K55B59VZ"
  };

export default firebase.initializeApp(firebaseConfig)