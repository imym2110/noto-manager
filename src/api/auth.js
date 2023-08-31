import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FireBaseApp } from "services/firebase";

export class AuthAPI {
  static async signin(email, password) {
    const response = await signInWithEmailAndPassword(
      FireBaseApp.auth,
      email,
      password
    );
    return response.user.toJSON();
  }
  static async signup(email, password) {
    const response = await createUserWithEmailAndPassword(
      FireBaseApp.auth,
      email,
      password
    );
    return response.user.toJSON();
  }
  static async signout() {
    signOut(FireBaseApp.auth);
  }
}
