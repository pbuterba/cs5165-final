
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CombinedDataPage = () => {
  const [data, setData]         = useState([])
  const [household, setHousehold] = useState('')
  const [record, setRecord]     = useState(null)

  useEffect(() => {
    axios.get('/data/combined_data.json')
      .then(res => setData(res.data))
      .catch(err => {
        console.error(err)
        setData([])
      })
  }, [])

  
  const handleSubmit = e => {
    e.preventDefault()
    const num = parseInt(household, 10)
    const found = data.find(item => item.HSHD_NUM === num)
    setRecord(found || { notFound: true })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lookup Household Record</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <label className="block mb-2">
          Household Number:{' '}
          <input
            type="number"
            value={household}
            onChange={e => setHousehold(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>

      {record && record.notFound && (
        <p className="text-red-600">
          No record found for household #{household}
        </p>
      )}

      {record && !record.notFound && (
        <div className="overflow-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Field</th>
                <th className="border px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(record).map(([key, value]) => (
                <tr key={key}>
                  <td className="border px-4 py-2 font-medium">{key}</td>
                  <td className="border px-4 py-2">
                    {value != null ? value.toString() : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


const averageBasketMetrics = [
  { metric: 'Average Basket Price', value: '$57.30' },
  { metric: 'Average Basket Size (units)', value: '11.85' }
];


function renderTable(data) {
  
  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  table.style.margin = '2em auto';         
  table.style.textAlign = 'left';           


  const caption = document.createElement('caption');
  caption.textContent = 'Household 10 data';
  caption.style.fontSize = '1.5em';
  caption.style.fontWeight = 'bold';
  caption.style.marginBottom = '0.5em';
  table.appendChild(caption);


  const headerRow = document.createElement('tr');
  ['Metric', 'Value'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    th.style.border = '1px solid #999';
    th.style.padding = '0.5em 1em';
    th.style.background = '#eee';
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);


  data.forEach(({ metric, value }) => {
    const row = document.createElement('tr');
    [metric, value].forEach(text => {
      const td = document.createElement('td');
      td.textContent = text;
      td.style.border = '1px solid #999';
      td.style.padding = '0.5em 1em';
      row.appendChild(td);
    });
    table.appendChild(row);
  });


  document.body.appendChild(table);
}


document.addEventListener('DOMContentLoaded', () => {
  renderTable(averageBasketMetrics);
});


export default CombinedDataPage
