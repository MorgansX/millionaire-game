import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Typography from '../index';

describe('Typography Component', () => {
  describe('Base Typography Component', () => {
    test('renders children', () => {
      render(<Typography>Some text</Typography>);
      expect(screen.getByText('Some text')).toBeInTheDocument();
    });

    test('used <div/> by default', () => {
      render(<Typography>Some text</Typography>);
      const element = screen.getByTestId('typography');
      expect(element.tagName).toBe('DIV');
    });

    test('used proper component', () => {
      render(<Typography component="section">some text</Typography>);
      const element = screen.getByTestId('typography');
      expect(element.tagName).toBe('SECTION');
    });

    test('added css class', () => {
      render(<Typography className="custom-class">some text</Typography>);
      const element = screen.getByTestId('typography');
      expect(element).toHaveClass('custom-class');
    });
  });

  describe('Typography.h1', () => {
    test('renders h1 element', () => {
      render(<Typography.h1>h1</Typography.h1>);
      const element = screen.getByTestId('typography-h1');
      expect(element.tagName).toBe('H1');
    });

    test('using HeadingPrimary class', () => {
      render(<Typography.h1>h1</Typography.h1>);
      const element = screen.getByTestId('typography-h1');
      expect(element).toHaveClass('HeadingPrimary');
    });
  });

  describe('Typography.h3', () => {
    test('renders h3 element', () => {
      render(<Typography.h3>h3</Typography.h3>);
      const element = screen.getByTestId('typography-h3');
      expect(element.tagName).toBe('H3');
    });

    test('applied HeadingSub class', () => {
      render(<Typography.h3>h3</Typography.h3>);
      const element = screen.getByTestId('typography-h3');
      expect(element).toHaveClass('HeadingSub');
    });
  });

  describe('Typography.text', () => {
    test('renders p element', () => {
      render(<Typography.text>p</Typography.text>);
      const element = screen.getByTestId('typography-p');
      expect(element.tagName).toBe('P');
    });

    test('using passed class name', () => {
      render(<Typography.text className="text-class">p</Typography.text>);
      const element = screen.getByTestId('typography-p');
      expect(element).toHaveClass('text-class');
    });
  });
});
