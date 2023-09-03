import React, { useState } from "react";
import notecontext from "../context/Notecontext";
import { useContext } from "react";


export default function Addnote() {
    const context = useContext(notecontext)
    const {addnote} = context;
    const [Note,setNote]=useState({Title:"",Description:"",Tag:""})

    const onchange = (e)=>{
       setNote({...Note,[e.target.name]:e.target.value})
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        //  console.log('hi')
        addnote(Note.Title,Note.Description,Note.Tag);
    }

    
  return (
    <>  
       
         <div className="row">
          <div className="col-11 mx-auto text-center p-2">
            <h3>Add Note</h3>
          </div>
          <div className="col-11 mx-auto p-2">
            <form onSubmit={handlesubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fs-5 ">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control p-2 fs-5 "
                  autoCorrect="off"
                
                  id="title"
                  name="Title"
                  aria-describedby="emailHelp"
                  required={true}
                  value={Note.Title}
                  minLength={"4"}
                  onChange={onchange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label fs-5">
                  Description
                </label>
                <input
                  type="text"
                  autoCorrect="off"
                
                  className="form-control p-2 fs-4"
                  id="description"
                  name="Description"
                  required={true}
                  value={Note.Description}
                  minLength={"10"}
                  onChange={onchange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label fs-5">
                  Tag
                </label>
                <input
                  type="text"
                  autoCorrect="off"
                
                  className="form-control p-2 fs-4"
                  id="tag"
                  name="Tag"
                  value={Note.Tag}
                  onChange={onchange}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input p-2 bg-dark"
                  id="exampleCheck1"
                  required={true}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button type="submit"  className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
    </>
  )
}
