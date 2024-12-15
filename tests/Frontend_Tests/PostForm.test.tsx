import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import PostForm from '@/app/components/PostForm'; // Adjust the import path accordingly
import '@testing-library/jest-dom'; // Import jest-dom to enable matchers like `toBeInTheDocument`

// Mocking the create and edit functions passed as props
const mockCreate = jest.fn();
const mockEdit = jest.fn();

// Helper function to render the PostForm component
const renderPostForm = (props: any) => {
  render(<PostForm {...props} create={mockCreate} edit={mockEdit} />);
};

afterEach(() => {
  cleanup(); // Clean up the DOM after each test
});

describe('PostForm component', () => {
  it('renders correctly and allows input changes', () => {
    renderPostForm({ create: mockCreate, edit: mockEdit });

    // Check if input fields are rendered with the correct placeholder text
    expect(screen.getByPlaceholderText('Name der Sensor')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Beschreibung')).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Name der Sensor'), { target: { value: 'uuid-1234' } });
    fireEvent.change(screen.getByPlaceholderText('Beschreibung'), { target: { value: 'Topic 1' } });

    // Verify the input values
    expect(screen.getByPlaceholderText('Name der Sensor')).toHaveValue('uuid-1234');
    expect(screen.getByPlaceholderText('Beschreibung')).toHaveValue('Topic 1');
  });

  it('calls create when submitting the form with new data', () => {
    renderPostForm({ create: mockCreate, edit: mockEdit });

    // Fill the form with values
    fireEvent.change(screen.getByPlaceholderText('Name der Sensor'), { target: { value: 'uuid-1234' } });
    fireEvent.change(screen.getByPlaceholderText('Beschreibung'), { target: { value: 'Topic 1' } });
    
    // Submit the form (click the button)
    fireEvent.click(screen.getByText('Sensor einfügen'));

    // Check if the create function is called
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
      title: 'uuid-1234',
      description: 'Topic 1',
      id: expect.any(Number), // The ID will be generated dynamically, so we check if it's a number
    }));
  });

  it('calls edit when submitting the form with postToEdit prop', () => {
    const postToEdit = {
      id: 1,
      title: 'uuid-1234',
      description: 'Topic 1',
    };

    // Pass postToEdit as a prop
    renderPostForm({ create: mockCreate, edit: mockEdit, postToEdit });

    // Check initial values from postToEdit
    expect(screen.getByPlaceholderText('Name der Sensor')).toHaveValue('uuid-1234');
    expect(screen.getByPlaceholderText('Beschreibung')).toHaveValue('Topic 1');

    // Submit the form (click the button)
    fireEvent.click(screen.getByText('Sensor einfügen'));

    // Check if the edit function is called
    expect(mockEdit).toHaveBeenCalledTimes(1);
    expect(mockEdit).toHaveBeenCalledWith(expect.objectContaining({
      title: 'uuid-1234',
      description: 'Topic 1',
      id: 1,
    }));
  });
});

