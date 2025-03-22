import Typography from '@/components/atoms/Typography';
import { HexagonAnswer } from '@/components/atoms/HexagonItem';
import React from 'react';
import './styles.css';
import { QuestionProps } from '@/types';

type QuestionContainerProps = {
  question: QuestionProps;
  onAnswerClick: (answer: string) => void;
};

export const QuestionContainer: React.FC<QuestionContainerProps> = ({
  question,
  onAnswerClick,
}) => {
  return (
    <main className="GameContainerQuestions">
      <div className="QuestionContainer">
        <Typography.text className="QuestionText">{question.text}</Typography.text>
      </div>
      <div className="AnswersContainer">
        {question.options.map(({ id, text }) => (
          <HexagonAnswer
            key={id}
            onClick={() => onAnswerClick(id)}
            answerVariant={id}
            answerText={text}
          />
        ))}
      </div>
    </main>
  );
};
