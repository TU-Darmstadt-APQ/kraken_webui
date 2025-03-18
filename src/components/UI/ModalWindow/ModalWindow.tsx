import { ModalWindowProps } from "@/types";
import React from "react";
import cl from "./ModalWindow.module.css";

/**
 * This is a reusable component for displaying modal (popup) windows.
 *
 * This component provides:
 * - Dynamic visibility control: Controlled via the `visible` prop.
 * - Background click-to-close behavior: Clicking outside the content closes the modal.
 * - Supports any content: Accepts child elements (children).
 *
 * @component
 * @param {React.ReactNode} children - Content rendered inside the modal.
 * @param {boolean} visible - Determines whether the modal is visible.
 * @param {(visible: boolean) => void} setVisible - Function to toggle modal visibility.
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <ModalWindow visible={isOpen} setVisible={setIsOpen}>
 *   <p>This is a modal content</p>
 * </ModalWindow>
 *
 * @returns {JSX.Element} A modal dialog with a backdrop and customizable content.
 */
const ModalWindow: React.FC<ModalWindowProps> = ({
  children,
  visible,
  setVisible,
}) => {
  /**
   * Base class array for the modal container.
   * The `active` class is added dynamically when the modal is visible.
   */
  const rootClasses = [cl.myModal];
  if (visible) {
    rootClasses.push(cl.active);
  }

  return (
    /**
     * Modal background
     * - Clicking on the background closes the modal (setVisible(false)).
     * - `role="dialog"` improves screen reader accessibility.
     * - `aria-modal="true"` informs assistive technologies that this is a modal.
     */
    <div
      className={rootClasses.join(" ")} // Combine class names into a single string
      onClick={() => setVisible(false)} // Close modal when clicking the background
      role="dialog"
      aria-modal="true"
    >
      {/* Modal content container */}
      <div
        className={cl.myModalContent}
        onClick={(e) => e.stopPropagation()} // Prevent modal closure when clicking inside
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
