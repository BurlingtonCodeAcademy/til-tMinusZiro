import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ReadPage = () => {
  //--------state----------//
  //state for an array of json objects containing journal entries
  const [journalEntries, setJournalEntries] = useState();

  //constantly updates to fetch all journal entries from the db
  useEffect(() => {
    if (!journalEntries) {
      fetch("/facts")
        .then((res) => res.json())
        .then((entry) => {
          setJournalEntries(entry);
        });
    }
  }, [journalEntries]);

  return (
    <div>
      {/*Section Title */}
      <h2 id="read-section-title">List of Entries</h2>
      <section id="read-page-wrapper">
        {/*can not print out the whole object i.e. 'item', instead to extract the properties out explicitly */}
        {/*using the fetched journal data to map the array and print out each journal entry */}
        {journalEntries
          ? journalEntries.map((entry, index) => {
              return (
                <div id="multi-page-entry" key={index}>
                  <h2 className="title-link-wrapper">
                    <Link className="title-link" to={`/facts/${entry._id}`}>
                      {entry.title}
                    </Link>
                  </h2>
                  <h3>
                    <span className="readPg-entry-category">By:&nbsp;</span>
                    {entry.author}
                  </h3>
                  <h3 className="readPg-entry-body">
                    <span className="readPg-entry-category">Body:&nbsp;</span>
                    {entry.text}
                  </h3>
                  <h3>
                    <span className="readPg-entry-category">Tags:&nbsp;</span>
                    {entry.tag}
                  </h3>
                  <h3>
                    <span className="readPg-entry-category">Date:&nbsp;</span>
                    {entry.when}
                  </h3>
                  <h3>
                    <span className="readPg-entry-category">Id:&nbsp;</span>
                    {entry._id}
                  </h3>
                </div>
              );
            })
          : "Loading"}
      </section>
    </div>
  );
};

export default ReadPage;
