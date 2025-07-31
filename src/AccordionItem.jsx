import { useState } from "react";
import axios from "axios";


export default function AccordionItem({ part }) {
  const [whereUsed, setWhereUsed] = useState([]);

  const filteredKeys = ['id', 'part_number', 'part_description', 'user_name'];
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const get_where_used = (value) => {
    axios
      .get(`${BASE_URL}/search_where_used?q=${value}`)
      .then((response) => setWhereUsed(response.data))
      .catch((err) => console.log(err, ' Error getting part'))
  };


  return (
    <>
      <tr
        data-bs-toggle="collapse"
        data-bs-target={`#${part.id}`}
        onClick={() => get_where_used(part.part_number)}
      >
        <td>{part.part_number}</td>
        <td className="">{part.part_description}</td>
      </tr>
      <tr id={`${part.id}`} className="collapse">
        <td colSpan={'2'} className="accordion-body">
          <div
            className="row"
            style={{ backgroundColor: 'rgb(69, 69, 69)', margin: '0.5rem' }}
          >
            <div className="col-3">
              <h3>WhereUsed</h3>
              <ul>
                {whereUsed
                  .filter((item) => item.bom_model !== null)
                  .map((item) => (
                    <li key={item.bom_model}>{`${item.bom_model}`}</li>
                  ))}
              </ul>
            </div>
            <div className="col-9">
              <div className="row">
                {Object.keys(part)
                  .filter((key) => !filteredKeys.includes(key))
                  .map((key) => {
                    const value = part[key];
                    let displayValue;
                    if (typeof value == 'boolean') {
                      displayValue = value ? <h5>✅</h5> : <h5>❌</h5>;
                    } else {
                      displayValue = value;
                    }

                    return displayValue ? (
                      <div key={key} className="col-6 mb-4">
                        <h4 style={{ borderBottom: '1px solid white' }}>
                          {key}
                        </h4>
                        <div>{displayValue}</div>
                      </div>
                    ) : null;
                  })}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
