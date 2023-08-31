import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { FireBaseApp } from "services/firebase";

export class NoteAPI {
  static async create(formValues) {
    const response = await addDoc(
      collection(FireBaseApp.db, "notes"),
      formValues
    );
    return {
      id: response.id,
      ...formValues,
    };
  }
  static async fetchAll() {
    const q = query(
      collection(FireBaseApp.db, "notes"),
      orderBy("created_at", "asc")
    );
    const response = await getDocs(q);
    console.log("=====>...", response);
    return response.docs.map((document) => {
      return {
        id: document.id,
        ...document.data(),
      };
    });
  }
  static async deleteById(noteId) {
    console.log("--->", noteId);
    await deleteDoc(doc(FireBaseApp.db, "notes", noteId));
  }
  static async updateById(id, values) {
    const query = doc(FireBaseApp.db, "notes", id);
    await updateDoc(query, values);
    return {
      id,
      ...values,
    };
  }

  static onShouldSyncNotes(onChange) {
    const q = query(collection(FireBaseApp.db, "notes"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
      if (!isUserPerformingChange) {
        console.log("You are not synced with note collection");
        onChange();
      }
    });
    return unsub();
  }
}
