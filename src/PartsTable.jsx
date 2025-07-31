import { React, useState, useEffect } from 'react';
import axios from 'axios';
import AccordionItem from './AccordionItem';

export default function PartsTable() {
  const [searchEntry, setSearchEntry] = useState(true);
  const [partData, setPartData] = useState([]);
  const [whereUsed, setWhereUsed] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Get one part
  const get_part = () => {
    axios
      .get(`${BASE_URL}/search_parts?q=${searchEntry}`)
      .then((response) => setPartData(response.data))
      .catch((err) => console.log(err, ' Error getting part'))
      .finally();
  };

  const get_where_used = (value) => {
    // BUG: getting null values at the bottom due to empty rows
    // BUG: on initial load (which happens after click), initially shows all models before being filtered
    axios
      .get(`${BASE_URL}/search_where_used?q=${value}`)
      .then((response) => {
        setWhereUsed(response.data);
        console.log(whereUsed);
      })
      .catch((err) => console.log(err, ' Error getting part'))
      .finally(console.log(whereUsed));
  };

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
          className="m-3 p-2 mx-0 rounded"
          onChange={(e) => setSearchEntry(e.target.value)}
          placeholder="ex: 43205-2304"
        ></input>
      </fieldset>

      <div className="overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <table className="table table-dark table-striped table-hover text-start mw-100">
          <thead>
            <tr>
              {/* // BUG: Annoying table width changes slightly when entering search */}
              <th className="text-start col-2" scope="col">
                Part Number
              </th>
              <th className="text-start col-10" scope="col">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {partData.map((part) => (
              <>
                <tr
                  key={part.id}
                  data-bs-toggle="collapse"
                  data-bs-target={`#${part.id}`}
                  onClick={() => get_where_used(part.part_number)}
                >
                  <td>{part.part_number}</td>
                  <td className="">{part.part_description}</td>
                </tr>
                <tr id={`${part.id}`} className="collapse">
                  <td colSpan={'2'} className="accordion-body">
                    <AccordionItem
                      part={part}
                      part_number={part.part_number}
                      where_used={whereUsed}
                    />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
