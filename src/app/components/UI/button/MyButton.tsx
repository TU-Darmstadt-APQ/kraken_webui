import classes from './MyButton.module.css';
import { MyButtonProps } from "@/app/types";
import React from 'react'; // Add import for React

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
  const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
    return (
      // Apply additional props and custom CSS styling to the <button> element
      <button {...props} className={classes.myBtn}>
        {children}
      </button>
    );
  };

export default MyButton;
