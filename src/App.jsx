import { NoteAPI } from "api/note-api";
import Header from "components/Header/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setNoteList } from "store/notes/notes-slice";
import s from "./style.module.css";
import { withAuthRequired } from "hoc/withAuthRequired";
import ButtonPrimary from "components/ButtonPrimary/ButtonPrimary";

export function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function fetchAllNotes() {
    const noteList = await NoteAPI.fetchAll();
    console.log("=====>", noteList);
    dispatch(setNoteList(noteList));
  }
  useEffect(() => {
    const unsub = NoteAPI.onShouldSyncNotes(fetchAllNotes);
    return () => {
      unsub();
    };
  }, []);
  return (
    <div>
      <Header />
      {/* <button
        onClick={() => {
          NoteAPI.deleteById("2zAacU2P4kFdYBrni3EA");
        }}
      >
        Delete
      </button> */}
      <ButtonPrimary
        className={s.buttonAdd}
        onClick={() => navigate("/note/new")}
      >
        +
      </ButtonPrimary>
      <div className={s.workspace}>
        <Outlet />
      </div>
    </div>
  );
}

export const ProtectedApp = withAuthRequired(App);
