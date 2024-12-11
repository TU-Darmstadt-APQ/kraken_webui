import { render, screen, fireEvent } from '@testing-library/react';
import TableItem from '@/app/components/TableItem';
import { Post } from '@/app/types';
import '@testing-library/jest-dom';

describe('TableItem Component', () => {
  // Mock data for the post object
  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    description: 'Test Description',
    date_created: { day: 10, month: 12, year: 2024 },
    date_modified: { day: 11, month: 12, year: 2024 },
    enabled: true,
    label: 'Test Label',
    uuid: 'uuid-123',
    config: { key1: 'value1' },
    on_connect: 'test-connect',
    topic: 'test-topic',
    unit: 'unit1',
    driver: 'test-driver',
  };

  const selectedColumns = {
    id: true,
    title: true,
    description: true,
    date_created: true,
    date_modified: true,
    enabled: true,
    label: true,
    uuid: true,
    config: true,
    on_connect: true,
  };

  // Mock functions for callbacks
  const mockRemove = jest.fn();
  const mockEdit = jest.fn();

  it('calls edit callback when edit button is clicked', () => {
    render(
      <table>
        <tbody>
          <TableItem
            post={mockPost}
            remove={mockRemove}
            edit={mockEdit}
            selectedColumns={selectedColumns}
          />
        </tbody>
      </table>
    );

    // Trigger the edit button click
    const editButton = screen.getByAltText('Edit');
    fireEvent.click(editButton);

    // Check if the edit function was called with the correct post
    expect(mockEdit).toHaveBeenCalledWith(mockPost);
  });

  it('calls remove callback when remove button is clicked', () => {
    render(
      <table>
        <tbody>
          <TableItem
            post={mockPost}
            remove={mockRemove}
            edit={mockEdit}
            selectedColumns={selectedColumns}
          />
        </tbody>
      </table>
    );

    // Trigger the remove button click
    const removeButton = screen.getByAltText('Delete');
    fireEvent.click(removeButton);

    // Check if the remove function was called with the correct post
    expect(mockRemove).toHaveBeenCalledWith(mockPost);
  });
});