import type { MetaFunction } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import { SelectTag } from '~/components/select';
import { Input } from '~/components/ui/input';
import { Form } from '@remix-run/react';
import { Button } from '~/components/ui/button';

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
      <Form onSubmit={submitForm} className=''>
        <SelectTag name='category' title='Category' items={Category} />
        <SelectTag name='difficulty' title='Difficulty' items={Difficulty} />
        <SelectTag name='type' title='Type' items={Type} />
        <Input
          name='amount'
          placeholder='amount'
          type='number'
          min='1'
          max='50'
          className={'w-[300px]'}
          required
        />
        <Input
          name='duration'
          placeholder='duration'
          min='1'
          type='number'
          className={'w-[300px]'}
          required
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </>
  );
}
