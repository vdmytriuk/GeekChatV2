import {FC} from "react";

import {IModalProps} from "./types";

import CloseIcon from '../../shared/assets/svg/close.svg';

import './ModalWindow.scss';

const ModalWindow: FC<IModalProps> = ({isOpen, onClose, children}) => {

    return isOpen && (
        <div
            className="modal"
            onClick={onClose}
        >
            <div
                className="modal__wrapper"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="modal__close"
                    onClick={onClose}
                >
                    <CloseIcon/>
                </button>

                {children}

            </div>
        </div>
    );
};

export default ModalWindow;