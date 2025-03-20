import React from 'react';
import { PageWrapper } from '@/components/templates/PageWrapper';
import { StartSummaryContent } from '@/components/molecules/StartSummaryContent';
import { summaryPageConfig } from '@/contstants/pages';

export const SummaryPage: React.FC = () => (
  <PageWrapper>
    <StartSummaryContent
      subTitle={summaryPageConfig.subTitle}
      title={summaryPageConfig.title}
      navigateTo={summaryPageConfig.navigateTo}
      buttonTitle={summaryPageConfig.buttonTitle}
    />
  </PageWrapper>
);
