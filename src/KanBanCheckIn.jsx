import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function KanBanCheckIn() {
  const [kanbanList, setKanbanList] = useState([]);
  const [searchEntry, setSearchEntry] = useState('43205-2304');


  // add part to table
  const get_part_description = () => {
    axios
    .get(`${BASE_URL}/get_single_part?q=${searchEntry}`)
    .then( (result) => setKanbanList(result)
    )
    .catch((err) => console.log(err, ' Error getting part'))
}

  // get part description
  const get_kanban_cards = () => {
    axios
    .get(`${BASE_URL}/get_kanban_cards`)
    .then((results) => {
      setKanbanList(results.data)
    })
  }


  // Initial page load
  useEffect(() => {
    get_kanban_cards()
  }, [])

  // delete part from table


  return (
    <div className="overflow-y-auto" style={{ maxHeight: '85vh' }}>
      <table className="table table-dark table-striped table-hover text-start mw-100">


        <thead>
          <tr>
            <th className="text-start col-2" scope="col">
              Part Number
            </th>
            <th className="text-start col-2" scope="col">
              Description
            </th>
            <th className="text-start col-2" scope="col">
              Description
            </th>
          </tr>
        </thead>


        <tbody>
          { kanbanList ?
          kanbanList.map( (item) => (
            <tr key={item.id}>
              <th scope="row">{item.part_number}</th>
              <td>{item.part_description}</td>
              <td>{item.date_added}</td>
            </tr>
          ))
        : <></>
        }
        </tbody>


      </table>
    </div>
  );
}
