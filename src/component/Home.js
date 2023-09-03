import React from "react";
import Notess from "./Notes";
import Addnote from "./Addnote";

function Home() {
  
  return (
    <>
      <div className="container-fluid">
      <Addnote/>
       <Notess />
      </div>
    </>
  );
}

export default Home;
