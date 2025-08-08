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
          <legend style={{ fontWeight: 'bold' }}>Add a part and a location</legend>

          <label style={{ fontWeight: 'bold' }}>Part number:</label>
          <input
            type="search"
            id="search-bar"
            className="m-3 p-2 mx-0 rounded"
            onChange={''}
            placeholder="ex: 43205-2304"
          ></input>
          <select className="m-3 p-2  rounded">
            <option>first</option>
            <option>second</option>
            <option>third</option>
          </select>
        </fieldset>
      </form>
    </div>
  );
}
