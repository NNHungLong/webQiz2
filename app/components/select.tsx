'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

interface SelectProps {
  items: {
    id: string;
    name: string;
  }[];
  name: string;
  title: string;
}

export function SelectTag({ name, title, items }: SelectProps) {
  return (
    <div>
      <Select name={name}>
        <SelectTrigger className='w-[800px]'>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent>
          {items?.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
