import { Button } from "@nextui-org/react";
import { MyButtonProps } from "@/types";
import React from "react"; // Add import for React
/**
 * A customizable button component using NextUI.
 *
 * This component wraps the NextUI `<Button>` to provide a consistent look
 * and support additional props.
 *
 * @component
 * @param {ReactNode} children - The content inside the button (e.g., text or icons).
 * @param {...any} props - Additional props for customization (e.g., `color`, `variant`).
 * @returns {JSX.Element} A styled `<Button>` element from NextUI.
 */
const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
  return (
    <Button color="primary" variant="bordered" {...props}>
      {children}
    </Button>
  );
};

export default MyButton;
