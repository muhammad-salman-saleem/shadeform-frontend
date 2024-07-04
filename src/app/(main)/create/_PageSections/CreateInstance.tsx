import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const createInstanceSchema = z.object({
  name: z.string(),
  cloud: z.boolean(),
  region: z.string(),
  gpu_type: z.string(),
  configuration: z.string(),
  launch_configuration: z.string()
});

type CreateInstanceT = z.infer<typeof createInstanceSchema>;

interface Props {
  regions: string[];
}

const CreateInstance: React.FC<Props> = (props) => {
  const { regions = [] } = props;

  const form = useForm<CreateInstanceT>({
    resolver: zodResolver(createInstanceSchema),
    defaultValues: {
      name: '',
      cloud: true,
      region: '',
      gpu_type: '',
      configuration: '',
      launch_configuration: ''
    }
  });

  const onSubmit = (data: CreateInstanceT) => {};

  return (
    <div className="w-[420px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <FormControl>
                  <Select onOpenChange={field.onChange}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cloud"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ShadeCloud</FormLabel>
                <FormControl>
                  <div>
                    <Switch
                      value={String(form.watch('cloud'))}
                      checked={form.watch('cloud')}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CreateInstance;
