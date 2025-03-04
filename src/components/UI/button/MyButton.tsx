import { MyButtonProps } from "@/types";
import React from "react"; // Add import for React
import classes from "./MyButton.module.css";

/**
 * A customizable button component with specific CSS styling.
 *
 * This component enhances the native HTML `<button>` element by applying custom styles
 * and supporting additional props, making it flexible for various use cases.
 *
 * @component
 * @param {ReactNode} children - The content to display inside the button (e.g., text or icons).
 * @param {...any} props - Additional props passed directly to the native `<button>` element
 * (e.g., event handlers, attributes).
 * @returns {JSX.Element} A styled `<button>` element.
 */
const MyButton: React.FC<MyButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    // Apply additional props and custom CSS styling to the <button> element
    <button
      {...props}
      className={[classes.myBtn, className].filter(Boolean).join(" ")} // This line combines the default CSS module class with any additional className prop, filtering out falsy values and joining them into a single string
    >
      {children}
    </button>
  );
};

export default MyButton;
