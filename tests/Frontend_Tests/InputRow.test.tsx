import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InputRow from "@/components/UI/InputRow";
import userEvent from "@testing-library/user-event";
import { v4 as uuidv4 } from "uuid";

describe("InputRow Component", () => {
  const mockSetVisible = jest.fn();
  const mockCreatePost = jest.fn();
  const mockEdit = jest.fn();

  const selectedColumns = {
    uuid: true,
    label: true,
    enabled: true,
    topic: true,
    driver: true,
    config: true,
    on_connect: true,
    uid: true,
  };

  const samplePost = {
    uid: 1,
    title: "Sample Post",
    description: "Test Description",
    date_created: { day: 10, month: 12, year: 2024 },
    date_modified: { day: 11, month: 12, year: 2024 },
    enabled: false,
    label: "Test Label",
    uuid: uuidv4(),
    config: { key1: "value1" },
    on_connect: "test-connect",
    topic: "Test Topic",
    unit: "Test Unit",
    driver: "Test Driver",
    port: 1234,
    sad: 0,
    pad: 0,
    host: "localhost",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input fields when visible", () => {
    render(
      <InputRow
        visible={true}
        setVisible={mockSetVisible}
        createPost={mockCreatePost}
        edit={mockEdit}
        postToEdit={null}
        selectedColumns={selectedColumns}
      />,
    );

    expect(screen.getByPlaceholderText("UUID")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Topic")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Driver")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("On Connect")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("UID")).toBeInTheDocument();
  });

  it("does not render when visible is false", () => {
    render(
      <InputRow
        visible={false}
        setVisible={mockSetVisible}
        createPost={mockCreatePost}
        edit={mockEdit}
        postToEdit={null}
        selectedColumns={selectedColumns}
      />,
    );

    expect(screen.queryByPlaceholderText("UUID")).not.toBeInTheDocument();
  });

  it("updates input values when typing", async () => {
    const user = userEvent.setup();
    render(
      <InputRow
        visible={true}
        setVisible={mockSetVisible}
        createPost={mockCreatePost}
        edit={mockEdit}
        postToEdit={null}
        selectedColumns={selectedColumns}
      />,
    );

    const uuidInput = screen.getByPlaceholderText("UUID");
    await user.type(uuidInput, "12345");

    expect(uuidInput).toHaveValue("12345");
  });

  it("calls createPost on form submission", async () => {
    const user = userEvent.setup();
    render(
      <InputRow
        visible={true}
        setVisible={mockSetVisible}
        createPost={mockCreatePost}
        edit={mockEdit}
        postToEdit={null}
        selectedColumns={selectedColumns}
      />,
    );

    const submitButton = screen.getByAltText("Submit");
    await user.click(submitButton);

    expect(mockCreatePost).toHaveBeenCalledTimes(1);
    expect(mockCreatePost).toHaveBeenCalledWith(
      expect.objectContaining({
        uuid: expect.any(String),
      }),
    );
  });

  it("calls editPost instead of createPost when editing a post", async () => {
    const user = userEvent.setup();
    render(
      <InputRow
        visible={true}
        setVisible={mockSetVisible}
        createPost={mockCreatePost}
        edit={mockEdit}
        postToEdit={samplePost}
        selectedColumns={selectedColumns}
      />,
    );

    const submitButton = screen.getByAltText("Submit");
    await user.click(submitButton);

    expect(mockEdit).toHaveBeenCalledTimes(1);
    expect(mockCreatePost).not.toHaveBeenCalled();
  });

  it("calls setVisible(false) when clicking cancel", async () => {
    const user = userEvent.setup();
    render(
      <InputRow
        visible={true}
        setVisible={mockSetVisible}
        createPost={mockCreatePost}
        edit={mockEdit}
        postToEdit={null}
        selectedColumns={selectedColumns}
      />,
    );

    const cancelButton = screen.getByAltText("Cancel");
    await user.click(cancelButton);

    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });
});
