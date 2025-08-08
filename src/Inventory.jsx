import axios from 'axios';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Inventory() {
  const [inventoryList, setInventoryList] = useState([]);

  const get_inventory = () => {
    axios
      .get(`${BASE_URL}/inventory`)
      .then((results) => {
        console.log(results.data);
        setInventoryList(results.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    get_inventory();
  }, []);

  return (
    <div>
      <form>
        <fieldset>
          <legend className="fw-bold page-legend mb-4">
            Enter a part and a location
          </legend>
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <label className="fw-bold fs-5 pe-2">Part number:</label>
            <input
              type="search"
              id="search-bar"
              className="form-control"
              style={{ maxWidth: '200px' }}
              placeholder="ex: 43205-2304"
              // onChange={''}
            ></input>

            <label className="fw-bold fs-5 ps-4 pe-2 mb-0">Location:</label>
            <select className="form-select" style={{ maxWidth: '200px' }}>
              <option>first</option>
              <option>second</option>
              <option>third</option>
            </select>

            <button className="btn btn-primary ms-2 p-2">Add location</button>
          </div>
        </fieldset>
      </form>

      <div className="overflow-y-auto" style={{ maxHeight: '85vh' }}>
        {inventoryList.length > 0 ? (
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
                <th className="text-center column-name col-auto" scope="col">
                  Location
                </th>
                <th className="text-center column-name col-1" scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryList.map((item) => (
                <tr key={item.id}>
                  <th scope="row" className="text-center align-middle">
                    {item.part_number}
                  </th>
                  <td>{item.part_description}</td>
                  <td className="text-center">{item.os_location}</td>
                  <td className="text-center">
                    <button className="btn btn-sm btn-primary">✓</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table table-dark table-striped table-hover text-start mw-100">
            <thead>
              <tr>
                <th className="text-start column-name part-num-col" scope="col">
                  Nothing here?
                </th>
              </tr>
            </thead>
          </table>
        )}
      </div>
    </div>
  );
}
