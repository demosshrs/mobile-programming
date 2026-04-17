  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
  import {getDatabase, set, ref} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBbJsUUrXWgbizflKkfWeSgrs8GeRxjxgk",
    authDomain: "mobile-programming-ed154.firebaseapp.com",
    projectId: "mobile-programming-ed154",
    storageBucket: "mobile-programming-ed154.firebasestorage.app",
    messagingSenderId: "524985634079",
    appId: "1:524985634079:web:c05d9f67d13567448ef42a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app)
  console.log(db)

  function writeUserData(userId, firstname, lastname){
    set(ref(db,'users/' + userId),{
      firstname: firstname,
      lastname: lastname
    });
  }

    writeUserData(1, "Demos", "Shrestha")

