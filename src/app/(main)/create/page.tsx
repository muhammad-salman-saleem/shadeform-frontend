'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import { map, groupBy } from 'lodash';
import LaunchConfigForm from './_PageSections/LaunchConfigForm';
import CloudDisplayCard from './_PageSections/CloudDisplayCard';
import GPUDisplayCard from './_PageSections/GpuDisplayCard';

import CreateInstance from './_PageSections/CreateInstance';

export default function Home() {
  const [activeInstance, setActiveInstance] = useState({ gpu_type: null, instances: [] });
  const [activeConfig, setActiveConfig] = useState(null);

  const queryFn = async () => {
    const res = await axios.get('http://localhost:3001/instances/types');

    //set instance type
    const instances = res.data.instance_types;
    const result = map(groupBy(instances, 'gpu_type'), (instances, gpu_type) => ({
      instances,
      gpu_type
    }));

    //console.log(result);
    return result;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ['instanceData'],
    queryFn
  });

  console.log(activeInstance);

  //scroll into view after each click

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isPending && <div>Loading...</div>}
      {error && <div>An error Occured...</div>}

      <div className="grid grid-cols-5">
        {data?.map((instance_type: any,index:number) => (
          <div key={index} className="m-10 cursor-pointer" onClick={() => setActiveInstance(instance_type)}>
            <GPUDisplayCard instance_type={instance_type} activeInstance={activeInstance} />
          </div>
        ))}
      </div>
      {activeInstance.gpu_type && (
        <div className="grid grid-cols-5 border p-3 rounded-xl">
          {activeInstance?.instances.map((instance,index:number) => (
            //generate unique keys
            <div key={index} className='m-10'>
              <CloudDisplayCard instance={instance} setActiveConfig={setActiveConfig} />
            </div>
          ))}
        </div>
      )}

      {activeConfig && <LaunchConfigForm instance_config={activeConfig} />}
    </main>
  );
}
