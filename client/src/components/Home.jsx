import React from "react";
import { useState } from "react";

const Home = () => {
  return (
    <div>
      {/*Home page title  */}
      <h2 className="page-title">Create a Journal Entry</h2>
      {/*Create a Journal Entry form */}
      <div className="home-form">
        <form method="POST" action="/create" className="form">
          <input
            type="text"
            className="home-input"
            id="title-input"
            name="title"
            placeholder="Title"
          />
          <input
            type="text"
            className="home-input"
            name="author"
            placeholder="Author"
          />
          <textarea
            name="text"
            id="home-text"
            cols="30"
            rows="12"
            placeholder="Enter Text"
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
              />
            </label>
            <label>
              Coding
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="coding"
              />
            </label>
            <label>
              Web Dev
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="web dev"
              />
            </label>
            <label>
              Personal
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="personal"
              />
            </label>
            <label>
              Gaming
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="gaming"
              />
            </label>
            <label>
              Life Style
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="lifeStyle"
              />
            </label>
            <label>
              Sports
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="sports"
              />
            </label>
            <label>
              React
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="react"
              />
            </label>
            <label>
              mongoDB
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="mongoDB"
              />
            </label>
            <label>
              Movies
              <input
                className="checkbox"
                type="checkbox"
                name="tag"
                value="movies"
              />
            </label>
          </fieldset>
          <div className="submit-wrapper">
            <input type="submit" value="submit" className="submit" />
          </div>
        </form>
      </div>

      {/* <div>
        <h3>Please Log In</h3>
        <form method="POST" action="/login">
          <label>
            Username: <input type="text" name="username" id="" />
          </label>
          <label>
            Password: <input type="text" name="pass" />
          </label>
          <input type="submit" />
        </form>
      </div> */}
    </div>
  );
};

export default Home;
