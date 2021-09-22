import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBabrqoPCMtQ7e6fOmG6e1D52KgjHkgeNY",
  authDomain: "kiosk-23250.firebaseapp.com",
  databaseURL: "https://kiosk-23250-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kiosk-23250",
  storageBucket: "kiosk-23250.appspot.com",
  messagingSenderId: "517586696640",
  appId: "1:517586696640:web:d7972da0c0c38aef3bb025",
  measurementId: "G-ZW6QZT3E6H"
};
      firebase.initializeApp(firebaseConfig);
     
export default firebase;