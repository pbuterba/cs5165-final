import React from 'react'

export default function FeatureImportancesCard({ importances }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-6">
      <h2 className="text-xl font-semibold mb-2">Feature Importances While Training Model</h2>
      <ul className="list-disc list-inside">
        {Object.entries(importances).map(([feat, imp]) => (
          <li key={feat}>
            <strong>{feat}</strong>: {(imp * 100).toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  )
}
