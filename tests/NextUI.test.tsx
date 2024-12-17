import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '@nextui-org/react';

test('renders NextUI button', () => {
  const { getByRole } = render(<Button>Hello</Button>);
  expect(getByRole('button')).toHaveTextContent('Hello');
});
