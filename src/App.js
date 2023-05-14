import React from 'react';
import FindingsTable from './FindingsTable';
import './style.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h2>Best Security Data Platform</h2>
        <FindingsTable />
      </div>
    </QueryClientProvider>
  );
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
