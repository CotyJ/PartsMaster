import axios from 'axios';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Inventory() {
  const [inventoryList, setInventoryList] = useState([]);
  const [locationEntries, setLocationEntries] = useState([]);
  const [formData, setFormData] = useState({
    part_number: '',
    os_location: '',
  });

  const get_inventory = () => {
    const locations = new Set();
    axios
      .get(`${BASE_URL}/inventory`)
      .then((results) => {
        const { data } = results;
        setInventoryList(data);
        data.forEach((item) => {
          if (item.os_location) {
            locations.add(item.os_location);
          }
        });
        const updated_loc = [...locations].sort();
        setLocationEntries(updated_loc);
      })
      .catch((err) => console.log(err));
  };

  const add_to_inventory = (data) => {
    const { part_number, os_location } = data;
    console.log(part_number, os_location);

    if (part_number.length == 10 && locationEntries.includes(os_location)) {
      axios
        .put(`${BASE_URL}/inventory/${part_number}/${os_location}`)
        .then(() => get_inventory())
        .catch((err) => console.error(err));
      console.log('valid');
    } else {
      console.log('invalid entry');
    }
  };

  const delete_from_inventory = (id) => {
    console.log(`Delete id ${id}`);

    axios
      .delete(`${BASE_URL}/inventory/${id}`)
      .then(() => get_inventory())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    get_inventory();
  }, []);

  return (
    <div>
      <form
        className="mb-2"
        onSubmit={(e) => {
          e.preventDefault();
          add_to_inventory(formData);
        }}
      >
        <fieldset>
          <legend className="fw-bold page-legend mb-4">
            Add to or search for a location
          </legend>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            <label className="form-label fw-bold fs-5 pe-2">
              Add part number:
            </label>
            <input
              type="search"
              id="search-bar"
              className="form-control"
              style={{ maxWidth: '200px' }}
              placeholder="ex: 43205-2304"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  part_number: e.target.value,
                }))
              }
            ></input>

            <label className="fw-bold fs-5 ps-4 pe-2 mb-0">Location:</label>
            <select
              className="form-select"
              value={formData.os_location}
              style={{ maxWidth: '200px' }}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  os_location: e.target.value,
                }))
              }
            >
              <option value="">Select...</option>
              {locationEntries.map((location, index) => (
                <option value={location} key={index}>
                  {location}
                </option>
              ))}
            </select>

            <button type="submit" className="btn btn-primary">
              Add location
            </button>
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
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => delete_from_inventory(item.id)}
                    >
                      ✓
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table table-dark table-striped table-hover text-start mw-100">
            <thead>
              <tr>
                <th
                  className="text-start column-name part-num-col"
                  scope="col"
                ></th>
              </tr>
            </thead>
          </table>
        )}
      </div>
    </div>
  );
}
