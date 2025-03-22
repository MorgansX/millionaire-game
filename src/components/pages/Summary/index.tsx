'use client';
import React from 'react';
import { PageWrapper } from '@/components/templates/PageWrapper';
import { StartSummaryContent } from '@/components/molecules/StartSummaryContent';
import { summaryPageConfig } from '@/contstants/pages';
import { useAmountState } from '@/store/useAmountState';
import { formatAmount } from '@/utils';

export const SummaryPage: React.FC = () => {
  const amount = useAmountState((state) => state.state);
  const amountCurrency = useAmountState((state) => state.currency);
  const resetAmount = useAmountState((state) => state.resetAmount);

  return (
    <PageWrapper>
      <StartSummaryContent
        subTitle={summaryPageConfig.subTitle}
        title={`${formatAmount(amount)} ${amountCurrency} ${summaryPageConfig.title}`}
        navigateTo={summaryPageConfig.navigateTo}
        buttonTitle={summaryPageConfig.buttonTitle}
        onButtonClick={resetAmount}
      />
    </PageWrapper>
  );
};
