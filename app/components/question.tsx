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
  const shuffledAnswers = useRef<any>([]);
  useEffect(() => {
    // Assuming correct_answer and incorrect_answers are available here
    if (shuffledAnswers.current.length === 0) {
      shuffledAnswers.current = _.shuffle([
        correct_answer,
        ...incorrect_answers,
      ]);
    }
  }, [correct_answer, incorrect_answers]);

  const selectAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isComplete) return;
    setSelectedAnswer(e.currentTarget.innerText);
  };

  function htmlDecode(input: string) {
    var doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  }

  const renderAnswers = () => {
    if (type === 'boolean') {
      return (
        <div className='flex flex-col gap-2'>
          <Button
            onClick={selectAnswer}
            variant={selectedAnswer === 'True' ? 'default' : 'outline'}
          >
            True
          </Button>
          <Button
            onClick={selectAnswer}
            variant={selectedAnswer === 'False' ? 'default' : 'outline'}
          >
            False
          </Button>
        </div>
      );
    } else {
      return (
        <div className='flex flex-col gap-2'>
          {shuffledAnswers.current.map((answer: string) => (
            <Button
              onClick={selectAnswer}
              variant={
                selectedAnswer === htmlDecode(answer) ? 'default' : 'outline'
              }
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </Button>
          ))}
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
      <TableCell>{category}</TableCell>
      {/* <TableCell>{type}</TableCell> */}
      <TableCell>{renderAnswers()}</TableCell>
      <TableCell
        className={`${
          isComplete ? 'opacity-100' : 'opacity-0'
        } cursor-default flex justify-center items-center`}
      >
        <Button variant={'destructive'}>
          <span dangerouslySetInnerHTML={{ __html: correct_answer }} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default memo(QuestionCard);
