'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, createContext, useEffect, useMemo } from 'react';

import { DataTable } from '@/components/DataTable';
import { type TableDataT, type Instance, columns } from '@/lib/config/TablesCols';
import uniq from 'lodash/uniq';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CreateInstance from './create/_PageSections/CreateInstance';

export default function Home() {
  const [tableData, setTableData] = useState([]);
  const [activeInstanceId, setActiveInstanceId] = useState('');

  const {
    isPending,
    error,
    data = []
  } = useQuery<Instance[]>({
    queryKey: ['instanceData'],
    queryFn: () => axios.get('http://localhost:3001/instances').then((res) => res.data)
  });

  const tableRows: TableDataT[] = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        name: item.name,
        gpu_type: item.shade_instance_type,
        cloud: item.cloud,
        status: item.status
      })),
    [data]
  );

  const activeInstance = useMemo(
    () => data.find((item) => item.id === activeInstanceId),
    [activeInstanceId, data]
  );

  const regions = useMemo(() => uniq(data.map((item) => item.region)), [data]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Test</div>
      <CreateInstance regions={regions} />
      <DataTable columns={columns} data={tableRows} setActiveInstanceId={setActiveInstanceId} />

      {activeInstance && (
        <div>
          <div>{activeInstance.name}</div>
          <div>{activeInstance.cloud}</div>
        </div>
      )}
    </main>
  );
}
