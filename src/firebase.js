import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB6dfdXWNCnIlxDHtsRN3Dc1mfDhLf2wyg",
  authDomain: "webchatnotification.firebaseapp.com",
  databaseURL: "https://webchatnotification.firebaseio.com",
  projectId: "webchatnotification",
  storageBucket: "webchatnotification.appspot.com",
  messagingSenderId: "202412362336",
  appId: "1:202412362336:web:f0201c03d9189d75439105"
};

var fire = firebase.initializeApp(config);
export default fire;

//https://www.freecodecamp.org/news/how-to-add-push-notifications-to-a-web-app-with-firebase-528a702e13e1/


