import React, { ForwardedRef, InputHTMLAttributes, useState } from "react";
import classes from './MyInput.module.css';
import tooltipStyles from './../tooltip/MyTooltip.module.css';


/**
 * Custom input component that supports all standard HTML input attributes.
 *
 * This component enhances the native `<input>` element by adding custom styling
 * and supports React's `ref` forwarding for easier DOM manipulation.
 *
 * @component
 * @param {MyInputProps} props - Props extending all standard HTML input attributes.
 * @param {ForwardedRef<HTMLInputElement>} ref - React ref for accessing the underlying input element.
 * @returns {JSX.Element} A styled `<input>` element.
 */
interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string; // Optional Text for Error Tooltip
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'; // Optional Field for Tooltip orientation
  setError: (value: string | null) => void; // Function to reset the error (or delete the text in state)
}

const MyInput = React.forwardRef(({ error, setError, tooltipPosition = 'bottom', ...props }: MyInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [isFocused, setIsFocused] = useState(false); // status, whether the input field is used or not
  
  return (
      <div style={{ position: 'relative' }}>
        <input 
          className={classes.myInput} 
          ref={ref} 
          {...props}
          onFocus={() => setIsFocused(true)} // the input field is used
          onBlur={() => {
            setIsFocused(false) // the input field is no longer used
            setError(null)
          }} 
        />
        
        {/* Toolttp for error */}
        {error && isFocused && (
          <div className={`${tooltipStyles.tooltip} ${tooltipStyles[tooltipPosition]}`}>
            {error}
            <div className={`${tooltipStyles.arrow} ${tooltipStyles[`arrow-${tooltipPosition}`]}`} />
          </div>
        )}
      </div>
    );
  });

export default MyInput;
