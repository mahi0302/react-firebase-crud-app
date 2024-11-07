import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD3ufXmin31c7N0cmM7ycAy5T8AKOGEZnI",
    authDomain: "registration-bee42.firebaseapp.com",
    projectId: "registration-bee42",
    storageBucket: "registration-bee42.appspot.com",
    messagingSenderId: "619938973101",
    appId: "1:619938973101:web:c09bedd630f788e60dcd24",
    measurementId: "G-QP1M6SQF27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); 

export default database;
