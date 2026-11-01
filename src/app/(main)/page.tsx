'use client';
import { fetchAllSheets } from '@/services/sheets.service';
import React, { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllSheets()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  console.table(data);
  console.log(loading);
  console.log(error);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
