import { firebaseConfig } from "config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export class FireBaseApp {
  static firebaseApp = undefined;
  static auth = undefined;
  static db = undefined;
  static init() {
    this.firebaseApp = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getFirestore(this.firebaseApp);
  }
}
