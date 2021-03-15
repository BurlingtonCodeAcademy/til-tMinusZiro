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
      <h1>This is the Read Page</h1>
      <section id="read-page-wrapper">
        {/*can not print out the whole object i.e. 'item', instead to extract the properties out explicitly */}
        {journalEntries
          ? journalEntries.map((entry, index) => {
              return (
                <div id="multi-page-entry" key={index}>
                  <h1>
                    <Link to={`/facts/${entry._id}`}>{entry.title}</Link>
                  </h1>
                  <div>{entry.text}</div>
                  <div>{entry.when}</div>
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
