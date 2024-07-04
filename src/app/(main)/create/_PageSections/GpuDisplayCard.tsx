import { Card, CardHeader } from '@/components/ui/card';
import { useState } from 'react';

const GPUDisplayCard = ({ instance_type, activeInstance }: any) => {
  const [availableGpus, setGPUs] = useState({ 1: false, 2: false, 4: false, 8: false });
  const [noneAvailable, setNoneAvailable] = useState(false);

  const { gpu_type, instances } = instance_type;

  //iterate array and set available GPUs

  //console.log(activeInstance);
  const isActiveInstance = gpu_type === activeInstance?.gpu_type;
  //console.log(isActiveInstance);

  return (
    <>
    {/* <div className="border-4 cursor-pointer">
      <div>{gpu_type}</div>
    </div> */}
      <Card className='min-w-[300px] min-h-[300px]'>
        <CardHeader>{gpu_type}</CardHeader>
      </Card>
      
    
    </>
  );
};

export default GPUDisplayCard;
