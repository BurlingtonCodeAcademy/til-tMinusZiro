import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const WritePage = (props) => {
  const [editEntry, setEditEntry] = useState(null);
  const [editTitle, setEditTitle] = useState();
  const [editText, setEditText] = useState();
  const [editAuthor, setEditAuthor] = useState();
  const [editTags, setEditTags] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  //provides access to current url and allows me to push a new route
  let history = useHistory();
  let interTagArray = [];

  console.log(`Write Page`);
  //fetch wrapped in a useEffect hook to constantly update journal entry
  useEffect(() => {
    if (!editEntry) {
      console.log(props.match.params.id);
      fetch(`/journal/${props.match.params.id}`)
        .then((res) => res.json())
        .then((entry) => {
          setEditEntry(entry);
          console.log(`author: ${entry.author}`);
          setEditAuthor(entry.author);
          console.log(`text: ${entry.text}`);
          setEditText(entry.text);
          console.log(`title: ${entry.title}`);
          setEditTitle(entry.title);
          console.log(`Tags:`);
          setEditTags(entry.tag);
        });
    }
  });

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

  function checkTags(str) {
    if (editTags) {
      if (editTags.includes(str)) {
        return true;
      } else {
        return false;
      }
    }
  }

  console.log(editTitle);
  console.log(editAuthor);
  console.log(editText);
  console.log(`Current TAGS:`);
  console.log(editTags);
  console.log(interTagArray);
  return (
    <div>
      <h1>This is the Write Page</h1>

      <div>
        <h2>Title:&nbsp;{editEntry ? editEntry.title : "Loading"}</h2>
        <h3>By:&nbsp;{editEntry ? editEntry.author : "Loading"}</h3>
        <h3>Content:&nbsp;{editEntry ? editEntry.text : "Loading"}</h3>
        <h3>Tags:&nbsp;{editEntry ? editEntry.tag : "Loading"}</h3>
        <h3>Date:&nbsp;{editEntry ? editEntry.when : "Loading"}</h3>
        <h3>Id:&nbsp;{editEntry ? editEntry._id : "Loading"}</h3>
      </div>
      <div className="edit-form">
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
                  // setEditTags(interTagArray);
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
        {/* <div id="delete-form-wrapper">
          <form
            id="delete-form"
            method="POST"
            action={`/delete/${editEntry ? editEntry._id : ""}`}
          >
            <div id="delete-wrapper">
              <input type="submit" value="Delete" id="delete" />
            </div>
          </form>
        </div> */}
      </div>
    </div>
  );
};

export default WritePage;
