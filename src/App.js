import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  
  const [redditData, setRedditData] = useState([]);
  const [searchVal, setSearchVal] = useState("");



  const getReddit = async (urlTerm) => {
    const response = await fetch(urlTerm);
    const jsonResponse = await response.json();
    return jsonResponse;
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    let searchTerm = 'https://www.reddit.com/search.json?q=';
    searchTerm += encodeURI(searchVal);

    
    getReddit(searchTerm).then(
      response  => {
        setRedditData(response.data.children);

        console.log(response.data.children);
      },
      rejection => {
        console.error(rejection.message);
      }
    );
    
    
  }

  return (
    <div className="App">
      <p>Testing Reddit's JSON API using async await</p>
      <form onSubmit={handleSubmit}>
        <label>
          Search:
          <input type="text" name="search" value={searchVal} onChange={e => setSearchVal(e.target.value)} />
        </label><br />
        <input type="submit" value="Search" />
      </form>

      <div id="holder">

        {
          /**  
           Different types of Reddit posts
            Text : Undefined, Self
            Image : Image
            Video : hosted:video

          **/
        }

        { redditData.map((item) => {
          return (
            <div className={`redditItem ${item.data.post_hint}`} key={item.data.id}>
              <span>{item.data.subreddit_name_prefixed}</span><br />
              <span>{item.data.author}</span><br />
              <span>{item.data.created_utc}</span><br />
              <span>{item.data.title.split(" ").splice(0,10).join(" ")}...</span>
              <div>
                  {item.data.selftext ? (
                    <p>{item.data.selftext}</p>
                  ) : (
                    <img src={item.data.thumbnail} />
                  )}
              </div>
            </div>
            );
        }) }

      </div>



    </div>
  );
}

export default App;
