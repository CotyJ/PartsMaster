import React from 'react'

export default function PartsTable({partData}) {
  return (
    <div>
        <div>Hello</div>
          <fieldset>
            <legend>Search Bar</legend>
            <input type="search" id="search-bar" onChange={(e) => setSearchEntry(e.target.value)} placeholder='ex: 43205-2304'></input>
          </fieldset>
          <div>
            {partData.map( (part) => (
              <div key={part.id}>{part.part_number}</div>
              ))}
          </div>
      </div>
  )
}
