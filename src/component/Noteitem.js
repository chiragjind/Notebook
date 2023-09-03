import React from 'react'

function Noteitem(props) {
  return (
    <>
    <div className="col-md-4 col-6 ps-3 py-3">
    <div className="card" style={{width:"20rem"}}>
   <div className="card-body">
    <h5 className="card-title">{props.Title}</h5>
    <p className="card-text">{props.desc}</p>
    <h6 className="card-subtitle mb-2 text-body-secondary">{props.tag}</h6>
    <i className="fa-solid fa-trash me-2" onClick={()=>{props.deletenote(props.id)}}></i>
    <i className="fa-solid fa-pen-fancy" onClick={()=>{props.modalshow(props.note)}} ></i>
    </div>
      </div>
    </div>
    </>
  )
}

export default Noteitem
