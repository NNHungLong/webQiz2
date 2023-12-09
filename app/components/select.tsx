'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import * as ScrollArea from '@radix-ui/react-scroll-area';

interface SelectProps {
  items: {
    id: string;
    name: string;
  }[];
  name: string;
  title: string;
  className?: string;
}

export function SelectTag({ name, title, items, className }: SelectProps) {
  return (
    <div className={className || ''}>
      <Select name={name}>
        <SelectTrigger>
          <SelectValue placeholder={title} />
        </SelectTrigger>
        <SelectContent className='max-h-[300px]'>
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
