import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';

// const axios = require('axios');

function App() {

  const [search, setSearch] = useState(null);

  const get_sample_part = () => {
    axios.get('http://localhost:6969/search')
      .then((response) => {
        const { data } = response;
        console.log(data[0].part_number)
        setSearch(data[0].part_number)
      })
      .catch((err) => console.log(err, " Error on front-end request"))
      .finally(() => console.log("done i guess"));
  }

  get_sample_part()


    // useEffect( () => {
    //
    // }, [])

  return (
    <>
      <div>
        <div>Hello</div>
        <input type="search" id="search-bar"></input>
        <button onClick={get_sample_part}>GET</button>
        <div>{search}</div>
      </div>
    </>
  )
}

export default App
