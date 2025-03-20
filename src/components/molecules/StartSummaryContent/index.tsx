import React from 'react';
import Typography from '@/components/atoms/Typography';
import { NavigationButton } from '@/components/atoms/NavigationButton';
import { TextContentProps } from '@/types';
import './styles.css';

export const StartSummaryContent: React.FC<TextContentProps> = ({
  title,
  navigateTo,
  buttonTitle,
  subTitle,
}) => (
  <div className={'WelcomePageWrapper'}>
    {subTitle && <Typography.h3>{subTitle}</Typography.h3>}
    <Typography.h1>{title}</Typography.h1>
    <div className={'ButtonWrapper'}>
      <NavigationButton navigateTo={navigateTo}>{buttonTitle}</NavigationButton>
    </div>
  </div>
);
