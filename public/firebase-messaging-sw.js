importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyB6dfdXWNCnIlxDHtsRN3Dc1mfDhLf2wyg",
    authDomain: "webchatnotification.firebaseapp.com",
    databaseURL: "https://webchatnotification.firebaseio.com",
    projectId: "webchatnotification",
    storageBucket: "webchatnotification.appspot.com",
    messagingSenderId: "202412362336",
    appId: "1:202412362336:web:f0201c03d9189d75439105"
});

const messaging = firebase.messaging();

messaging.getToken().then(data=>console.log('serviceworker '+data))

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Notificación del chat';
    const notificationOptions = {
      body: 'Notificación del chat',
      icon: '/favicon.ico'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);

  });


