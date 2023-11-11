import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';

import TimeoutClock from '~/components/timeoutClock';
import QuestionCard from '~/components/question';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

interface ResultItem {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface LoaderResponse {
  response_code: number;
  results: ResultItem[];
  duration: string;
  index?: number;
}

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  let params = new URLSearchParams(request.url);
  let keysForDel: string[] = [];
  params.forEach((value, key) => {
    if (value == '') {
      keysForDel.push(key);
    }
  });
  keysForDel.forEach((key) => {
    params.delete(key);
  });
  const response = await fetch(
    `https://opentdb.com/api.php?${params.toString()}`
  )
    .then((response) => response.json())
    .then((data) => {
      return {
        response: data.response_code,
        results: data.results.map((item: ResultItem, index: number) => ({
          index: index,
          ...item,
        })),
      };
    });
  return {
    response_code: response.response,
    results: response.results,
    duration: params.get('duration'),
  };
};

export default function Quiz() {
  const { results, duration } = useLoaderData<LoaderResponse>();
  const [timeLeft, setTimeLeft] = useState(parseInt(duration));
  const setCountDown = () => {
    let timeLeftInterval = timeLeft;
    const countDown = setInterval(() => {
      if (timeLeftInterval > 0) {
        setTimeLeft((prev) => {
          timeLeftInterval = prev - 1;
          return prev - 1;
        });
      } else {
        clearInterval(countDown);
      }
    }, 1000);
    return () => clearInterval(countDown);
  };
  return (
    <div>
      <TimeoutClock timeLeft={timeLeft} setCountDown={setCountDown} />
      <Table className='table-auto'>
        <TableHeader>
          <TableRow>
            <TableHead className=''>Question</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Category</TableHead>
            {/* <TableHead>Type</TableHead> */}
            <TableHead>Answers</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((item, index) => (
            <QuestionCard key={item?.index || index} {...item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
