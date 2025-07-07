import { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';
import PartsTable from './PartsTable';

function App() {

  const [searchEntry, setSearchEntry] = useState(true);
  const [partData, setPartData] = useState([]);

  // Fetch all parts for initial load
  const fetch_initial_data = () => {
    const url = 'http://localhost:6969/search_parts/all'
    axios.get(`${url}`)
      .then((response) =>  setPartData(response.data))
      .catch((err) => console.log(err, " Error on front-end request"))
      .finally()
  }

  // Get one part
  const get_part = () => {
    const url = 'http://localhost:6969/search_parts?q='
    axios.get(`${url}${searchEntry}`)
      .then((response) =>  setPartData(response.data))
      .catch((err) => console.log(err, " Error on front-end request"))
      .finally()
  }

    // Initial page load
    useEffect( () => {
      fetch_initial_data()
    }, [])

    // Search when search box changes values
    useEffect( () => {
      if (searchEntry && searchEntry.length > 0) {
        get_part()
    }
    }, [searchEntry])

  return (
    <>
      <PartsTable partData={partData}/>
    </>
  )
}

export default App
