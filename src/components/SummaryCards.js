import React from 'react';

const SummaryCards = ({ wasteTotals, wasteColors, selectedWasteTypes }) => {
    const totalWaste = Object.keys(wasteTotals)
        .filter(type => selectedWasteTypes[type])
        .reduce((sum, type) => sum + wasteTotals[type], 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow col-span-1 xl:col-span-1">
                <h3 className="text-lg font-semibold text-gray-700">Total Waste</h3>
                <p className="text-3xl font-bold">{totalWaste} kg</p>
            </div>

            {Object.keys(wasteTotals).map(type => (
                selectedWasteTypes[type] && (
                    <div
                        key={type}
                        className="bg-white p-6 rounded-lg shadow"
                        style={{ borderLeft: `4px solid ${wasteColors[type]}` }}
                    >
                        <h3 className="text-lg font-semibold text-gray-700">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </h3>
                        <p className="text-2xl font-bold">{wasteTotals[type]} kg</p>
                        <p className="text-sm text-gray-500">
                            {Math.round(wasteTotals[type] / totalWaste * 100)}% of total
                        </p>
                    </div>
                )
            ))}
        </div>
    );
};

export default SummaryCards;