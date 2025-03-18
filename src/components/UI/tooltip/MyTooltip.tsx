import React, { useRef, useState } from "react";
import { MyTooltipProps } from "@/types";
import styles from "./MyTooltip.module.css";

/**
 * This is a reusable tooltip component that displays additional information
 * when the user hovers over the wrapped content.
 *
 * This component provides:
 * - Hover-based visibility: The tooltip appears on `mouseenter` and disappears on `mouseleave`.
 * - Positioning options: Can be placed at "top", "bottom", "left", or "right".
 * - Customizable content: Displays the provided `infoText` inside the tooltip.
 *
 * @component
 * @param {string} infoText - The text displayed inside the tooltip.
 * @param {React.ReactNode} children - The wrapped content that triggers the tooltip on hover.
 * @param {"top" | "bottom" | "left" | "right"} [props.position="bottom"] - The tooltip’s position relative to the child element.
 *
 * @example
 * <MyTooltip infoText="Add new Sensor" position="bottom-right">
 *           <MyButton onClick={addingNewSensor}>
 *             <img
 *               src="/plusIcon.png"
 *               alt="Add new Sensor"
 *               width={30}
 *               height={30}
 *             />
 *           </MyButton>
 * </MyTooltip>
 *
 * @returns {JSX.Element} A tooltip-wrapped element that shows extra information on hover.
 */
const MyTooltip: React.FC<MyTooltipProps> = ({
  infoText,
  children,
  position = "bottom",
}) => {
  /**
   * State to manage tooltip visibility.
   * - `true`: Tooltip is visible
   * - `false`: Tooltip is hidden
   */
  const [showTooltip, setShowTooltip] = useState(false);

  /**
   * Reference to the tooltip's container element.
   * This is used for positioning and styling purposes.
   */
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Reference to the tooltip element itself.
   * Can be used for dynamic positioning if needed in future implementations.
   */
  const tooltipRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={styles["tooltip-container"]}
      ref={containerRef}
      onMouseEnter={() => setShowTooltip(true)} // Show tooltip on hover
      onMouseLeave={() => setShowTooltip(false)} // Hide tooltip when mouse leaves
    >
      {children}

      {/* Tooltip container - Only renders if `showTooltip` is true */}
      {showTooltip && (
        <div
          className={`${styles["tooltip"]} ${styles[position]}`}
          ref={tooltipRef}
        >
          {infoText}
          {/* Arrow indicator - Ensures tooltip points to the correct position */}
          <div
            className={`${styles["arrow"]} ${styles[`arrow-${position}`]}`}
          />
        </div>
      )}
    </div>
  );
};

export default MyTooltip;
