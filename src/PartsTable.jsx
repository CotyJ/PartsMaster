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
          onChange={(e) => setSearchEntry(e.target.value)}
          placeholder="ex: 43205-2304"
        ></input>
      </fieldset>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Part Number</th>
            <th scope="col">Description</th>
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
  );
}
