import { useState } from 'react';
import axios from 'axios';

export default function AccordionItem({ part }) {
  const [whereUsed, setWhereUsed] = useState([]);
  const [expandedPartId, setExpandedPartId] = useState(null);
  const filteredKeys = ['id', 'part_number', 'part_description'];
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isInProduction, setisInProduction] = useState(true);
  const [isInReplenish, setisInReplenish] = useState(true);

  const [designators, setDesignators] = useState([]);

  const get_where_used = (part_number) => {
    axios
      .get(`${BASE_URL}/api/where_used?part_number=${part_number}`)
      .then(({ data }) => {
        const { in_production, models_used_in, is_requested, reference_designator } = data;
        setisInProduction(in_production);
        setisInReplenish(is_requested);
        setWhereUsed(models_used_in);

        // format refdes
        let new_references = [];

        reference_designator.forEach((item, i) => {
          new_references[i] = ` ${item}`
        })
        setDesignators(new_references);

      })
      .catch((err) => console.error(err, 'Error getting part usage info'));
  };

  const card_checkin = (entry) => {
    if (entry.length == 10) {
      axios
        .put(`${BASE_URL}/api/kanban/${entry}`)
        .then(() => setisInReplenish(true))
        .catch((err) => console.error(err));
    }
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
        <td className={'text-center align-middle '.concat(expandedPartId === part.id ? 'expanded' : '')}>
          {part.part_number}
        </td>
        <td className="part-num-preview">{part.part_description}</td>
      </tr>

      {/* Content */}
      <tr id={`${part.id}`} className="collapse">
        <td colSpan={'2'} className="accordion-body">
          <div
            className="row py-2"
            style={{
              margin: '0.2rem',
              borderRadius: '8px',
            }}
          >
            <div className="row flex-wrap">
              <div className="col-2 col-sm-6 col-md-6 col-lg-2 order-1">
                <h4
                  className="text-center"
                  style={{ borderBottom: '1px solid white' }}
                >
                  Used in
                </h4>
                <ul className="p-0">
                  {whereUsed
                    .filter((item) => item)
                    .map((item) => (
                      <li key={item} title={designators} className="text-center">{`${item}`}</li>
                    ))}
                </ul>
              </div>
              <div className="col-2 col-sm-6 col-md-6 col-lg-3 order-2">
                <h4
                  className="text-center"
                  style={{ borderBottom: '1px solid white' }}
                >
                  Status
                </h4>
                <ul className="list-unstyled px-auto">
                  <li className="text-center py-1">
                    {isInReplenish ? (
                      <h5 className="text-nowrap">Already requested ❌</h5>
                    ) : (
                      <h5 className="text-nowrap">Not requested ✅</h5>
                    )}
                  </li>
                  <li className="text-center py-1">
                    {isInProduction ? (
                      <h5 className="text-nowrap">In production ✅</h5>
                    ) : (
                      <h5 className="text-nowrap">OBSOLETE ❌</h5>
                    )}
                  </li>
                  <li className="text-center py-1">
                  </li>
                  <li className="text-center py-1">
                    <button
                      className="btn btn-primary text-nowrap fw-bold"
                      value={part.part_number}
                      onClick={(e) => card_checkin(e.target.value)}
                      disabled={
                        !isInProduction || isInReplenish
                      }
                    >
                      Request replenish
                    </button>
                  </li>
                </ul>
              </div>

              {/* Extra info table */}
              <div className="col-8 col-sm-12 col-md-12 col-lg-7 order-3 order-sm-3 order-md-3">
                <div className="row">
                  <table className="table table-dark table-hover">
                    <tbody>
                      {Object.keys(part)
                        .filter((key) => !filteredKeys.includes(key))
                        .map((key) => {
                          const value = part[key];
                          let displayValue;
                          if (typeof value == 'boolean') {
                            displayValue = value ? (
                              <strong style={{ color: 'rgb(0, 175, 0)' }}>
                                Yes
                              </strong>
                            ) : (
                              <strong style={{ color: 'red' }}>No</strong>
                            );
                          } else {
                            displayValue = value;
                          }
                          return displayValue ? (
                            <tr
                              key={key}
                              className="col-6 mb-4"
                              style={{ border: '1px solid #aaa' }}
                            >
                              <td className="part-num-preview">{key}</td>
                              <td>{displayValue}</td>
                            </tr>
                          ) :
                          null;
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
