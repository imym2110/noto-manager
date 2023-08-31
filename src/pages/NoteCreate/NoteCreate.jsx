import { NoteAPI } from "api/note-api";
import { Noteform } from "components/NoteForm/Noteform";
import { withAuthRequired } from "hoc/withAuthRequired";

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from "store/notes/notes-slice";

export default function NoteCreate(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (formValues) => {
    const createdNote = await NoteAPI.create({
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    });
    dispatch(addNote(createdNote));
    alert("Note has been created");
    navigate("/");
  };
  return (
    <div>
      <Noteform title="New note" onSubmit={submit} />
    </div>
  );
}
