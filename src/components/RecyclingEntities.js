import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const RecyclingEntities = ({ recyclingEntities, colors, selectedWasteTypes }) => {
    // process data for charts
    const prepareChartData = () => {
        const entityData = recyclingEntities.map(entity => {
            const data = {
                name: entity.name,
            };

            Object.keys(entity.wasteCollected).forEach(type => {
                if (selectedWasteTypes[type]) {
                    data[type] = entity.wasteCollected[type];
                }
            });

            return data;
        });

        return entityData;
    };

    const prepareDonationData = () => {
        // find landfill entity
        const landfill = recyclingEntities.find(entity => entity.name === "Landfill");

        // sum all other entities (recycling)
        const recycled = {};
        recyclingEntities
            .filter(entity => entity.name !== "Landfill")
            .forEach(entity => {
                Object.keys(entity.wasteCollected).forEach(type => {
                    if (!recycled[type]) recycled[type] = 0;
                    recycled[type] += entity.wasteCollected[type];
                });
            });

        // create comparison data
        const comparisonData = [];

        Object.keys(selectedWasteTypes).forEach(type => {
            if (selectedWasteTypes[type]) {
                const recycledAmount = recycled[type] || 0;
                const landfillAmount = landfill ? landfill.wasteCollected[type] || 0 : 0;
                const total = recycledAmount + landfillAmount;

                if (total > 0) {
                    comparisonData.push({
                        name: type.charAt(0).toUpperCase() + type.slice(1),
                        recycled: recycledAmount,
                        landfill: landfillAmount,
                        recycledPercent: Math.round((recycledAmount / total) * 100)
                    });
                }
            }
        });

        return comparisonData;
    };

    const chartData = prepareChartData();
    const donationData = prepareDonationData();

    // prepare data for pie chart
    const preparePieData = () => {
        let totalRecycled = 0;
        let totalLandfill = 0;

        donationData.forEach(item => {
            totalRecycled += item.recycled;
            totalLandfill += item.landfill;
        });

        return [
            { name: 'Recycled', value: totalRecycled },
            { name: 'Landfill', value: totalLandfill }
        ];
    };

    const pieData = preparePieData();
    const pieColors = ['#18DCB7', '#94A3B8'];

    return (
        <div>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Waste Donated to Recycling Entities</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value} kg`} />
                        <Legend />
                        {Object.keys(selectedWasteTypes).map(type => (
                            selectedWasteTypes[type] && (
                                <Bar
                                    key={type}
                                    dataKey={type}
                                    fill={colors[type]}
                                    name={type.charAt(0).toUpperCase() + type.slice(1)}
                                    stackId="a"
                                />
                            )
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Recycled vs. Landfill Waste</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={donationData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip formatter={(value) => `${value} kg`} />
                            <Legend />
                            <Bar dataKey="recycled" name="Recycled" fill="#18DCB7" />
                            <Bar dataKey="landfill" name="Landfill" fill="#94A3B8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Overall Waste Distribution</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={pieColors[index]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value} kg`} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Recycling Efficiency by Waste Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {donationData.map((item) => (
                        <div
                            key={item.name}
                            className="bg-gray-50 p-4 rounded-lg shadow-sm"
                            style={{ borderLeft: `4px solid ${colors[item.name.toLowerCase()]}` }}
                        >
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <div className="mt-2 h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#0DBADE] to-[#18DCB7]"
                                    style={{ width: `${item.recycledPercent}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between mt-1 text-sm">
                                <span>{item.recycledPercent}% Recycled</span>
                                <span>{item.recycled} kg of {item.recycled + item.landfill} kg</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecyclingEntities;