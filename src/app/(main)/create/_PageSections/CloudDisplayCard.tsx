import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const CloudDisplayCard = ({ instance, setActiveConfig }:any) => {
  const [noneAvailable, setNoneAvailable] = useState(false);

  const { gpu_type, cloud, num_gpus,hourly_price,shade_instance_type,availability,memory_in_gb,vcpus,storage_in_gb,nvlink } = instance;

  // iterate availability and check availability
  console.log(instance);

  const isAnyRegionAvailable = (availability:any) => {
    return availability.some((region:any) => region.available);
  };
  //console.log(instance);
  return (
    <>
      <Tabs defaultValue="gpu" className='min-w-[300px] min-h-[300px] m-2 rounded-lg border bg-card text-card-foreground shadow-sm' onClick={() => setActiveConfig(instance)}>
        <div className='item-center w-full justify-center	flex p-2 border-b-[1px]'>
      <TabsList className="grid w-[45%] grid-cols-2">
        <TabsTrigger value="gpu">GPU</TabsTrigger>
        <TabsTrigger value="specs">Specs</TabsTrigger>
      </TabsList>
        </div>
      <TabsContent value="gpu" className='mt-0'>
        <Card className='min-h-[228px] border-none shadow-none'>
          <CardHeader className='py-4'>
            <CardTitle>
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <img className="rounded-full w-6 h-6" src="https://platform.shadeform.ai/_next/image?url=%2Fimages%2Fprovider_logos%2Foblivus.png&w=32&q=75" alt="image description"/>
                <p>{cloud}</p>
                </div>
                {
                isAnyRegionAvailable(availability)?(
                <>
                <span data-tooltip-target="#tooltip-light" className="flex w-2 h-2 me-2 bg-green-500 rounded-full cursor-pointer"></span>
                </>
                )
                :
                (<span className="flex w-2 h-2 me-2 bg-red-500 rounded-full cursor-pointer"></span>)
                }
              </div>
              </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
              <div className='flex justify-between'>
              <p>Price/hr</p>
              <p className='font-bold'>${hourly_price}</p>
              </div>
              <div className='flex justify-between'>
              <p>Instance Type</p>
              <p className='font-bold'>{shade_instance_type}</p>
              </div>
              <div className='flex justify-between'>
              <p>GPU Type</p>
              <p className='font-bold'>{gpu_type}</p>
              </div>
              <div className='flex justify-between'>
              <p>Availability</p>
              <p className='font-bold'>{availability.length} Regions</p>
              </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="specs">
        <Card className='min-h-[220px] border-none shadow-none'>
          <CardContent className="space-y-2">
              <div className='flex justify-between'>
              <p>Total VRAM</p>
              <p className='font-bold'>{memory_in_gb} GB</p>
              </div>
              <div className='flex justify-between'>
              <p>VCPU</p>
              <p className='font-bold'>{vcpus}</p>
              </div>
              <div className='flex justify-between'>
              <p>Storage</p>
              <p className='font-bold'>{storage_in_gb} GB</p>
              </div>
              <div className='flex justify-between'>
              <p>NVLink</p>
              <p className='font-bold'>{nvlink?"Supported":"Not Supported"}</p>
              </div>
              <div className='flex justify-between'>
              <p>GPU Interconnect</p>
              <p className='font-bold'>{instance.configuration.interconnect}</p>
              </div>
              <div className='flex justify-between'>
              <p>No Of GPU</p>
              <p className='font-bold'>{num_gpus}</p>
              </div>
          </CardContent>
        </Card>
      </TabsContent>
      <div className='item-center w-full justify-end	flex p-2 '>
      <Button className='rounded-3xl bg-gray-100 text-black hover:bg-gray-300'>Launch</Button>
      </div>
    </Tabs>
    </>
  );
};

export default CloudDisplayCard;
