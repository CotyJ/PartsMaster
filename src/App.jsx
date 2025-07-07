import { useState } from 'react'
import './App.css';
import axios from 'axios';

function App() {

  const [searchEntry, setSearchEntry] = useState(true);
  const [partData, setPartData] = useState(null);

  const get_part = () => {
    // console.log(searchEntry);

    axios.get('http://localhost:6969/search')
      .then((response) => {
        const partData = response.data;
        console.log(partData[0].part_number)
        setPartData(partData[0].part_number)
      })
      .catch((err) => console.log(err, " Error on front-end request"))
      .finally()
  }

    // useEffect( () => {
    //
    // }, [])

  return (
    <>
      <div>
        <div>Hello</div>
          <fieldset>
            <legend>Search Bar</legend>
            <input type="search" id="search-bar" onChange={get_part} placeholder='ex: 43205-2304'></input>
          </fieldset>
        <div>{partData}</div>
      </div>
    </>
  )
}

export default App
