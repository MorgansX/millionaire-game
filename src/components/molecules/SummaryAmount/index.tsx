import React from 'react';
import { HexagonAmount } from '@/components/atoms/HexagonItem';
import { RewardListProps } from '@/types';
import './styles.css';

type SummaryAmountProps = {
  amountOptions: Array<RewardListProps>;
  currency: string;
  totalQuestionsCount: number;
};

export const SummaryAmount: React.FC<SummaryAmountProps> = ({ amountOptions, currency }) => (
  <section className="GameAmountScoreSection">
    <div className={'ScoreContainer'}>
      {amountOptions.map((option) => (
        <HexagonAmount
          key={option.level}
          isActive={option.isActive}
          isPrev={option.visited}
          amount={option.reward}
          currency={currency}
        />
      ))}
    </div>
  </section>
);
