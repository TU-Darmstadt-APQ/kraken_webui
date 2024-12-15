import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import PostFilter from '@/app/components/PostFilter'; 
import { Filter } from '@/app/types';

describe('PostFilter', () => {
  const setFilter = jest.fn();
  const filter: Filter = { query: '', sort: 'title' };

  let input: HTMLInputElement;
  let select: HTMLSelectElement;

  beforeEach(() => {
    const { container } = render(<PostFilter filter={filter} setFilter={setFilter} />);
    input = container.querySelector<HTMLInputElement>('input')!;
    select = container.querySelector<HTMLSelectElement>('select')!;
  });

  it('should update the query when typed into the input', () => {
    fireEvent.change(input, { target: { value: 'test' } });
    expect(setFilter).toHaveBeenCalledWith({ query: 'test', sort: 'title' });
  });

  it('should update the sort when a new option is selected', () => {
    fireEvent.change(select, { target: { value: 'description' } });
    expect(setFilter).toHaveBeenCalledWith({ query: '', sort: 'description' });
  });

  it('should not call setFilter if no changes are made', () => {
    expect(setFilter).not.toHaveBeenCalled();
  });
  
  
});



