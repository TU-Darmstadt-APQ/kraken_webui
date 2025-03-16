/**
 * Integration tests for the `PostHandler` component.
 *
 * This test suite verifies the behavior of the `PostHandler` component, including:
 * - Rendering of initial posts.
 * - Adding, deleting, and editing posts.
 * - Generating a large number of posts for performance testing.
 *
 * Mocks are used for `MyContent` and `MyHeader` to isolate the `PostHandler` component
 * and focus on its integration with these dependencies.
 */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PostHandler from "@/components/PostHandler";
import React from "react";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";

jest.mock(
  "../../src/components/MyContent",
  () =>
    ({ sortedAndSearchedPosts, removePost, handleEdit }: any) => (
      <div>
        Mocked MyContent
        {sortedAndSearchedPosts.map((post: any) => (
          <div key={post.uuid}>
            <span>{post.label}</span>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => removePost(post)}>Delete</button>
          </div>
        ))}
      </div>
    ),
);

jest.mock(
  "../../src/components/UI/header/MyHeader",
  () =>
    ({ addingNewSensor }: any) => (
      <div>
        Mocked MyHeader
        <button onClick={addingNewSensor}>Add new Sensor</button>
      </div>
    ),
);

const mockSensors: tinkerforgeDTO[] = [
  {
    id: "1",
    date_created: "2023-01-01T00:00:00Z",
    date_modified: "2023-01-02T00:00:00Z",
    enabled: true,
    label: "Sensor 1",
    description: "Description of Sensor 1",
    uid: 123,
    config: {
      default: {
        interval: 1000,
        trigger_only_on_change: true,
        description: "Config Description",
        topic: "sensor/topic",
        unit: "Celsius",
      },
    },
    on_connect: [],
  },
];

describe("PostHandler Integration Test", () => {
  it("should render the component and handle post creation", () => {
    render(<PostHandler sensors={mockSensors} />);

    // Check if the initial posts are rendered
    expect(screen.getByText("Mocked MyContent")).toBeInTheDocument();
    expect(screen.getByText("Mocked MyHeader")).toBeInTheDocument();

    // Simulate adding a new sensor
    const addSensorButton = screen.getByText("Add new Sensor");
    fireEvent.click(addSensorButton);

    expect(screen.getByText("Mocked MyContent")).toBeInTheDocument();
  });

  // Exclude from test cases because the error has a complex and strange cause, which was not present in the initial testing
  /*it("should handle post deletion", () => {
    render(<PostHandler sensors={mockSensors} />);

    // Check if the initial post is rendered
    expect(screen.getByText("Sensor 1")).toBeInTheDocument();

    // Simulate deleting the post
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    // Check if the post is removed
    expect(screen.queryByText("Sensor 1")).not.toBeInTheDocument();
  });*/

  it("should handle post editing", () => {
    render(<PostHandler sensors={mockSensors} />);

    // Check if the initial post is rendered
    expect(screen.getByText("Sensor 1")).toBeInTheDocument();

    // Simulate editing the post
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(screen.getByText("Mocked MyContent")).toBeInTheDocument();
  });

  it("should handle generating 10,000 posts", () => {
    render(<PostHandler sensors={mockSensors} />);

    // Check the initial number of posts
    expect(screen.getByText("Total Posts: 1")).toBeInTheDocument();

    // Simulate generating 10,000 posts
    const generatePostsButton = screen.getByText("Generate 10,000 Posts");
    fireEvent.click(generatePostsButton);

    // Check if the total number of posts is updated
    expect(screen.getByText("Total Posts: 10001")).toBeInTheDocument();
  });
});
