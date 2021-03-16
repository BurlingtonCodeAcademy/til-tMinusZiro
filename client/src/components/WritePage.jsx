import React from "react";
import { useState, useEffect } from "react";

const WritePage = (props) => {
  //---------------state-----------------//
  const [viewEdit, setViewEdit] = useState("hidden");
  const [viewDelete, setViewDelete] = useState("hidden");
  //journal entry content//
  //complete object containing journal entry
  const [editEntry, setEditEntry] = useState(null);
  //state containing just the title for entry
  const [editTitle, setEditTitle] = useState();
  //state containing just the body section of the entry
  const [editText, setEditText] = useState();
  //state containing just the author for entry
  const [editAuthor, setEditAuthor] = useState();
  //state containing just the tags for the entry
  const [editTags, setEditTags] = useState([]);
  //intermediate variable for pushing tags into
  let interTagArray = [];

  //fetch wrapped in a useEffect hook to constantly update journal entry
  useEffect(() => {
    if (!editEntry) {
      fetch(`/journal/${props.match.params.id}`)
        .then((res) => res.json())
        .then((entry) => {
          setEditEntry(entry);
          setEditAuthor(entry.author);
          setEditText(entry.text);
          setEditTitle(entry.title);
          setEditTags(entry.tag);
        });
    }
  });

  //function for filling any tag checkboxes that were previously selected for the entry
  function checkTagsTwo(str) {
    if (editTags) {
      //I acknowledge this is an inefficient way to solve the problem since I don't really need a for of loop
      //to auto-check tags that were previously selected => will refactor later
      for (let tag of editTags) {
        let answer = editTags.includes(str) ? true : false;
        return answer;
      }
    }
  }

  //toggles the edit form modal
  function displayEditModal() {
    viewEdit === "hidden" ? setViewEdit("visible") : setViewEdit("hidden");
  }
  //toggles the delete button modal
  function displayDeleteModal() {
    viewDelete === "hidden"
      ? setViewDelete("visible")
      : setViewDelete("hidden");
  }

  return (
    <div>
      {/*Main section title that serves has two toggle buttons to reveal the edit form or delete button */}
      <h2 id="write-section-title">
        <span id="edit-modal" onClick={displayEditModal}>
          Edit
        </span>{" "}
        or{" "}
        <span id="delete-modal" onClick={displayDeleteModal}>
          Delete
        </span>
      </h2>
      {/*Selected Journal Entry to edit*/}
      <section id="write-page-wrapper">
        <div id="edit-page-entry">
          <h2>
            <span className="readPg-entry-category">Title:&nbsp;</span>
            {editEntry ? editEntry.title : "Loading"}
          </h2>
          <h3>
            <span className="readPg-entry-category">By:&nbsp;</span>
            {editEntry ? editEntry.author : "Loading"}
          </h3>
          <h3 id="writePg-entry-body">
            <span className="readPg-entry-category">Body:&nbsp;</span>
            {editEntry ? editEntry.text : "Loading"}
          </h3>
          <h3>
            <span className="readPg-entry-category">Tags:&nbsp;</span>
            {editEntry ? editEntry.tag : "Loading"}
          </h3>
          <h3>
            <span className="readPg-entry-category">Date:&nbsp;</span>
            {editEntry ? editEntry.when : "Loading"}
          </h3>
          <h3>
            <span className="readPg-entry-category">Id:&nbsp;</span>
            {editEntry ? editEntry._id : "Loading"}
          </h3>
          {/*Delete Button*/}
          <div id="delete-form-wrapper" style={{ visibility: viewDelete }}>
            <form
              id="delete-form"
              method="POST"
              action={`/delete/${editEntry ? editEntry._id : ""}`}
            >
              <div id="delete-wrapper">
                <input type="submit" value="Delete" id="delete" />
              </div>
            </form>
          </div>
        </div>
      </section>
      {/*Edit Form that toggles on/off */}
      <div className="edit-form" style={{ visibility: viewEdit }}>
        <form
          action={`/update/${editEntry ? editEntry._id : ""}`}
          method="POST"
          className="form"
        >
          <input
            type="text"
            className="home-input"
            value={editTitle ? editTitle : ""}
            id="title-input"
            name="title"
            placeholder="Title"
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
          />
          <input
            type="text"
            className="home-input"
            name="author"
            placeholder="Author"
            value={editAuthor ? editAuthor : ""}
            onChange={(e) => {
              setEditAuthor(e.target.value);
            }}
          />
          <textarea
            name="text"
            id="home-text"
            cols="30"
            rows="10"
            placeholder="Enter Text"
            value={editText ? editText : ""}
            onChange={(e) => {
              setEditText(e.target.value);
            }}
          ></textarea>
          <fieldset>
            <legend>Choose any tags for your entry:</legend>
            <label>
              JavaScript
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="javascript"
                checked={checkTagsTwo("javascript")}
                onChange={(e) => {
                  //guard clause to avoid duplicates of the same tag in array
                  if (!editTags.includes("javascript")) {
                    interTagArray.push(e.target.value);
                    setEditTags(editTags.concat(interTagArray));
                  }
                }}
              />
            </label>
            <label>
              Coding
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="coding"
                checked={checkTagsTwo("coding")}
                onChange={(e) => {
                  //guard clause to avoid duplicates of the same tag in array
                  if (!editTags.includes("coding")) {
                    interTagArray.push(e.target.value);
                    setEditTags(editTags.concat(interTagArray));
                  }
                }}
              />
            </label>
            <label>
              Web Dev
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="web dev"
                checked={checkTagsTwo("web dev")}
                onChange={(e) => {
                  //guard clause to avoid duplicates of the same tag in array
                  if (!editTags.includes("web dev")) {
                    interTagArray.push(e.target.value);
                    setEditTags(editTags.concat(interTagArray));
                  }
                }}
              />
            </label>
            <label>
              Personal
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="personal"
                checked={checkTagsTwo("personal")}
                onChange={(e) => {
                  //guard clause to avoid duplicates of the same tag in array
                  if (!editTags.includes("personal")) {
                    interTagArray.push(e.target.value);
                    setEditTags(editTags.concat(interTagArray));
                  }
                }}
              />
            </label>
            <label>
              Gaming
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="gaming"
                checked={checkTagsTwo("gaming")}
                onChange={(e) => {
                  //guard clause to avoid duplicates of the same tag in array
                  if (!editTags.includes("gaming")) {
                    interTagArray.push(e.target.value);
                    setEditTags(editTags.concat(interTagArray));
                  }
                }}
              />
            </label>
            <label>
              Life Style
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="lifeStyle"
                checked={checkTagsTwo("lifestyle")}
                onChange={(e) => {
                  //guard clause to avoid duplicates of the same tag in array
                  if (!editTags.includes("lifestyle")) {
                    interTagArray.push(e.target.value);
                    setEditTags(editTags.concat(interTagArray));
                  }
                }}
              />
            </label>
            <label>
              Sports
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="sports"
                checked={checkTagsTwo("sports")}
                onChange={(e) => {
                  //guard clause to avoid duplicates of the same tag in array
                  if (!editTags.includes("sports")) {
                    interTagArray.push(e.target.value);
                    setEditTags(editTags.concat(interTagArray));
                  }
                }}
              />
            </label>
            <label>
              React
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="react"
                checked={checkTagsTwo("react")}
                onChange={(e) => {
                  //guard clause to avoid duplicates of the same tag in array
                  if (!editTags.includes("react")) {
                    interTagArray.push(e.target.value);
                    setEditTags(editTags.concat(interTagArray));
                  }
                }}
              />
            </label>
            <label>
              mongoDB
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="mongoDB"
                checked={checkTagsTwo("mongoDB")}
                onChange={(e) => {
                  //guard clause to avoid duplicates of the same tag in array
                  if (!editTags.includes("mongoDB")) {
                    interTagArray.push(e.target.value);
                    setEditTags(editTags.concat(interTagArray));
                  }
                }}
              />
            </label>
            <label>
              Movies
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="movies"
                checked={checkTagsTwo("movies")}
                onChange={(e) => {
                  //guard clause to avoid duplicates of the same tag in array
                  if (!editTags.includes("movies")) {
                    interTagArray.push(e.target.value);
                    setEditTags(editTags.concat(interTagArray));
                  }
                }}
              />
            </label>
          </fieldset>
          <div className="submit-wrapper">
            <input type="submit" value="submit" className="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePage;
