import React, { PropsWithChildren } from 'react';
import HandIcon from '@/components/atoms/HandIcon';
import './styles.css';

interface PageWrapperProps extends PropsWithChildren {
  isWelcomePage?: boolean;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, isWelcomePage }) => (
  <div className={`PageContainer ${isWelcomePage && 'PageContainer__triangle'}`}>
    <div className={'PageContainer__content'}>
      <div className={'PageContainer__content--icon'}>
        <HandIcon />
      </div>
      <div className={'PageContainer__content--textContent'}>{children}</div>
    </div>
  </div>
);
