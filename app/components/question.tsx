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
  return (
    <div>
      <h1>
        Question: <span dangerouslySetInnerHTML={{ __html: question }} />
      </h1>
      <h1>category: {category}</h1>
      <h1>difficulty: {difficulty}</h1>
      {/* <h1>type: {type}</h1> */}
    </div>
  );
}
