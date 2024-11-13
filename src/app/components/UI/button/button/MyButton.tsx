import React, {ReactNode} from 'react';
import classes from './MyButton.module.css';

interface MyButtonProps {
    children: ReactNode;
    // You can also define the types for other props here if needed
    [key: string]: any;
  }

  const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
    return (
      <button {...props} className={classes.myBtn}>
        {children}
      </button>
    );
  };

export default MyButton;