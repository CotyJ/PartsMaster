import { useState, useEffect } from 'react';
import axios from 'axios';
import AccordionItem from './AccordionItem';

export default function PartsTable() {
  const [searchEntry, setSearchEntry] = useState(true);
  const [partData, setPartData] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const get_part = () => {
    axios
      .get(`${BASE_URL}/parts?part_number=${searchEntry}`)
      .then((response) => setPartData(response.data))
      .catch((err) => console.log(err, ' Error getting part'))
      .finally();
  };

  useEffect(() => {
    // BUG:  when deleting all entry, it keeps the first number and does not properly clear
    if (searchEntry && searchEntry.length > 0) {
      get_part();
    }
  }, [searchEntry]);

  return (
    <div>
      <fieldset>
        <legend className='fw-bold page-legend'>
          Filter by number or description
        </legend>
        <input
          type="search"
          id="search-bar"
          className="m-3 p-2 mx-0 rounded"
          onChange={(e) => setSearchEntry(e.target.value)}
          placeholder="ex: 43205-2304"
        ></input>
      </fieldset>

      <div className="overflow-y-auto" style={{ maxHeight: '85vh' }}>
        {partData.length > 0 ? (
          <table className="table table-dark table-hover text-start mw-100">
            <thead>
              <tr>
                <th
                  className="text-center column-name part-num-col"
                  scope="col"
                >
                  <div className="column-name">Part Number</div>
                </th>
                <th className="text-start column-name col-auto" scope="col">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {partData.map((part) => (
                <AccordionItem key={part.part_number} part={part} />
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table table-dark table-striped table-hover text-start mw-100">
            <thead>
              <tr>
                <th className="text-start column-name part-num-col" scope="col">
                  Start typing for some results!
                </th>
              </tr>
            </thead>
          </table>
        )}
      </div>
    </div>
  );
}
