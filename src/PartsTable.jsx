import React from 'react'

export default function PartsTable({partData, setSearchEntry} ) {
  return (
    <div>
          <fieldset>
            <input type="search" id="search-bar" onChange={(e) => setSearchEntry(e.target.value)} placeholder='ex: 43205-2304'></input>
          </fieldset>

          {/* Table begin */}
          <table className='table table-dark table-striped'>
            <thead>
              <tr>
                <th scope="col">Part Number</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {partData.map( (part) => (
                <tr key={part.id} className=''>
                  <td>{part.part_number}</td>
                  <td className=''>{part.part_description}</td>
                </tr>
                ))}
            </tbody>
          </table>
      </div>
  )
}
