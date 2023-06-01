import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app.tsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOihV_ycWc7D_JPcyEFzttQgdmwcsfPno",
  authDomain: "my-2023-blog-project.firebaseapp.com",
  projectId: "my-2023-blog-project",
  storageBucket: "my-2023-blog-project.appspot.com",
  messagingSenderId: "806114340193",
  appId: "1:806114340193:web:1a839deda19f0a59e3e920",
  measurementId: "G-7SDF7QTF2S"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
