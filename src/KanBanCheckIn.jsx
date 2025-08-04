import axios from 'axios';
import { useEffect, useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function KanBanCheckIn() {
  const [kanbanList, setKanbanList] = useState([]);
  const [searchEntry, setSearchEntry] = useState('');
  const [isValidEntry, setisValidEntry] = useState(false);

  // get cards
  const get_kanban_cards = () => {
    axios
      .get(`${BASE_URL}/kanban`)
      .then((results) => setKanbanList(results.data))
      .catch((err) => console.log(err));
  };

  const card_checkin = (entry) => {
    if (entry.length == 10) {
      axios
        .put(`${BASE_URL}/kanban/${entry}`)
        .then(() => console.log('adding...'))
        .catch((err) => console.error(err));
    }
  };

  // delete part from table
  const delete_card = (id) => {
    axios
      .delete(`${BASE_URL}/kanban/${id}`)
      .catch((err) => console.log(err));
  };

  // Initial page load
  useEffect(() => {
    get_kanban_cards();
  }, [kanbanList]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          card_checkin(searchEntry);
        }}
      >
        <fieldset>
          <input
            type="search"
            id="search-bar"
            className="m-3 p-2 mx-0 rounded"
            onChange={(e) => setSearchEntry(e.target.value)}
            placeholder="ex: 43205-2304"
          ></input>
          <button className="btn" type="submit"></button>
        </fieldset>
      </form>

      <div className="" style={{ maxHeight: '85vh' }}>
        <table className="table table-dark table-striped table-hover text-start mw-100 overflow-y-auto">
          <thead>
            <tr>
              <th className="text-start col-2" scope="col">
                Part Number
              </th>
              <th className="text-start col-7" scope="col">
                Description
              </th>
              <th className="text-center col-2" scope="col">
                Date Added
              </th>
              <th className="text-center col-1" scope="col">
                Check In
              </th>
            </tr>
          </thead>

          <tbody>
            {kanbanList.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.part_number}</th>
                <td>{item.part_description}</td>
                <td className="text-center">{item.date_added}</td>
                <td className="text-center">
                  <button className="btn btn-sm btn-primary" onClick={() => delete_card(item.id)}>✓</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
