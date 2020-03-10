import React, { useState, useEffect } from "react";
// import {useHistory} from "react-router-dom"
import "./App.css";
import { FaTwitterSquare } from "react-icons/fa";

const App = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    quoteFetcher();
  }, []);

  const quoteFetcher = () => {
    const baseurl =
      "https://cors-anywhere.herokuapp.com/api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
    fetch(baseurl)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setQuote(json);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  const isAuthorNull = () => {
    return quote.quoteAuthor ? quote.quoteAuthor : "Anonymous";
  };

  let twitterUrl = `https://twitter.com/intent/tweet?&text=${JSON.stringify(
    quote.quoteText
  )} - ${isAuthorNull()}`;

  // const history = useHistory();

  return (
    <div>
      {quote.quoteText ? console.log(quote.quoteText.length) : null}
      <div id="quote-container">
        <div id="text-container">
          <div id="quote">
            <span>{quote.quoteText}</span>
          </div>
          <div id="author">
            <span>{`- ${isAuthorNull()}`}</span>
          </div>
        </div>
        <div id="call-to-action">
          <div>
            <a href={twitterUrl} target="#" alt="tweet quote">
              <FaTwitterSquare id="twitter-icon" />
            </a>
          </div>
          <div id="button-container">
            <button id="quote-button" onClick={() => quoteFetcher()}>
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
