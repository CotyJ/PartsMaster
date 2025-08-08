import axios from 'axios';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Inventory() {
  const [inventoryList, setInventoryList] = useState(true);

  const getInventory = () => {
    axios
      .get(`${BASE_URL}/inventory`)
      .then((response) => setInventoryList(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getInventory();
  }, [inventoryList]);

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
              </tr>
            </thead>
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
