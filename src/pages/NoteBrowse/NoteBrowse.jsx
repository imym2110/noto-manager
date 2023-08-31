import SearchBar from "components/SearchBar/SearchBar";
import TextCard from "components/TextCard/TextCard";
import NoteList from "containers/NoteList";
import { withAuthRequired } from "hoc/withAuthRequired";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NoteBrowse(props) {
  const noteList = useSelector((store) => store.noteSlice.noteList);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredNoteList = noteList.filter((note) => {
    const containsTitle = note.title
      .trim()
      .toUpperCase()
      .includes(searchTerm.trim().toUpperCase());
    return containsTitle;
  });
  return (
    <>
      <div className="row justify-content-center mb-5">
        <div className="col-sm-12 col-md-4">
          <SearchBar
            onTextChange={setSearchTerm}
            placeholder="Search your notes..."
          />
        </div>
        {noteList?.length === 0 && (
          <div className="d-flex justify-content-center mt-5">
            <span>
              You don't have any note, do you want to{" "}
              <Link to="/note/new">Create one</Link>
            </span>
          </div>
        )}
        <NoteList noteList={filteredNoteList} />
      </div>
    </>
  );
}
