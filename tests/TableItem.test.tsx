/* eslint-disable no-undef */
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
    date_created: `${2024}-12-10`, // Format as "YYYY-MM-DD"
    date_modified: `${2024}-12-11`, // Format as "YYYY-MM-DD"
    enabled: String(true), // Convert the boolean to a string
    label: 'Test Label',
    uid: 'uuid-123',
    config: JSON.stringify({ key1: 'value1' }), // Convert the object to a JSON string
    on_connect: 'test-connect',
  };

  // Mock functions for callbacks
  const mockRemove = jest.fn();

  it('calls remove callback when remove button is clicked', () => {
    render(
      <table>
        <tbody>
          <TableItem
            post={mockPost}
            remove={mockRemove}  // Only pass remove, since edit is no longer part of TableItemProps
          />
        </tbody>
      </table>
    );

    // Trigger the remove button click
    const removeButton = screen.getByText('Delete');
    fireEvent.click(removeButton);

    // Check if the remove function was called with the correct post
    expect(mockRemove).toHaveBeenCalledWith(mockPost);
  });
});




