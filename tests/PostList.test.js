import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For additional matchers
import PostList from './PostList';

// Mock dependencies
jest.mock('./PostItem', () => ({ edit, remove, number, post }) => (
  <div data-testid="post-item">
    PostItem {post.title}
  </div>
));
jest.mock('./TableItem', () => ({ edit, remove, post, selectedColumns }) => (
  <tr data-testid="table-item">
    <td>{post.id}</td>
    {selectedColumns.title && <td>{post.title}</td>}
  </tr>
));

describe('PostList Component', () => {
  const mockRemove = jest.fn();
  const mockEdit = jest.fn();

  const samplePosts = [
    { id: 1, title: 'Post 1', description: 'Desc 1', date_created: '2023-01-01', date_modified: '2023-01-02', enabled: true, uuid: 'uuid-1', config: {} },
    { id: 2, title: 'Post 2', description: 'Desc 2', date_created: '2023-01-03', date_modified: '2023-01-04', enabled: false, uuid: 'uuid-2', config: {} },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders "No sensors found" when the post list is empty', () => {
    render(<PostList posts={[]} listTitle="Test Title" remove={mockRemove} edit={mockEdit} />);

    expect(screen.getByText('No sensors found')).toBeInTheDocument();
  });

  it('renders posts in post view by default', () => {
    render(<PostList posts={samplePosts} listTitle="Test Title" remove={mockRemove} edit={mockEdit} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getAllByTestId('post-item')).toHaveLength(2); // Two posts
  });

  it('renders posts in table view when toggled', () => {
    render(<PostList posts={samplePosts} listTitle="Test Title" remove={mockRemove} edit={mockEdit} />);

    const tableButton = screen.getByAltText('Table View');
    fireEvent.click(tableButton);

    // Check table rendering
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByTestId('table-item')).toHaveLength(2); // Two table rows for posts
  });

  it('toggles back to post view when toggled', () => {
    render(<PostList posts={samplePosts} listTitle="Test Title" remove={mockRemove} edit={mockEdit} />);

    const tableButton = screen.getByAltText('Table View');
    const postButton = screen.getByAltText('Posts View');

    // Switch to table view
    fireEvent.click(tableButton);
    expect(screen.getByRole('table')).toBeInTheDocument();

    // Switch back to post view
    fireEvent.click(postButton);
    expect(screen.getAllByTestId('post-item')).toHaveLength(2);
  });

  it('renders column toggle checkboxes in table view', () => {
    render(<PostList posts={samplePosts} listTitle="Test Title" remove={mockRemove} edit={mockEdit} />);

    const tableButton = screen.getByAltText('Table View');
    fireEvent.click(tableButton);

    // Check for column toggles
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(16); // Matches number of columns in `selectedColumns`
  });

  it('updates table columns based on checkbox toggles', () => {
    render(<PostList posts={samplePosts} listTitle="Test Title" remove={mockRemove} edit={mockEdit} />);

    const tableButton = screen.getByAltText('Table View');
    fireEvent.click(tableButton);

    const titleCheckbox = screen.getByLabelText('title');
    const tableRowsBeforeToggle = screen.getAllByTestId('table-item');

    // Initially, "title" is not rendered in the table
    expect(tableRowsBeforeToggle[0].querySelector('td:nth-child(2)')).toBeNull();

    // Enable "title" column
    fireEvent.click(titleCheckbox);
    const tableRowsAfterToggle = screen.getAllByTestId('table-item');
    expect(tableRowsAfterToggle[0].querySelector('td:nth-child(2)')).toHaveTextContent('Post 1');
  });
});
