import React from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const WasteChart = ({ data, colors, selectedWasteTypes, chartType = "bar" }) => {
    // filter out unselected waste types
    const filteredData = data.map(month => {
        const filtered = { month: month.month };
        Object.keys(selectedWasteTypes).forEach(type => {
            if (selectedWasteTypes[type]) {
                filtered[type] = month[type];
            }
        });
        return filtered;
    });

    // generate data for pie chart
    const generatePieData = () => {
        const totals = {};
        Object.keys(selectedWasteTypes).forEach(type => {
            if (selectedWasteTypes[type]) {
                totals[type] = data.reduce((sum, month) => sum + month[type], 0);
            }
        });

        return Object.keys(totals).map(name => ({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            value: totals[name]
        }));
    };

    const renderBarChart = () => (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
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
                        />
                    )
                ))}
            </BarChart>
        </ResponsiveContainer>
    );

    const renderLineChart = () => (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} kg`} />
                <Legend />
                {Object.keys(selectedWasteTypes).map(type => (
                    selectedWasteTypes[type] && (
                        <Line
                            key={type}
                            type="monotone"
                            dataKey={type}
                            stroke={colors[type]}
                            name={type.charAt(0).toUpperCase() + type.slice(1)}
                        />
                    )
                ))}
            </LineChart>
        </ResponsiveContainer>
    );

    const renderPieChart = () => {
        const pieData = generatePieData();
        const selectedTypes = Object.keys(selectedWasteTypes).filter(type => selectedWasteTypes[type]);

        return (
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
                                fill={colors[selectedTypes[index]]}
                            />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} kg`} />
                </PieChart>
            </ResponsiveContainer>
        );
    };

    return (
        <>
            {chartType === "bar" && renderBarChart()}
            {chartType === "line" && renderLineChart()}
            {chartType === "pie" && renderPieChart()}
        </>
    );
};

export default WasteChart;