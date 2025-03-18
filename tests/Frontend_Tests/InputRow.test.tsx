import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import InputRow from "@/components/UI/InputRow";
import { tinkerforgeDTO } from "@/models/zTinkerforgeSensor.schema";
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

  const samplePost: tinkerforgeDTO = {
    id: uuidv4(),
    date_created: new Date(2024, 11, 10).toISOString(),
    date_modified: new Date(2024, 11, 11).toISOString(),
    enabled: false,
    label: "Test Label",
    description: "Test Description",
    uid: 1,
    config: {
      default: {
        description: "value1",
        interval: 0,
        trigger_only_on_change: false,
        topic: "topic",
        unit: "unit",
      },
    },
    on_connect: [
      {
        function: "test-connect",
        args: [],
        kwargs: {},
        timeout: null,
      },
    ],
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
        id: expect.any(String),
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
