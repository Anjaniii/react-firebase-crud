import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAkpRdXzVFWXZvC2oAtCEdXV-bOpLtetrw",
  authDomain: "employee-data-d9331.firebaseapp.com",
  databaseURL: "https://employee-data-d9331-default-rtdb.firebaseio.com",
  projectId: "employee-data-d9331",
  storageBucket: "employee-data-d9331.appspot.com",
  messagingSenderId: "672542227662",
  appId: "1:672542227662:web:7d0cfa0504a8bfa561649f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
