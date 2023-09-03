import React, { useState } from "react";
import Notecontext from "./Notecontext";

const Notestate = (props) => {
  const Noteintial = [];

  const [Notes, setNotes] = useState(Noteintial);

  const getnotes = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/note/fetchnotes`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "auth-token":localStorage.getItem('token'),
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const json = await response.json();
        setNotes(json);
      } else {
        console.log("Request failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("catch");
      console.log(`error in fetch note ${error}`);
    }
  };
  const addnote = async (Title, Description, Tag) => {
    try {
      const response = await fetch(`http://localhost:8000/api/note/addnotes`, {
        method: "POST",
        mode: "cors",
        headers: {
          "auth-token":localStorage.getItem('token'),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Title, Description, Tag }), // body data type must match "Content-Type" header
      });
      const data = await response.json();
      console.log(data);
      setNotes(Notes.concat(data));
    } catch (error) {
      console.log(`error in add note ${error}`);
    }
  };

  const deletenote = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/note/deletenotes/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "auth-token":localStorage.getItem('token'),
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      const newnote = Notes.filter((ele) => {
        return ele._id !== id;
      });
      setNotes(newnote);
    } catch (error) {
      console.log(`error in try catch deletenote ${error} `);
    }
  };

  const editnote = async (id, Title, Description, Tag) => {
    const response = await fetch(
      `http://localhost:8000/api/note/updatenotes/${id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "auth-token":localStorage.getItem('token'),
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ Title, Description, Tag }), // body data type must match "Content-Type" header
      }
    );
    const data = await response.json();
    // console.log(data);
   let newnotes = JSON.parse(JSON.stringify(Notes))
    for (let index = 0; index < newnotes.length; index++) {
      const element =newnotes[index];
      if (element._id === id) {
        newnotes[index].Title = Title;
        newnotes[index].Description = Description;
        newnotes[index].Tag = Tag;
        break;
      }
    }
    console.log(newnotes);
    setNotes(newnotes);
  };

  return (
    <>

    <Notecontext.Provider
      value={{ Notes, addnote, deletenote, editnote, getnotes }}
    >
      {props.children}
    </Notecontext.Provider>
    </>
  );
};

export default Notestate;
