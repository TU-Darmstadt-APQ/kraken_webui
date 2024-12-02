import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides additional matchers for assertions
import PostFilter from './PostFilter';

// Mock the PostFilterProps type
const mockSetFilter = jest.fn(); // Mock function for `setFilter`

describe('PostFilter Component', () => {
  const filter = { query: '', sort: 'title' }; // Initial filter state

  beforeEach(() => {
    // Reset mock function before each test
    mockSetFilter.mockClear();
  });

  it('renders the input and select components', () => {
    render(<PostFilter filter={filter} setFilter={mockSetFilter} />);

    // Assert the presence of input field
    const inputElement = screen.getByPlaceholderText('Search for...');
    expect(inputElement).toBeInTheDocument();

    // Assert the presence of dropdown
    const selectElement = screen.getByDisplayValue('Sort by:');
    expect(selectElement).toBeInTheDocument();
  });

  it('calls setFilter with updated query when input changes', () => {
    render(<PostFilter filter={filter} setFilter={mockSetFilter} />);

    const inputElement = screen.getByPlaceholderText('Search for...');

    // Simulate typing in the input field
    fireEvent.change(inputElement, { target: { value: 'test query' } });

    // Assert that setFilter was called with the updated filter state
    expect(mockSetFilter).toHaveBeenCalledWith({
      query: 'test query',
      sort: 'title',
    });
  });

  it('calls setFilter with updated sort option when dropdown changes', () => {
    render(<PostFilter filter={filter} setFilter={mockSetFilter} />);

    const selectElement = screen.getByDisplayValue('Sort by:');

    // Simulate selecting a new sort option
    fireEvent.change(selectElement, { target: { value: 'description' } });

    // Assert that setFilter was called with the updated filter state
    expect(mockSetFilter).toHaveBeenCalledWith({
      query: '',
      sort: 'description',
    });
  });
});