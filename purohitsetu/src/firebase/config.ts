import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBR24c574p1u9L9HfZtHezI7egvwT9Ol1I',
  authDomain: 'mobile-programming-56d67.firebaseapp.com',
  databaseURL: 'https://mobile-programming-56d67-default-rtdb.firebaseio.com',
  projectId: 'mobile-programming-56d67',
  storageBucket: 'mobile-programming-56d67.firebasestorage.app',
  messagingSenderId: '417693992122',
  appId: '1:417693992122:web:d0362fef125622d71eae83',
  measurementId: 'G-CFBX0HVX9R',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app, firebaseConfig.databaseURL);
export const auth = getAuth(app);
