import React from 'react';
import cl from './ModalWindow.module.css'

import { ModalWindowProps } from '@/app/types';

//dieser Komponent wird alles Darstellen, was er als Kinder bekommt (bzw alles was zwischen <ModalWindow> und </ModalWindow> steht)
//mithilfe von stopPropagation wird es vermieden, dass beim Click auf interactable Objekten das Fenster geschlossen wird

const ModalWindow: React.FC<ModalWindowProps> = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myModal]

    if(visible){
        rootClasses.push(cl.active)
    }

    return(
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}> {/*zweis Stillen*/}
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;