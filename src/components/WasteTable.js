import React, { useState } from 'react';

const WasteTable = ({ data, colors, selectedWasteTypes }) => {
    const [sortConfig, setSortConfig] = useState({
        key: 'month',
        direction: 'ascending'
    });

    // handle sorting
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // apply sorting to data
    const sortedData = [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    // get visible columns
    const visibleColumns = ['month', ...Object.keys(selectedWasteTypes).filter(type => selectedWasteTypes[type])];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        {visibleColumns.map(column => (
                            <th
                                key={column}
                                className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort(column)}
                            >
                                {column === 'month' ? 'Month' : column.charAt(0).toUpperCase() + column.slice(1)}
                                {sortConfig.key === column && (
                                    <span className="ml-1">
                                        {sortConfig.direction === 'ascending' ? '▲' : '▼'}
                                    </span>
                                )}
                            </th>
                        ))}
                        <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, i) => {
                        const rowTotal = Object.keys(selectedWasteTypes)
                            .filter(type => selectedWasteTypes[type])
                            .reduce((sum, type) => sum + row[type], 0);

                        return (
                            <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                {visibleColumns.map(column => (
                                    <td key={column} className="px-4 py-2 border-b border-gray-200 text-sm">
                                        {column === 'month' ? row[column] : (
                                            <div className="flex items-center">
                                                <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: colors[column] }}></span>
                                                {row[column]} kg
                                            </div>
                                        )}
                                    </td>
                                ))}
                                <td className="px-4 py-2 border-b border-gray-200 text-sm font-semibold">
                                    {rowTotal} kg
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-100">
                        <td className="px-4 py-2 border-b border-gray-200 text-sm font-semibold">Total</td>
                        {visibleColumns.slice(1).map(column => (
                            <td key={column} className="px-4 py-2 border-b border-gray-200 text-sm font-semibold">
                                {data.reduce((sum, row) => sum + row[column], 0)} kg
                            </td>
                        ))}
                        <td className="px-4 py-2 border-b border-gray-200 text-sm font-semibold">
                            {data.reduce((sum, row) => {
                                return sum + Object.keys(selectedWasteTypes)
                                    .filter(type => selectedWasteTypes[type])
                                    .reduce((rowSum, type) => rowSum + row[type], 0);
                            }, 0)} kg
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default WasteTable;