import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CLVTable from './components/CLVTable'
import TopSpendersChart from './components/TopSpendersChart'
import FeatureImportancesCard from './components/FeatureImportancesCard'

function App() {
  const [data, setData] = useState([])
  const featureImportances = {
    frequency: 0.924,
    monetary_value: 0.074,
    recency: 0.002,
    T: 0.0005,
  }

  useEffect(() => {
    axios
      .get('/data/clv_data.json')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
   
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      
      
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        
        <h1 className="text-3xl font-bold mb-6 text-center">
          Customer Lifetime Value Analysis
        </h1>
  
        <FeatureImportancesCard importances={featureImportances} />
  
        <div className="w-full flex justify-center my-6">
          <TopSpendersChart data={data} topN={10} />
        </div>
  
        <div className="w-full overflow-x-auto">
          <div className="mx-auto" style={{ maxWidth: '1000px' }}>
            <CLVTable data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
