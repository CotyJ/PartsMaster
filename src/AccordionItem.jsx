import React from 'react';

export default function AccordionItem({ part }) {
  const filteredKeys = ['id', 'part_number', 'part_description', 'user_name'];
  const booleanVals = ['dchapman_ok', 'dkrich_ok'];

  return (
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
              <h4 style={{ borderBottom: '1px solid white' }}>{key}</h4>
              <div>{displayValue}</div>
            </div>
          ) : null;
        })}
    </div>
  );
}
