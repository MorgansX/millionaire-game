import React, { ReactNode, ElementType } from 'react';
import './styles.css';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  component?: ElementType;
  'data-testid'?: string;
}

const Typography = ({
  children,
  className,
  component: Component = 'div',
  'data-testid': dataTestId = 'typography',
}: TypographyProps) => {
  return (
    <Component data-testid={dataTestId} className={className}>
      {children}
    </Component>
  );
};

interface TypographyComponent extends React.FC<TypographyProps> {
  h1: React.FC<TypographyProps>;
  h2: React.FC<TypographyProps>;
  h3: React.FC<TypographyProps>;
  text: React.FC<TypographyProps>;
}

const ExtendedTypography = Typography as TypographyComponent;

ExtendedTypography.h1 = ({ children, className }: TypographyProps) => (
  <Typography
    data-testid="typography-h1"
    component="h1"
    className={`HeadingPrimary ${className ? className : ''}`}
  >
    {children}
  </Typography>
);

ExtendedTypography.h3 = ({ children, className }: TypographyProps) => (
  <Typography
    data-testid="typography-h3"
    component="h3"
    className={`HeadingSub ${className ? className : ''}`}
  >
    {children}
  </Typography>
);

ExtendedTypography.text = ({ children, className }: TypographyProps) => (
  <Typography data-testid="typography-p" component="p" className={`${className}`}>
    {children}
  </Typography>
);

export default ExtendedTypography;
