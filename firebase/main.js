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


// Function to write user data to Firebase Realtime Database
// Function to write user data with unique ID
function writeUserData(userId, name, email) {
  // Create a reference to 'users' collection
  const usersRef = ref(db, 'users/' + userId);

  // push() generates a unique key for the new child
  //const newUserRef = push(usersRef);

  // set() stores the data at that unique location
  set(usersRef, {
    name: name,
    email: email
  })
  .then(() => {
    console.log("User added successfully with ID:", userId);
  })
  .catch((error) => {
    console.error("Error adding user:", error);
  });
}

// Expose the function to the global scope so it can be accessed from HTML (e.g., via button click)
window.writeUserData = writeUserData;


// ref(db, 'users') points to the users path.
// get(userRef) gets the data at that path.
// snapshot.forEach(...) loops over each child node (each user).
// childsnapshot.val() gives the actual data (name and email), which is printed.
function readUser(){
    const userRef = ref(db,'users')
    get(userRef).then((snapshot)=>{
        snapshot.forEach((childsnapshot)=>{
            console.log(childsnapshot.val());
        })
    })
}
//readUser()
window.readUser = readUser;



function updateUserData(userId, updatedData) {
  const userRef = ref(db, 'users/' + userId);
  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}

// Example usage:
//updateUserData();
window.updateUserData = updateUserData;



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

// Example usage:
//deleteUserData(2);
window.deleteUserData = deleteUserData;

