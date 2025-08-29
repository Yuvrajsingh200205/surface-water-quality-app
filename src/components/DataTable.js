import React from 'react';

// DataTable component: Renders the fetched data in a table
// Dynamically generates columns based on the first data item's keys
function DataTable({ data }) {
  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  // Get column names from the first record's keys (assuming all records have same structure)
  const columns = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col.replace(/_/g, ' ').toUpperCase()}</th> // Format column names nicely
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col}>{item[col] !== undefined ? item[col] : 'N/A'}</td> // Handle missing values
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;