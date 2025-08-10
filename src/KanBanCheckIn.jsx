import { useEffect, useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function KanBanCheckIn() {
  const [kanbanList, setKanbanList] = useState([]);
  const [searchEntry, setSearchEntry] = useState('');
  const [dateSortedAsc, setDateSortedAsc] = useState(true);
  const [numberSortedAsc, setNumberSortedAsc] = useState(null);

  // temporary to test button
  const [isOnOrder, setisOnOrder] = useState(true);

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
        className="mb-2"
        onSubmit={(e) => {
          e.preventDefault();
          card_checkin(searchEntry);
        }}
      >
        <fieldset>
          <legend className="fw-bold page-legend mb-4">
            Enter a part number
          </legend>

          <div className="d-flex align-items-center gap-3 flex-wrap">
            <label className="form-label fw-bold fs-5 pe-2">Part number:</label>
            <input
              type="search"
              id="search-bar"
              className="form-control"
              autoFocus="autofocus"
              style={{ maxWidth: '200px' }}
              onChange={(e) => setSearchEntry(e.target.value)}
              placeholder="ex: 43205-2304"
            ></input>
            <button className="btn" type="submit"></button>
          </div>
        </fieldset>
      </form>

      <div style={{ maxHeight: '85vh' }}>
        <table className="table table-dark table-hover text-start mw-100 overflow-y-auto">
          <thead>
            <tr>
              <th
                className="text-center column-name part-num-col col-auto"
                scope="col"
                onClick={() => sort_by_part_num()}
              >
                {numberSortedAsc === true ? (
                  'Part Number ↑'
                ) : numberSortedAsc === false ? (
                  'Part Number ↓'
                ) : (
                  <div>
                    Part Number <span style={{ visibility: 'hidden' }}>↑</span>
                  </div>
                )}
              </th>
              <th className="text-start col-auto part-desc-col" scope="col">
                <div className="column-name">Description</div>
              </th>
              <th
                className="text-center col-auto column-name"
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

              <th
                className="text-center col-1 text-nowrap column-name"
                scope="col"
              >
                Ordered?
              </th>

              <th
                className="text-center col-1 text-nowrap column-name"
                scope="col"
              >
                Check In
              </th>
            </tr>
          </thead>

          <tbody>
            {kanbanList.map((item) => (
              <tr key={item.id}>
                <th scope="row" className="text-center align-middle">
                  {item.part_number}
                </th>
                <td>{item.part_description}</td>
                <td className="text-center">{item.date_added}</td>
                <td className="text-center">
                  <li className="text-center ">
                    <button
                      className="btn btn-sm btn-primary text-nowrap fw-bold"
                      disabled={isOnOrder}
                    >
                      {isOnOrder ? 'Ordered' : 'Order'}
                    </button>
                  </li>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary text-nowrap fw-bold"
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
