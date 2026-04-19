// Import Firebase SDK (same version used in the firebase folder)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js";

// Firebase configuration (same project as firebase/main.js)
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
const db = getDatabase(app);

// Handle form submission
const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Create a new unique reference under 'contact-messages'
  const messagesRef = ref(db, "contact-messages");
  const newMessageRef = push(messagesRef);

  set(newMessageRef, {
    name: name,
    email: email,
    message: message,
    timestamp: new Date().toISOString()
  })
  .then(() => {
    status.style.color = "green";
    status.textContent = "Message sent successfully!";
    form.reset();
  })
  .catch((error) => {
    status.style.color = "red";
    status.textContent = "Failed to send message. Please try again.";
    console.error("Error saving message:", error);
  });
});
