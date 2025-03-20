import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HandIcon from '../index';

describe('HandIcon test', () => {
  test('renders SVG component', () => {
    render(<HandIcon data-testid="hand-icon" />);
    const svgElement = screen.getByTestId('hand-icon');

    expect(svgElement).toBeInTheDocument();
    expect(svgElement.tagName).toBe('svg');
    expect(svgElement).toHaveClass('HandIcon');
  });

  test('received additional props', () => {
    const testId = 'custom-hand-icon';
    const className = 'custom-class';
    const width = '200';
    const height = '150';

    render(
      <HandIcon
        data-testid={testId}
        className={`${className} HandIcon`}
        width={width}
        height={height}
        aria-label="hand icon"
      />,
    );

    const svgElement = screen.getByTestId(testId);

    expect(svgElement).toHaveAttribute('width', width);
    expect(svgElement).toHaveAttribute('height', height);
    expect(svgElement).toHaveAttribute('aria-label', 'hand icon');
    expect(svgElement).toHaveClass('custom-class');
    expect(svgElement).toHaveClass('HandIcon');
  });
});
