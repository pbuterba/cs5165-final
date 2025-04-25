import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function TopSpendersChart({ data, topN = 10 }) {
  // sort by predicted_CLV descending and take topN
  const top = [...data]
    .sort((a, b) => b.predicted_CLV - a.predicted_CLV)
    .slice(0, topN)
    .map(r => ({
      HSHD_NUM: r.HSHD_NUM,
      CLV: parseFloat(r.predicted_CLV.toFixed(2))
    }))

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">
        Top {topN} Predicted CLV Households
      </h2>
      <BarChart width={700} height={300} data={top}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="HSHD_NUM" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="CLV" />
      </BarChart>
    </div>
  )
}
