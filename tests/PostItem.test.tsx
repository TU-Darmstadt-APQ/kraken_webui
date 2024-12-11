import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import PostItem from '@/app/components/PostItem'; // Adjust the import path accordingly
import '@testing-library/jest-dom'; // Import jest-dom to enable matchers like `toBeInTheDocument`

// Mocking the edit and remove functions passed as props
const mockEdit = jest.fn();
const mockRemove = jest.fn();

// Mock post data
const mockPost = {
  title: 'Test Post Title',
  description: 'Test post description',
};

const mockNumber = 1;

afterEach(() => {
  cleanup(); // Clean up the DOM after each test
});

describe('PostItem component', () => {
  it('renders correctly with post data', () => {
    render(<PostItem number={mockNumber} post={mockPost} edit={mockEdit} remove={mockRemove} />);

    // Check if the post title and description are rendered
    expect(screen.getByText('1. Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('Test post description')).toBeInTheDocument();
  });

  it('calls edit function when edit button is clicked', () => {
    render(<PostItem number={mockNumber} post={mockPost} edit={mockEdit} remove={mockRemove} />);

    // Find the edit button (based on the alt text of the image)
    const editButton = screen.getByAltText('Edit');

    // Click the edit button
    fireEvent.click(editButton);

    // Check if the edit function was called with the correct post
    expect(mockEdit).toHaveBeenCalledTimes(1);
    expect(mockEdit).toHaveBeenCalledWith(mockPost);
  });

  it('calls remove function when delete button is clicked', () => {
    render(<PostItem number={mockNumber} post={mockPost} edit={mockEdit} remove={mockRemove} />);

    // Find the delete button (based on the alt text of the image)
    const deleteButton = screen.getByAltText('Delete');

    // Click the delete button
    fireEvent.click(deleteButton);

    // Check if the remove function was called with the correct post
    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith(mockPost);
  });
});