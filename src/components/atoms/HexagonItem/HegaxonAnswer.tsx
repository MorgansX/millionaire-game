import React from 'react';
import Typography from '@/components/atoms/Typography';
import { Hexagon } from '@/components/atoms/HexagonItem/HexagonSvg/HexagonSvg';
import './styles.css';

type HexagonAnswerProps = {
  answerVariant: string;
  answerText: string;
  onClick: () => void;
};
const HexagonAnswer: React.FC<HexagonAnswerProps> = ({ answerVariant, answerText, onClick }) => (
  <div className="HexagonAnswerWrapper" onClick={onClick}>
    <div className="HexagonContainer">
      <Hexagon answer={answerVariant} variant={'answer'} />
      <div className="TextContainer">
        <div className="TextContent">
          <Typography.text className={'AnswerLetter'}>{answerVariant}</Typography.text>
          <Typography.text className={'AnswerText'}>{answerText}</Typography.text>
        </div>
      </div>
    </div>
  </div>
);

export default HexagonAnswer;
