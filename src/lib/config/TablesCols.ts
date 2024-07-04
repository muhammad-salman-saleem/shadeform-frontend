'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TableDataT = {
  id: string;
  name: string;
  gpu_type: string;
  status: 'pending' | 'active';
  cloud: string;
};

export type Instance = {
  id: string;
  name: string;
  gpu_type: string;
  cloud: string;
  region: string;
  shade_instance_type: string;
  cloud_instance_type: string;
  cloud_assigned_id: string;
  shade_cloud: boolean;
  configuration: string;
  ip: string;
  ssh_user: string;
  ssh_port: number;
  status: 'pending' | 'active';
  cost_estimate: number;
  hourly_price: number;
  launch_configuration: string;
  created_at: string;
  deleted_at: string;
};

export const columns: ColumnDef<TableDataT>[] = [
  {
    accessorKey: 'id',
    header: 'Id'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: 'cloud',
    header: 'Cloud'
  },
  {
    accessorKey: 'gpu_type',
    header: 'Gpu Type'
  }
];
