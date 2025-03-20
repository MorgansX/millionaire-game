import React from 'react';
import { PageWrapper } from '@/components/templates/PageWrapper';
import { StartSummaryContent } from '@/components/molecules/StartSummaryContent';
import { welcomePageConfig } from '@/contstants/pages';

export const WelcomePage: React.FC = () => (
  <PageWrapper isWelcomePage>
    <StartSummaryContent
      title={welcomePageConfig.title}
      navigateTo={welcomePageConfig.navigateTo}
      buttonTitle={welcomePageConfig.buttonTitle}
    />
  </PageWrapper>
);
