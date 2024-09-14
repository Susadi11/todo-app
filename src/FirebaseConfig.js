import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC0363Hdmx887gKoKrkh6Um_dSxtw8_dXA",
  authDomain: "todoapp-5d6ad.firebaseapp.com",
  projectId: "todoapp-5d6ad",
  storageBucket: "todoapp-5d6ad.appspot.com",
  messagingSenderId: "440623405068",
  appId: "1:440623405068:web:5851392e5c91a3b7943629",
  measurementId: "G-NQHMYPHSJF"
};

const app = initializeApp(firebaseConfig);
export { app };
