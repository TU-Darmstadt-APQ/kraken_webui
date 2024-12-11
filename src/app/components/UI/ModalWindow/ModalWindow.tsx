import React from 'react';
import cl from './ModalWindow.module.css'

import { ModalWindowProps } from '@/app/types';



/**
 * ModalWindow Component
 * 
 * A reusable React component for displaying a modal (popup) window with dynamic visibility.
 * It supports rendering child elements passed between `<ModalWindow>` and `</ModalWindow>`.
 * 
 * - Background click closes the modal by calling `setVisible(false)`.
 * - Inner content click uses `stopPropagation()` to prevent modal closure.
 * 
 * @component
 * @param {ModalWindowProps} props - The properties for the modal.
 * @param {ReactNode} props.children - Content rendered inside the modal.
 * @param {boolean} props.visible - Determines whether the modal is visible.
 * @param {Function} props.setVisible - Function to toggle modal visibility.
 */
const ModalWindow: React.FC<ModalWindowProps> = ({children, visible, setVisible}) => {

    // Base classes for the modal container
    const rootClasses = [cl.myModal]

    // Add the active class if the modal is visible
    if(visible){
        rootClasses.push(cl.active)
    }

    return(
        // Modal background
        <div 
            className={rootClasses.join(' ')} // Combine classes into a single string
            onClick={() => setVisible(false)} // Close modal when clicking on the background
            >
            
            {/* Modal content */}
            <div className={cl.myModalContent} 
                onClick={(e) => e.stopPropagation()} // Prevent modal closure when clicking inside the content
            >
                {children}
            
            </div>
        </div>
    );
};

export default ModalWindow;
