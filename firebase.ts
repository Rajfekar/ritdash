// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyABbMcBiVabc_91NKqolJciQW-KPBWDXj0",
  authDomain: "ritlibrary-da2d9.firebaseapp.com",
  projectId: "ritlibrary-da2d9",
  storageBucket: "ritlibrary-da2d9.appspot.com",
  messagingSenderId: "27695929897",
  appId: "1:27695929897:web:feb5c855f894662a739a38",
  measurementId: "G-ZD3NESB99Y",
}

// Initialize Firebase
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const firestore = getFirestore()
const storage = getStorage()
export { app, firestore, storage }
