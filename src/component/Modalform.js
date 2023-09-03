import React from "react";

function Modalform(props) {
    const note = props.note;
    const setmnote = props.setmnote;
    // console.log(note);
    const onchange = (e)=>{
        setmnote({...note,[e.target.name]:e.target.value})
     }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-11 mx-auto text-center p-2">
            <h3>Update note</h3>
          </div>
          <div className="col-11 mx-auto p-2">
            <form>
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
                  value={note.Title?note.Title:""}
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
                  minLength={"10"}
                  value={note.Description?note.Description:""}
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
                  value={note.Tag?note.Tag:""}
                  onChange={onchange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modalform;
