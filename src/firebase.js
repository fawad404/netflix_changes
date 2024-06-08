import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCnaom34cPAfNCqH1lRLZukjOTxVmJz50w",
    authDomain: "netflix-873af.firebaseapp.com",
    projectId: "netflix-873af",
    storageBucket: "netflix-873af.appspot.com",
    messagingSenderId: "425019802321",
    appId: "1:425019802321:web:6d3e13af7c5c4c69407bf0",
    measurementId: "G-9FC1RS9PNX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);