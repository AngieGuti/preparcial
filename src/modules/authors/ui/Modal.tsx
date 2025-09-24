"use client";
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

// Componente Modal que recibe props para controlar su visibilidad y contenido
// El modal se centra en la pantalla y tiene un fondo semitransparente
// El contenido del modal se pasa como children
// El título del modal se muestra en la parte superior
const Modal = ({isOpen, onClose, children, title}: ModalProps) => {
    if(!isOpen){
        return null;
    }
    // El botón de cerrar puede ser una "X" en la esquina superior derecha
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-purple-700 text-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className= "text-white hover:text-gray-300 text-2xl font-bold">
                        &times;
                        </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;