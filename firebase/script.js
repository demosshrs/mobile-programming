  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
  import { getDatabase, set, get, ref, update, remove, push } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbJsUUrXWgbizflKkfWeSgrs8GeRxjxgk",
  authDomain: "mobile-programming-ed154.firebaseapp.com",
  databaseURL: "https://mobile-programming-ed154-default-rtdb.firebaseio.com",
  projectId: "mobile-programming-ed154",
  storageBucket: "mobile-programming-ed154.firebasestorage.app",
  messagingSenderId: "524985634079",
  appId: "1:524985634079:web:c05d9f67d13567448ef42a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

    const db = getDatabase(app)

console.log(db)




//Function to write user data to Firebase Realtime Database
// function writeUserData(userId, firstname, lastname) {
//     // Get the database instance
//     // const db = getDatabase();
  
//     // Create a reference/points to 'users/{userId}' and set the data (name and email)
 //set(ref(db, 'users/' + userId), {
//       firstname: firstname,      
//       lastname: lastname,
      
//     });
//   }
//writeUserData(2, "Abiral", "Khanal")

// ref(db, 'users') points to the users path.
// get(userRef) gets the data at that path.
// snapshot.forEach(...) loops over each child node (each user).
// childsnapshot.val() gives the actual data (name and email), which is printed.
// function readUser(){
//     const userRef = ref(db,'users')

//     get(userRef).then((snapshot)=>{
//         snapshot.forEach((childsnapshot)=>{
//             console.log(childsnapshot.val());
//         })
//     })
// }
// readUser()


// function updateUserData(userId, updatedData) {
//   const userRef = ref(db, 'users/' + userId);
//   update(userRef, updatedData)
//     .then(() => {
//       console.log("User updated successfully");
//     })
//     .catch((error) => {
//       console.error("Error updating user:", error);
//     });
// }
// // Example usage:
// updateUserData(2, {firstname: "Abi", lastname: "Khanal"});




function deleteUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

// // // // // // // Example usage:
deleteUserData(2);

// //console.log("Added! Good")

