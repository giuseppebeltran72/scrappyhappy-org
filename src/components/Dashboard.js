import React, { useState } from 'react';
import WasteChart from './WasteChart';
import WasteTable from './WasteTable';
import SummaryCards from './SummaryCards';
import RecyclingEntities from './RecyclingEntities';
import { wasteData, wasteTotals, wasteColors, recyclingEntities } from '../data/mockData';

const Dashboard = () => {
  const [selectedWasteTypes, setSelectedWasteTypes] = useState({
    paper: true,
    plastic: true,
    metal: true,
    glass: true,
    eWaste: true,
    organic: true
  });

  const [activeTab, setActiveTab] = useState('collection');

  const toggleWasteType = (type) => {
    setSelectedWasteTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Waste Collection Analytics</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Filter by Waste Type</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(wasteColors).map(type => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full ${selectedWasteTypes[type] 
                ? 'bg-gradient-to-r from-[#0DBADE] to-[#18DCB7] text-white' 
                : 'bg-gray-200 text-gray-700'}`}
              onClick={() => toggleWasteType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <SummaryCards 
        wasteTotals={wasteTotals} 
        wasteColors={wasteColors}
        selectedWasteTypes={selectedWasteTypes}
      />
      
      {/* tab navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'collection'
                ? 'border-[#18DCB7] text-[#0DBADE]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('collection')}
          >
            Collection Data
          </button>
          <button
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'recycling'
                ? 'border-[#18DCB7] text-[#0DBADE]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('recycling')}
          >
            Recycling Entities
          </button>
        </nav>
      </div>
      
      {/* collection data tab */}
      {activeTab === 'collection' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Monthly Collection Trends</h2>
              <WasteChart 
                data={wasteData} 
                colors={wasteColors}
                selectedWasteTypes={selectedWasteTypes}
              />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Waste Distribution</h2>
              <WasteChart 
                data={wasteData} 
                colors={wasteColors}
                selectedWasteTypes={selectedWasteTypes}
                chartType="pie"
              />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Collection Data</h2>
            <WasteTable 
              data={wasteData} 
              colors={wasteColors}
              selectedWasteTypes={selectedWasteTypes}
            />
          </div>
        </>
      )}
      
      {/* recycling entities tab */}
      {activeTab === 'recycling' && (
        <RecyclingEntities 
          recyclingEntities={recyclingEntities}
          colors={wasteColors}
          selectedWasteTypes={selectedWasteTypes}
        />
      )}
    </div>
  );
};

export default Dashboard;