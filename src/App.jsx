import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';

function App() {

  const [searchEntry, setSearchEntry] = useState(true);
  const [partData, setPartData] = useState([]);

  const get_part = () => {
    const url = 'http://localhost:6969/search_parts?q='
    axios.get(`${url}${searchEntry}`)
      .then((response) =>  setPartData(response.data))
      .catch((err) => console.log(err, " Error on front-end request"))
      .finally()
  }

    useEffect( () => {
      get_part()
    }, [searchEntry])

  return (
    <>
      <div>
        <div>Hello</div>
          <fieldset>
            <legend>Search Bar</legend>
            <input type="search" id="search-bar" onChange={(e) => setSearchEntry(e.target.value)} placeholder='ex: 43205-2304'></input>
          </fieldset>
          <div>
            {partData.map( (part) => (
              <div key={part.part_number}>{part.part_number}</div>
              ))}
          </div>
      </div>
    </>
  )
}

export default App
