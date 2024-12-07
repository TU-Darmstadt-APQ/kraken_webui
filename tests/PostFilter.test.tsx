import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PostFilter from '../src/app/components/PostFilter'; 
import { Filter } from '@/app/types';

describe('PostFilter', () => {
  const setFilter = jest.fn();
  const filter: Filter = { query: '', sort: 'title' };

  beforeEach(() => {
    render(<PostFilter filter={filter} setFilter={setFilter} />);
  });

  it('should update query', () => {
    const input = document.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(setFilter).toHaveBeenCalledWith({ query: 'test', sort: 'title' });
  });

  it('should update sort', () => {
    const select = document.querySelector('select') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'description' } });
    expect(setFilter).toHaveBeenCalledWith({ query: '', sort: 'description' });
  });

  it('should not call setFilter if query is unchanged', () => {
    const input = document.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'title' } });
    fireEvent.change(input, { target: { value: 'title' } });
    expect(setFilter).toHaveBeenCalledTimes(1);
  });

  it('should not call setFilter if sort is unchanged', () => {
    const select = document.querySelector('select') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'date_created' } });
    fireEvent.change(select, { target: { value: 'date_created' } });
    expect(setFilter).toHaveBeenCalledTimes(1);
  });

  it('should update both query and sort', () => {
    const input = document.querySelector('input') as HTMLInputElement;
    const select = document.querySelector('select') as HTMLSelectElement;
    fireEvent.change(input, { target: { value: 'new query' } });
    fireEvent.change(select, { target: { value: 'id' } });
    expect(setFilter).toHaveBeenCalledWith({ query: 'new query', sort: 'id' });
  });

  it('should not call setFilter if no changes', () => {
    expect(setFilter).not.toHaveBeenCalled();
  });

  it('should clear query when input is cleared', () => {
    const input = document.querySelector('input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(setFilter).toHaveBeenCalledWith({ query: '', sort: 'title' });
  });
});

