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

    // Check if input fields are rendered
    expect(screen.getByPlaceholderText('Sensor Host UUID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Topic')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Unit')).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Sensor Host UUID'), { target: { value: 'uuid-1234' } });
    fireEvent.change(screen.getByPlaceholderText('Topic'), { target: { value: 'Topic 1' } });
    fireEvent.change(screen.getByPlaceholderText('Unit'), { target: { value: 'Unit 1' } });

    // Verify the input values
    expect(screen.getByPlaceholderText('Sensor Host UUID')).toHaveValue('uuid-1234');
    expect(screen.getByPlaceholderText('Topic')).toHaveValue('Topic 1');
    expect(screen.getByPlaceholderText('Unit')).toHaveValue('Unit 1');
  });

  it('calls create when submitting the form with new data', () => {
    renderPostForm({ create: mockCreate, edit: mockEdit });

    // Fill the form with values
    fireEvent.change(screen.getByPlaceholderText('Sensor Host UUID'), { target: { value: 'uuid-1234' } });
    fireEvent.change(screen.getByPlaceholderText('Topic'), { target: { value: 'Topic 1' } });
    fireEvent.change(screen.getByPlaceholderText('Unit'), { target: { value: 'Unit 1' } });
    fireEvent.change(screen.getByPlaceholderText('Driver'), { target: { value: 'driver-1' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Description of post' } });

    // Submit the form (click the button)
    fireEvent.click(screen.getByText('Add new sensor'));

    // Check if the create function is called
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
      uuid: 'uuid-1234',
      topic: 'Topic 1',
      unit: 'Unit 1',
      driver: 'driver-1',
      description: 'Description of post',
    }));
  });

  it('calls edit when submitting the form with postToEdit prop', () => {
    const postToEdit = {
      id: 1,
      uuid: 'uuid-1234',
      topic: 'Topic 1',
      unit: 'Unit 1',
      driver: 'driver-1',
      description: 'Description of post',
    };

    // Pass postToEdit as a prop
    renderPostForm({ create: mockCreate, edit: mockEdit, postToEdit });

    // Check initial values from postToEdit
    expect(screen.getByPlaceholderText('Sensor Host UUID')).toHaveValue('uuid-1234');
    expect(screen.getByPlaceholderText('Topic')).toHaveValue('Topic 1');
    expect(screen.getByPlaceholderText('Unit')).toHaveValue('Unit 1');

    // Submit the form (click the button)
    fireEvent.click(screen.getByText('Save changes'));

    // Check if the edit function is called
    expect(mockEdit).toHaveBeenCalledTimes(1);
    expect(mockEdit).toHaveBeenCalledWith(expect.objectContaining({
      uuid: 'uuid-1234',
      topic: 'Topic 1',
      unit: 'Unit 1',
      driver: 'driver-1',
      description: 'Description of post',
    }));
  });
});