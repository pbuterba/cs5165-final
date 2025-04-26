
import React, { useState, useEffect } from 'react'

const CombinedDataPage = () => {
  const [data, setData] = useState([])
  const [household, setHousehold] = useState('')
  const [record, setRecord] = useState(null)

  useEffect(() => {
    fetch('/data-api/rest/churnLabels?HSHD_NUM=10')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data:', data);
        setData(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);



  const handleSubmit = e => {
    e.preventDefault()
    const num = parseInt(household, 10)
    const found = data.filter(item => item.HSHD_NUM === num)
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

export default CombinedDataPage
