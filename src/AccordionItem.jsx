export default function AccordionItem({ part, where_used }) {
  const filteredKeys = ['id', 'part_number', 'part_description', 'user_name'];

  return (
    <div
      className="row"
      style={{ backgroundColor: 'rgb(69, 69, 69)', margin: '0.5rem' }}
    >
      <div className="col-3">
        <h3>WhereUsed</h3>
        <ul>
          {where_used
          .filter((item) => item.bom_model !== null)
          .map((item) => (
            <li>{`${item.bom_model}`}</li>
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
                  <h4 style={{ borderBottom: '1px solid white' }}>{key}</h4>
                  <div>{displayValue}</div>
                </div>
              ) : null;
            })}
        </div>
      </div>
    </div>
  );
}
