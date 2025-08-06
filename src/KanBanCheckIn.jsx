import { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function KanBanCheckIn() {
  const [kanbanList, setKanbanList] = useState([]);
  const [searchEntry, setSearchEntry] = useState('');
  const [dateSortedAsc, setDateSortedAsc] = useState(true);
  const [numberSortedAsc, setNumberSortedAsc] = useState(null);

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
        .then(() => get_kanban_cards())
        .catch((err) => console.error(err));
    }
  };

  // delete part from table
  const delete_card = (id) => {
    axios
      .delete(`${BASE_URL}/kanban/${id}`)
      .then(get_kanban_cards())
      .catch((err) => console.log(err));
  };

  // sort items by date added
  const sort_by_date = () => {
    setDateSortedAsc(!dateSortedAsc);
    setNumberSortedAsc(null);
    if (dateSortedAsc) {
      let newList = [...kanbanList].sort((a, b) =>
        a.date_added.localeCompare(b.date_added)
      );
      setKanbanList(newList);
    } else {
      let newList = [...kanbanList].sort((a, b) =>
        b.date_added.localeCompare(a.date_added)
      );
      setKanbanList(newList);
    }
  };

  // sort items by part number
  const sort_by_part_num = () => {
    if (numberSortedAsc === null) {
      setNumberSortedAsc(true);
    } else {
      setNumberSortedAsc(!numberSortedAsc);
    }
    setDateSortedAsc(null);
    console.log(dateSortedAsc);
    if (numberSortedAsc) {
      let newList = [...kanbanList].sort((a, b) =>
        a.part_number.localeCompare(b.part_number)
      );
      setKanbanList(newList);
    } else {
      let newList = [...kanbanList].sort((a, b) =>
        b.part_number.localeCompare(a.part_number)
      );
      setKanbanList(newList);
    }
  };

  // Initial page load
  useEffect(() => {
    get_kanban_cards();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          card_checkin(searchEntry);
        }}
      >
        <fieldset>
          <legend style={{ fontWeight: 'bold' }}>Enter a part number</legend>
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

      <div style={{ maxHeight: '85vh' }}>
        <table className="table table-dark table-striped table-hover text-start mw-100 overflow-y-auto">
          <thead>
            <tr>
              <th
                className="text-start column-name part-num-col col-auto"
                scope="col"
                onClick={() => sort_by_part_num()}
              >
                {numberSortedAsc === true
                  ? 'Part Number ↑'
                  : numberSortedAsc === false
                  ? 'Part Number ↓'
                  : 'Part Number'}
              </th>
              <th className="text-start col-auto part-desc-col" scope="col">
                <div className="column-name">Description</div>
              </th>
              <th
                className="text-center col-auto"
                style={{ whiteSpace: 'nowrap', width: '1%' }}
                scope="col"
                onClick={() => sort_by_date()}
              >
                {dateSortedAsc === true ? (
                  'Date Added ↑'
                ) : dateSortedAsc === false ? (
                  'Date Added ↓'
                ) : (
                  <div>
                    Date Added <span style={{ visibility: 'hidden' }}>↑</span>
                  </div>
                )}
              </th>
              <th className="text-center col-1 text-nowrap" scope="col">
                Check In
              </th>
            </tr>
          </thead>

          <tbody>
            {kanbanList.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.part_number}</th>
                <td>{item.part_description}</td>
                <td className="text-start">{item.date_added}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => delete_card(item.id)}
                  >
                    ✓
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
