import type { MetaFunction } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import { SelectTag } from '~/components/select';
import { Input } from '~/components/ui/input';
import { Form } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import * as Label from '@radix-ui/react-label';

interface Category {
  id: string;
  name: string;
}
interface LoaderData {
  Category: Category[];
  Difficulty: typeof Difficulty;
  Type: typeof Type;
}

const Difficulty = [
  {
    id: 'easy',
    name: 'Easy',
  },
  {
    id: 'medium',
    name: 'Medium',
  },
  {
    id: 'hard',
    name: 'Hard',
  },
];

const Type = [
  {
    id: 'multiple',
    name: 'Multiple Choice',
  },
  {
    id: 'boolean',
    name: 'True / False',
  },
];

export const loader: LoaderFunction = async () => {
  const Category = await fetch('https://opentdb.com/api_category.php')
    .then((response) => response.json())
    .then((data) => {
      return data.trivia_categories.map((item: Category) => ({
        id: item?.id?.toString(),
        name: item?.name,
      }));
    });
  return json({ Category, Difficulty, Type });
};

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  const { Category, Difficulty, Type } = useLoaderData<LoaderData>();
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const queryString = new URLSearchParams([
      ...Array.from(formData.entries()),
    ]);
    navigate(`/quiz?${queryString.toString()}`);
  };
  return (
    <>
      <h1 className='text-bold font-bold text-3xl flex justify-center items-center mt-4'>
        Quiz
      </h1>
      <h3 className='text-bold font-semibold text-xl flex justify-center items-center m-4'>
        Select your quiz options to proceed
      </h3>
      <div className='flex justify-center items-center'>
        <Form onSubmit={submitForm}>
          <div className='flex justify-between items-center mt-2 gap-8'>
            <Label.Root htmlFor='category'>Category</Label.Root>
            <SelectTag
              className='min-w-[300px]'
              name='category'
              title='All categories'
              items={Category}
            />
          </div>
          <div className='flex justify-between items-center mt-2 gap-8'>
            <Label.Root htmlFor='difficulty'>Difficulty</Label.Root>
            <SelectTag
              name='difficulty'
              className='min-w-[140px]'
              title='All difficulties'
              items={Difficulty}
            />
          </div>
          <div className='flex justify-between items-center mt-2 gap-8'>
            <Label.Root htmlFor='type'>Type</Label.Root>
            <SelectTag
              className='min-w-[150px]'
              name='type'
              title='All types'
              items={Type}
            />
          </div>
          <div className='flex justify-between items-center mt-2 gap-8'>
            <Label.Root htmlFor='amount'>Amount</Label.Root>
            <Input
              name='amount'
              placeholder='Amount'
              type='number'
              min='1'
              max='50'
              className={'w-[100px]'}
              required
            />
          </div>
          <div className='flex justify-between items-center mt-2 gap-8'>
            <Label.Root htmlFor='duration'>Duration</Label.Root>
            <Input
              name='duration'
              placeholder='(seconds)'
              min='1'
              type='number'
              className={'w-[100px]'}
              required
            />
          </div>
          <div className='flex justify-center items-center mt-4'>
            <Button type='submit'>Start Quiz</Button>
          </div>
        </Form>
      </div>
    </>
  );
}
