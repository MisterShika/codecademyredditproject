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
        <table>
          <tr>
            <th>Subreddit</th>
            <th>Author</th>
            <th>Date Created</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
          { redditData.map((item) => {
            return (
              <tr>
                <td>{item.data.subreddit_name_prefixed}</td>
                <td>{item.data.author}</td>
                <td>{item.data.created_utc}</td>
                <td>{item.data.title.split(" ").splice(0,10).join(" ")}...</td>
                <td>
                    {item.data.selftext ? (
                      <p>{item.data.selftext}</p>
                    ) : (
                      <img src={item.data.thumbnail} />
                    )}
                </td>
              </tr>
              );
          }) }
        </table>
      </form>
    </div>
  );
}

export default App;
