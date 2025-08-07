import { useState } from 'react';
import axios from 'axios';

export default function AccordionItem({ part }) {
  const [whereUsed, setWhereUsed] = useState([]);
  const [expandedPartId, setExpandedPartId] = useState(null);

  const filteredKeys = ['id', 'part_number', 'part_description'];
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const get_where_used = (value) => {
    axios
      .get(`${BASE_URL}/where_used?part_number=${value}`)
      .then((response) => setWhereUsed(response.data))
      .catch((err) => console.log(err, ' Error getting part'));
  };

  const expand_item = (id) => {
    setExpandedPartId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <tr
        key={part.id}
        data-bs-toggle="collapse"
        data-bs-target={`#${part.id}`}

        onClick={() => {
          get_where_used(part.part_number);
          expand_item(part.id);
        }}
      >
        <td className={expandedPartId === part.id ? 'expanded' : ''}>{part.part_number}</td>
        <td>{part.part_description}</td>
      </tr>
      <tr id={`${part.id}`} className="collapse">
        <td colSpan={'2'} className="accordion-body">
          <div
            className="row py-2"
            style={{
              margin: '0.2rem',
              borderRadius: '8px',
            }}
          >
            <div className="col-2">
              <h3 className="text-center">Used in...</h3>
              <ul className="p-0">
                {whereUsed
                  .filter((item) => item.bom_model !== null)
                  .map((item) => (
                    <li
                      key={item.bom_model}
                      className="text-center"
                    >{`${item.bom_model}`}</li>
                  ))}
              </ul>
            </div>
            <div className="col-10">
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
                        <div style={{ overflow: 'auto' }}>{displayValue}</div>
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
