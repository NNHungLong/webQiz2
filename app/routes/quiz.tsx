import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const difficulty = url.searchParams.get('difficulty');
  const type = url.searchParams.get('type');
  const amount = url.searchParams.get('amount');
  const duration = url.searchParams.get('duration');
  // let params = '';
  // const response = await fetch('https://opentdb.com/api.php?')
  return null;
};

export default function Quiz() {
  return <h1>Quiz</h1>;
}
