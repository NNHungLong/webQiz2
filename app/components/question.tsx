import _ from 'lodash';
import { useEffect, useRef } from 'react';
import { TableRow, TableCell } from '~/components/ui/table';
import { Button } from '~/components/ui/button';

interface QuestionProps {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function QuestionCard({
  category,
  type,
  difficulty,
  question,
  correct_answer,
  incorrect_answers,
}: QuestionProps) {
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
  return (
    <TableRow>
      <TableCell>
        <span dangerouslySetInnerHTML={{ __html: question }} />
      </TableCell>
      <TableCell>{difficulty}</TableCell>
      <TableCell>{category}</TableCell>
      {/* <TableCell>{type}</TableCell> */}
      <TableCell>
        {type === 'boolean' ? (
          <div className='flex flex-col gap-2'>
            <Button>True</Button>
            <Button>False</Button>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            {shuffledAnswers.current.map((answer: string) => (
              <Button>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </Button>
            ))}
          </div>
        )}
      </TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
