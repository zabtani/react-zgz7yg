import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

const URL = './findings.json';

const severityColors = {
  CRITICAL: 'red',
  HIGH: 'orange',
  MEDIUM: 'yellow',
  LOW: 'purple',
};

function FindingsTable() {
  const {
    data: tableData,
    isError,
    isLoading,
  } = useQuery(['getTableData'], () => getTableData());

  return (
    <div>
      <h3>Findings Data</h3>
      {isLoading ? (
        <div>Loading table data...</div>
      ) : isError ? (
        <div>Error fetching table data</div>
      ) : (
        <table>
          <thead>
            <tr>
              {tableData.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row) => (
              <tr key={row.id}>
                {tableData.headers.map((header) => (
                  <td key={header}>
                    {header === 'finding.severity' ? (
                      <SeverityContainer
                        color={severityColors[row.data[header]] || 'black'}
                      >
                        {row.data[header]}
                      </SeverityContainer>
                    ) : (
                      row.data[header]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const getTableData = async () => {
  const response = await fetch(URL);
  const data = await response.json();

  const groupByKey = (tableData, key) => {
    const count = {};
    tableData.rows.forEach((row) => {
      const value = row.data[key];
      if (value) {
        count[value] = (count[value] || 0) + 1;
      }
    });
    return count;
  };

  const headersKeys = data.rows.reduce((keys, row) => {
    Object.keys(row.data).forEach((key) => {
      if (typeof row.data[key] !== 'boolean') keys.add(key);
    });
    return keys;
  }, new Set());
  const tableData = { headers: Array.from(headersKeys), rows: data.rows };

  console.log(groupByKey(tableData, 'finding.severity'));
  return tableData;
};

export default FindingsTable;

const SeverityContainer = styled.span`
  color: ${(props) => props.color};
`;
