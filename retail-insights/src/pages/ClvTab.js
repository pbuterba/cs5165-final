import React from 'react';
import FeatureImportancesCard from '../components/FeatureImportancesCard';
import TopSpendersChart      from '../components/TopSpendersChart';
import CLVTable              from '../components/CLVTable';

export default function ClvTab({ data, featureImportances }) {
  return (
    <div className="flex flex-col items-center w-full">
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
  );
}
