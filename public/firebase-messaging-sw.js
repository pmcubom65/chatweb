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

//messaging.getToken().then(data=>console.log('serviceworker '+data))

messaging.onBackgroundMessage(function(payload) {


    const notificationTitle = payload.data.nombreemisor;
    const notificationOptions = {
      body: payload.data.titulo,
      icon: payload.data.fotoemisor
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);


/*  const laurl= payload.data.click_action;

  if (Notification.permission === "granted") {
    var notification = new Notification(notificationTitle,notificationOptions);
    notification.onclick = function(event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open(laurl , '_blank');
        notification.close();

  }


}*/





  });


