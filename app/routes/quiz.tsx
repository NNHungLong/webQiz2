import { useState, useEffect, useRef } from 'react';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import type { LoaderFunctionArgs } from '@remix-run/node';

import TimeoutClock from '~/components/timeoutClock';
import QuestionCard from '~/components/question';
import {
  Table,
  TableCaption,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Button } from '~/components/ui/button';

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
  try {
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
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function Quiz() {
  const { results, duration } = useLoaderData<LoaderResponse>();
  const [timeLeft, setTimeLeft] = useState(parseInt(duration));
  const [isComplete, setIsComplete] = useState(false);
  const countDownInterval = useRef<any>(null);
  useEffect(() => {
    countDownInterval.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countDownInterval.current);
  }, []);
  const setCountDown = () => {
    countDownInterval.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countDownInterval.current);
  };
  const handleOnSubmit = () => {
    setIsComplete(true);
    clearInterval(countDownInterval.current);
  };
  const handleOnRetry = () => {
    clearInterval(countDownInterval.current);
    setTimeLeft(parseInt(duration));
    setCountDown();
    setIsComplete(false);
  };
  return (
    <div className='p-8'>
      <TimeoutClock timeLeft={timeLeft} />
      <Table className='table-auto p-8 border-gray-500'>
        <TableCaption>
          {/* <h3 className='my-4 h-[20px] font-semibold text-black'>
            {isComplete ? `Result: ${0}/${results.length}` : ''}
          </h3> */}
          <Button
            className='mx-4'
            onClick={handleOnRetry}
            disabled={!isComplete && timeLeft !== 0}
            variant={!isComplete ? 'outline' : 'secondary'}
          >
            Retry
          </Button>
          <Button
            onClick={handleOnSubmit}
            className='mx-4'
            disabled={timeLeft === 0 || isComplete}
          >
            Submit
          </Button>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className=''>Question</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Answers</TableHead>
            <TableHead>Result</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((item, index) => (
            <QuestionCard
              key={item?.index}
              {...item}
              isComplete={isComplete || timeLeft === 0}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
