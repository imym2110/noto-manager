import { NoteAPI } from "api/note-api";
import { Noteform } from "components/NoteForm/Noteform";
import { withAuthRequired } from "hoc/withAuthRequired";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { deleteNote, updateNote } from "store/notes/notes-slice";

export default function Note(props) {
  const { noteId } = useParams();
  const note = useSelector((store) =>
    store.noteSlice.noteList.find((note) => note.id === noteId)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const submit = async (formValues) => {
    const updatedNote = await NoteAPI.updateById(note.id, formValues);
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
  };

  async function deleteNote_() {
    if (window.confirm("Delete Note ?")) {
      NoteAPI.deleteById(note.id);
      dispatch(deleteNote(note));
      navigate("/");
    }
  }
  return (
    <>
      {note && (
        <Noteform
          isEditable={isEditable}
          title={isEditable ? "Edit Note" : note.title}
          note={note}
          onClickDelete={deleteNote_}
          onClickEdit={() => setIsEditable(!isEditable)}
          onSubmit={isEditable && submit}
        />
      )}
    </>
  );
}
