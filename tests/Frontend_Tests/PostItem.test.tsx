import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import PostItem from '@/app/components/PostItem'; // Adjust the import path accordingly
import '@testing-library/jest-dom'; // Import jest-dom to enable matchers like `toBeInTheDocument`
// Mocking the remove function passed as props
const mockRemove = jest.fn();

// Mock post data
const mockPost = {
  id: 1,
  title: 'Test Post Title',
  description: 'Test post description',
};

const mockNumber = 1;

afterEach(() => {
  cleanup(); // Clean up the DOM after each test
});

describe('PostItem component', () => {
  it('renders correctly with post data', () => {
    render(<PostItem number={mockNumber} post={mockPost} remove={mockRemove} />);

    // Check if title and description are displayed
    expect(screen.getByText('1. Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('Test post description')).toBeInTheDocument();
  });

  it('calls remove function when delete button is clicked', () => {
    render(<PostItem number={mockNumber} post={mockPost} remove={mockRemove} />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Check if remove function is called once with the correct post
    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith(mockPost);
  });

  // New test: Check if Edit button is rendered
  it('renders the "Edit" button', () => {
    render(<PostItem number={mockNumber} post={mockPost} remove={mockRemove} />);
    const editButton = screen.getByText('Edit');
    expect(editButton).toBeInTheDocument(); // Ensure the "Edit" button is rendered
  });

  // New test: Check if Delete button is rendered
  it('renders the "Delete" button', () => {
    render(<PostItem number={mockNumber} post={mockPost} remove={mockRemove} />);
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument(); // Ensure the "Delete" button is rendered
  });

  // New test: Check if title and description are inside the right elements
  it('renders post title and description inside the correct elements', () => {
    render(<PostItem number={mockNumber} post={mockPost} remove={mockRemove} />);

    const titleElement = screen.getByText('1. Test Post Title');
    const descriptionElement = screen.getByText('Test post description');

    // Check if title is inside a <strong> element
    expect(titleElement.tagName).toBe('STRONG');
    
    // Check if description is inside a <div> element
    expect(descriptionElement.tagName).toBe('DIV');
  });
});
