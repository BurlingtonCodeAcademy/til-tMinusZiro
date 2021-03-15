import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ReadPage = () => {
  const [journalEntries, setJournalEntries] = useState();

  useEffect(() => {
    if (!journalEntries) {
      fetch("/facts")
        .then((res) => res.json())
        .then((entry) => {
          console.log("In fetch");
          setJournalEntries(entry);
          console.log({ entry });
        });
    }
  }, [journalEntries]);

  return (
    <div>
      <h2 id="read-section-title">List of Entries</h2>
      <section id="read-page-wrapper">
        {/*can not print out the whole object i.e. 'item', instead to extract the properties out explicitly */}
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

// {journalEntries
//   ? journalEntries.forEach((obj) => {
//       {
//         <h3>{obj.title}</h3>;
//       }
//       {
//         <h4>{obj.text}</h4>;
//       }
//       {
//         <h4>{obj.when}</h4>;
//       }
//     })
//   : "Loading"}
