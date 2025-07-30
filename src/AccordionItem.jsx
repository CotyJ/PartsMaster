import React from 'react';

export default function AccordionItem({ part }) {
  console.log(Object.keys(part));

  return (
    <div className="row">
      {Object.keys(part).map((key) =>
        part[key] ? (
          <div key={key} className="col-6 mb-4">
            <h4 style={{ borderBottom: '1px solid white' }}>{key}</h4>
            <div>{part[key]}</div>
          </div>
        ) : null
      )}
    </div>
  );
}
