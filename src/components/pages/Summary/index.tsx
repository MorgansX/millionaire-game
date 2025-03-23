'use client';
import React from 'react';
import { PageWrapper } from '@/components/templates/PageWrapper';
import { StartSummaryContent } from '@/components/molecules/StartSummaryContent';
import { summaryPageConfig } from '@/constants/pages';
import { useAmountState } from '@/store/useAmountState';
import { formatAmount } from '@/utils';
import GameConfigModule from '@/utils/GameConfig';

export const SummaryPage: React.FC = () => {
  const amount = useAmountState((state) => state.state);
  const gameEngine = GameConfigModule.getInstance();
  const resetAmount = useAmountState((state) => state.resetAmount);

  return (
    <PageWrapper>
      <StartSummaryContent
        subTitle={summaryPageConfig.subTitle}
        title={`${formatAmount(amount)} ${gameEngine.getGameSettings().currency} ${summaryPageConfig.title}`}
        navigateTo={summaryPageConfig.navigateTo}
        buttonTitle={summaryPageConfig.buttonTitle}
        onButtonClick={resetAmount}
      />
    </PageWrapper>
  );
};
