import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { ProtectedApp } from "App";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import Signin from "pages/Signin/Signin";
import Signup from "pages/Signup/Signup";
import { FireBaseApp } from "services/firebase";
import NoteBrowse from "pages/NoteBrowse/NoteBrowse";
import Note from "pages/Note/Note";
import NoteCreate from "pages/NoteCreate/NoteCreate";
import { PersistGate } from "redux-persist/integration/react";

FireBaseApp.init();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedApp />}>
            <Route path="/" element={<NoteBrowse />} />
            <Route path="/note/:noteId" element={<Note />} />
            <Route path="/note/new" element={<NoteCreate />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
