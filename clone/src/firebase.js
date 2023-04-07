import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBK7nvA3bMNswA9Ro2wg3TGFxvKTaRZ_2M",
  authDomain: "whatsapp-mern-40ca4.firebaseapp.com",
  projectId: "whatsapp-mern-40ca4",
  storageBucket: "whatsapp-mern-40ca4.appspot.com",
  messagingSenderId: "841214755162",
  appId: "1:841214755162:web:859dbb8d000b52cfa4b363",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };