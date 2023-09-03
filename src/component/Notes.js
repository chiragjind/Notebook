import React, { useEffect, useRef, useState } from "react";
import notecontext from "../context/Notecontext";
import { useContext } from "react";
import Noteitem from "./Noteitem";
import Modalform from './Modalform'
import { useNavigate } from 'react-router-dom'


function Notes() {
    const context = useContext(notecontext)
    const navigate = useNavigate()
    const {Notes,deletenote,getnotes,editnote} = context;
    const [mnote,setmnote]=useState([])
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getnotes();
        }else{
          navigate({ pathname: '/Login' })
        }
     console.log('notes');
    },[])
      
   const ref = useRef(null);
   const refclose = useRef(null);

    const modalshow=(note)=>{
      ref.current.click();
      setmnote(note)
    }
    const handlesubmit=(e)=>{
      e.preventDefault();
      refclose.current.click();
      editnote(mnote._id,mnote.Title,mnote.Description,mnote.Tag)
    }
  return (
   <>
    
    <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
       Launch demo modal
      </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
       <Modalform note={mnote} mnote={mnote} setmnote={setmnote}/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" ref={refclose} data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handlesubmit}>Save changes</button>
      </div>
    </div>
  </div>
</div>
     <div className="row">
        <div className="col-11 mx-auto text-start p-2">
            <h3>Your notes</h3>
          </div>
          <div className="col-11 p-2 mx-auto">
          <div className="row">
          {
            Notes.map((val,index)=>{
                return(
                    <Noteitem key={index} note={val} id={val._id} deletenote={deletenote} modalshow={modalshow} Title={val.Title} desc={val.Description} tag={val.Tag}/>
                );
            })
          }
            </div>
          </div>
        </div>
   </>
  )
}

export default Notes
