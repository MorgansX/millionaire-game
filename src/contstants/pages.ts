import { TextContentProps } from '@/types';
import { ROUTES } from '@/contstants/routes';

export const welcomePageConfig: TextContentProps = {
  title: 'Who wants to be a millionaire?',
  navigateTo: ROUTES.GAME,
  buttonTitle: 'Start',
};

export const summaryPageConfig: TextContentProps = {
  subTitle: 'Total score:',
  title: '$8,000 earned',
  navigateTo: ROUTES.GAME,
  buttonTitle: 'Try again',
};
