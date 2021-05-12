import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDLjREGQ03eEAGhtSUpNT0f8cndkGJDE-U",
    authDomain: "chatapp-2e736.firebaseapp.com",
    projectId: "chatapp-2e736",
    storageBucket: "chatapp-2e736.appspot.com",
    messagingSenderId: "371122171235",
    appId: "1:371122171235:web:3dba8e3ef1127017e9f756"
  };

  let app ;
   if(firebase.apps.length === 0){
    app =   firebase.initializeApp(firebaseConfig);
   }
   else{
    app= firebase.app()
   }
   const db = app.firestore();
   const auth = firebase.auth();
   export {db, auth}




