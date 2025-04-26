// src/pages/CombinedDataPage.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import hh10CsvUrl from '../data/hh10.csv'

const averageBasketMetrics = [
  { metric: 'Average Basket Price', value: '$57.30' },
  { metric: 'Average Basket Size (units)', value: '11.85' }
]

const tableWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  margin: '2em 0',
}

const tableStyle = {
  borderCollapse: 'collapse',
  margin: '0 auto',
  textAlign: 'center',
}

const thTdStyle = {
  border: '1px solid #999',
  padding: '0.5em 1em',
  textAlign: 'center',
}

function CombinedDataPage() {
  const [data, setData]           = useState([])
  const [household, setHousehold] = useState('')
  const [record, setRecord]       = useState(null)
  const [csvLines, setCsvLines]   = useState([])

  useEffect(() => {
    axios.get('/data/combined_data.json')
      .then(res => setData(res.data))
      .catch(() => setData([]))
  }, [])

  useEffect(() => {
    fetch(hh10CsvUrl)
      .then(res => res.text())
      .then(text => setCsvLines(text.trim().split('\n')))
      .catch(err => console.error(err))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const num = parseInt(household, 10)
    const found = data.find(item => item.HSHD_NUM === num)
    setRecord(found || { notFound: true })
  }

  const renderTable = (captionText, headers, rows) => (
    <div style={tableWrapperStyle}>
      <table style={tableStyle}>
        <caption style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '0.5em' }}>
          {captionText}
        </caption>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} style={{ ...thTdStyle, background: '#eee' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={thTdStyle}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  // Summary table data
  const summaryHeaders = ['Metric', 'Value']
  const summaryRows = averageBasketMetrics.map(({ metric, value }) => [metric, value])

  // Raw CSV table data
  let csvTable = null
  if (csvLines.length > 1) {
    const [headerLine, ...dataLines] = csvLines
    const csvHeaders = headerLine.split(',')
    const csvRows = dataLines.map(line => line.split(','))
    csvTable = renderTable('Household 10 Raw Data', csvHeaders, csvRows)
  }

  return (
    <div style={{ padding: '1em' }}>
      <h2 style={{ fontSize: '1.5em', marginBottom: '0.5em' }}>
        Lookup Household Record
      </h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1em' }}>
        <label style={{ display: 'block', marginBottom: '0.5em' }}>
          Household Number:{' '}
          <input
            type="number"
            value={household}
            onChange={e => setHousehold(e.target.value)}
            style={{ border: '1px solid #ccc', padding: '0.5em', borderRadius: '4px' }}
            required
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '0.5em 1em',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </form>

      {record && record.notFound && (
        <p style={{ color: '#b91c1c' }}>
          No record found for household #{household}
        </p>
      )}

      {record && !record.notFound && (
        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={{ ...thTdStyle, background: '#eee' }}>Field</th>
                <th style={{ ...thTdStyle, background: '#eee' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(record).map(([key, value]) => (
                <tr key={key}>
                  <td style={thTdStyle}>{key}</td>
                  <td style={thTdStyle}>{value != null ? value.toString() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {renderTable('Household 10 data', summaryHeaders, summaryRows)}
      {csvTable}
    </div>
  )
}

export default CombinedDataPage
