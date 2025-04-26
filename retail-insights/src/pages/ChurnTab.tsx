// src/pages/ChurnAnalysis.tsx
import React, { useEffect, useState } from "react";

const ChurnAnalysis: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/GetData')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Churn Analysis</h1>

      {/* Error Handling */}
      {error && (
        <div className="text-red-500 mb-4">
          Error fetching data: {error}
        </div>
      )}

      {/* Fetched Data */}
      {data.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Fetched Data</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {/* Your original Churn Analysis UI */}
      {/* Summary Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-base">
          This section provides insights into customer churn based on the available data.
        </p>
      </section>

      {/* Visualization Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Visualizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold mb-2">Churn Rate Over Time</h3>
            <div className="h-64 bg-gray-100 flex items-center justify-center">
              Chart Placeholder
            </div>
          </div>
          <div className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold mb-2">Feature Importance</h3>
            <div className="h-64 bg-gray-100 flex items-center justify-center">
              Chart Placeholder
            </div>
          </div>
        </div>
      </section>

      {/* Prediction Results Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Model Predictions</h2>
        <div className="border rounded-lg p-4 shadow">
          <p className="text-base">
            Display model performance metrics (accuracy, precision, recall, etc.) and example predictions here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ChurnAnalysis;
