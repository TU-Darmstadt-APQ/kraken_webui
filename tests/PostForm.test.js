import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For additional matchers
import PostForm from './PostForm';

// Mock functions for create and edit callbacks
const mockCreate = jest.fn();
const mockEdit = jest.fn();

describe('PostForm Component', () => {
  const defaultPost = {
    id: 0,
    title: '',
    description: '',
    date_created: { day: 1, month: 1, year: 2022, nanoseconds: 0 },
    date_modified: { day: 1, month: 1, year: 2022, nanoseconds: 0 },
    enabled: false,
    label: '',
    uuid: '',
    config: {},
    on_connect: undefined,
    topic: '',
    unit: '',
    driver: '',
    port: 0,
    sad: 0,
    pad: 0,
  };

  beforeEach(() => {
    mockCreate.mockClear();
    mockEdit.mockClear();
  });

  it('renders the form with all input fields and a button', () => {
    render(<PostForm create={mockCreate} edit={mockEdit} postToEdit={null} />);

    // Assert the presence of key input fields
    expect(screen.getByPlaceholderText('Sensor Host UUID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Topic')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Unit')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Port')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Pad')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sad')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Driver')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();

    // Assert the presence of the submit button
    expect(screen.getByText('Add new sensor')).toBeInTheDocument();
  });

  it('displays validation alerts when required fields are missing', () => {
    render(<PostForm create={mockCreate} edit={mockEdit} postToEdit={null} />);

    const submitButton = screen.getByText('Add new sensor');

    // Click the submit button without filling in required fields
    fireEvent.click(submitButton);

    // Check for alert calls (you might mock window.alert for cleaner validation in a full setup)
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('calls create with correct data when form is submitted in creation mode', () => {
    render(<PostForm create={mockCreate} edit={mockEdit} postToEdit={null} />);

    // Fill out required fields
    fireEvent.change(screen.getByPlaceholderText('Sensor Host UUID'), { target: { value: 'test-uuid' } });
    fireEvent.change(screen.getByPlaceholderText('Topic'), { target: { value: 'test-topic' } });
    fireEvent.change(screen.getByPlaceholderText('Unit'), { target: { value: 'test-unit' } });
    fireEvent.change(screen.getByPlaceholderText('Driver'), { target: { value: 'test-driver' } });

    const submitButton = screen.getByText('Add new sensor');

    // Submit the form
    fireEvent.click(submitButton);

    // Assert that create was called with correct data
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        uuid: 'test-uuid',
        topic: 'test-topic',
        unit: 'test-unit',
        driver: 'test-driver',
      })
    );
  });

  it('calls edit with updated data when form is submitted in edit mode', () => {
    const postToEdit = { ...defaultPost, uuid: 'edit-uuid', topic: 'edit-topic', unit: 'edit-unit', driver: 'edit-driver' };

    render(<PostForm create={mockCreate} edit={mockEdit} postToEdit={postToEdit} />);

    // Update fields
    fireEvent.change(screen.getByPlaceholderText('Sensor Host UUID'), { target: { value: 'new-uuid' } });

    const submitButton = screen.getByText('Save changes');

    // Submit the form
    fireEvent.click(submitButton);

    // Assert that edit was called with correct data
    expect(mockEdit).toHaveBeenCalledWith(
      expect.objectContaining({
        uuid: 'new-uuid',
        topic: 'edit-topic',
        unit: 'edit-unit',
        driver: 'edit-driver',
      })
    );
  });

  it('clears the form after successful submission in creation mode', () => {
    render(<PostForm create={mockCreate} edit={mockEdit} postToEdit={null} />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Sensor Host UUID'), { target: { value: 'test-uuid' } });
    fireEvent.change(screen.getByPlaceholderText('Topic'), { target: { value: 'test-topic' } });
    fireEvent.change(screen.getByPlaceholderText('Unit'), { target: { value: 'test-unit' } });
    fireEvent.change(screen.getByPlaceholderText('Driver'), { target: { value: 'test-driver' } });

    const submitButton = screen.getByText('Add new sensor');

    // Submit the form
    fireEvent.click(submitButton);

    // Assert the form fields are cleared
    expect(screen.getByPlaceholderText('Sensor Host UUID')).toHaveValue('');
    expect(screen.getByPlaceholderText('Topic')).toHaveValue('');
    expect(screen.getByPlaceholderText('Unit')).toHaveValue('');
    expect(screen.getByPlaceholderText('Driver')).toHaveValue('');
  });
});
