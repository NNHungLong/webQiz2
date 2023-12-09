import _ from 'lodash';
import { useEffect, useRef, useState, memo } from 'react';
import { TableRow, TableCell } from '~/components/ui/table';
import { Button } from '~/components/ui/button';

interface QuestionProps {
  isComplete: boolean;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

function QuestionCard({
  category,
  type,
  difficulty,
  question,
  correct_answer,
  incorrect_answers,
  isComplete,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  useEffect(() => {
    setShuffledAnswers(_.shuffle([correct_answer, ...incorrect_answers]));
  }, [correct_answer, incorrect_answers]);
  const renderAnswers = () => {
    if (type === 'boolean') {
      return (
        <div className='flex flex-col gap-2'>
          <Button
            onClick={() => {
              if (isComplete) return;
              if ('True' === correct_answer) {
              } else {
              }
              setSelectedAnswer('True');
            }}
            variant={selectedAnswer === 'True' ? 'default' : 'outline'}
          >
            True
          </Button>
          <Button
            onClick={() => {
              if (isComplete) return;
              if ('False' === correct_answer) {
              } else {
              }
              setSelectedAnswer('False');
            }}
            variant={selectedAnswer === 'False' ? 'default' : 'outline'}
          >
            False
          </Button>
        </div>
      );
    } else {
      return (
        <div className='flex flex-col gap-2'>
          {shuffledAnswers.map((answer: string) => {
            return (
              <Button
                className='h-auto'
                onClick={() => {
                  if (isComplete) return;
                  if (answer === correct_answer) {
                  } else {
                  }
                  setSelectedAnswer(answer);
                }}
                variant={selectedAnswer === answer ? 'default' : 'outline'}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </Button>
            );
          })}
        </div>
      );
    }
  };
  return (
    <TableRow>
      <TableCell>
        <span dangerouslySetInnerHTML={{ __html: question }} />
      </TableCell>
      <TableCell>{difficulty}</TableCell>
      <TableCell className='w-[250px]'>
        {<span dangerouslySetInnerHTML={{ __html: category }} />}
      </TableCell>
      <TableCell>{renderAnswers()}</TableCell>
      <TableCell
        className={`${
          isComplete ? 'opacity-100' : 'opacity-0'
        } cursor-default flex justify-center items-center`}
      >
        <Button
          variant={
            selectedAnswer === correct_answer ? 'correct' : 'destructive'
          }
        >
          {selectedAnswer === correct_answer ? 'Correct' : 'Incorrect'}
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default memo(QuestionCard);
