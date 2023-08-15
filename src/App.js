import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import Footer from './Footer'
import './App.css'
 

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "Hi, This is a Sample Review ,You can Post More",
      date: "15/04/2022",
    },
    {
      id: nanoid(),
      text: "Created By Ashwani Jha",
      date: "21/04/2022",
    },
    {
      id: nanoid(),
      text: "Msi Laptops Hinges are Bad",
      date: "28/04/2023",
    },
    {
      id: nanoid(),
      text: "didn't meet the expectations!",
      date: "30/04/2021",
    },
  ]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className="App">
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        
        />
        
      </div>
    </div>
    <div className="Foot">
      <Footer />
    </div>
    </div>
  );
};

export default App;
