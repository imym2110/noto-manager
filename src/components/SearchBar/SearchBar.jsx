import Input from "components/Input/Input";
import s from "./style.module.css";
import React from "react";
import { Search as SearchIcon } from "react-bootstrap-icons";

export default function SearchBar({ onTextChange, placeholder }) {
  return (
    <>
      <SearchIcon size={25} className={s.icon} />
      <Input onTextChange={onTextChange} placeholder={placeholder} />
    </>
  );
}
