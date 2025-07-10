import { React, useState, useEffect } from 'react';
import axios from 'axios';

export default function PartsTable() {
  const [searchEntry, setSearchEntry] = useState(true);
  const [partData, setPartData] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch all parts for initial load
  const fetch_initial_data = () => {
    axios
      .get(`${BASE_URL}/search_parts/all`)
      .then((response) => setPartData(response.data))
      .catch((err) => console.log(err, ' Error getting initial data'))
      .finally();
  };

  // Get one part
  const get_part = () => {
    axios
      .get(`${BASE_URL}/search_parts?q=${searchEntry}`)
      .then((response) => setPartData(response.data))
      .catch((err) => console.log(err, ' Error getting part'))
      .finally();
  };

  // Initial page load
  useEffect(() => {
    // fetch_initial_data();
  }, []);

  // Search when search box changes values
  useEffect(() => {
    // BUG:  when deleting all entry, it keeps the first number and does not properly clear
    if (searchEntry && searchEntry.length > 0) {
      get_part();
    }
  }, [searchEntry]);

  return (
    <div>
      <fieldset>
        <input
          type="search"
          id="search-bar"
          className='m-3 p-2 mx-0 rounded'
          onChange={(e) => setSearchEntry(e.target.value)}
          placeholder="ex: 43205-2304"
        ></input>
      </fieldset>

      <div className="overflow-y-auto" style={{maxHeight: '580px'}}>
        <table className="table table-dark table-striped table-hover text-start mw-100" >
          <thead>
            <tr>
              {/* // BUG: Annoying table width changes slightly when entering search */}
              <th className='text-start col-2' scope="col" >Part Number</th>
              <th className='text-start col-10' scope="col" >Description</th>
            </tr>
          </thead>
          <tbody>
            {partData.map((part) => (
              <tr key={part.id} className="">
                <td>{part.part_number}</td>
                <td className="">{part.part_description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
