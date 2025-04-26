import React from 'react'

export default function CLVTable({ data }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">All Households CLV</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="px-2 py-1 border">Household</th>
              <th className="px-2 py-1 border">Frequency</th>
              <th className="px-2 py-1 border">Recency</th>
              <th className="px-2 py-1 border">T</th>
              <th className="px-2 py-1 border">Monetary</th>
              <th className="px-2 py-1 border">Actual CLV</th>
              <th className="px-2 py-1 border">Predicted CLV</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.HSHD_NUM}>
                <td className="px-2 py-1 border">{row.HSHD_NUM}</td>
                <td className="px-2 py-1 border">{row.frequency}</td>
                <td className="px-2 py-1 border">{row.recency}</td>
                <td className="px-2 py-1 border">{row.T}</td>
                <td className="px-2 py-1 border">
                  {row.monetary_value.toFixed(2)}
                </td>
                <td className="px-2 py-1 border">{row.CLV.toFixed(2)}</td>
                <td className="px-2 py-1 border">
                  {row.predicted_CLV.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
