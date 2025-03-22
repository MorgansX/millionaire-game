'use client';
import React from 'react';
import { SummaryAmount } from '@/components/molecules/SummaryAmount';
import { QuestionContainer } from '@/components/molecules/QuestionContainer';
import { Hamburger } from '@/components/atoms/Hamburger';
import { useGameController } from '@/components/pages/Game/useGameController';
import './styles.css';

export const GamePage: React.FC = () => {
  const controller = useGameController();
  return (
    <div className="GameContainer">
      <Hamburger />
      <QuestionContainer
        question={controller.currentQuestion}
        onAnswerClick={controller.onAnswerClick}
      />
      <SummaryAmount
        amountOptions={controller.amountProgressList}
        currency={controller.currency}
        totalQuestionsCount={controller.totalQuestions}
      />
    </div>
  );
};
