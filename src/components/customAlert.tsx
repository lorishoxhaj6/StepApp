import React, {  useEffect } from 'react';

interface CustomAlertProps {
    message: string;
    onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onClose }) => {
    useEffect(() => {
        // Opzionale: chiudi l'alert dopo un certo periodo
        const timer = setTimeout(() => {
            onClose();
        }, 4000); // Chiudi dopo 3 secondi (regola a piacere)

        return () => clearTimeout(timer); // Pulisci il timer se il componente viene smontato
    }, [onClose]);

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white rounded-md shadow-lg p-4 z-50 flex items-center justify-between">
            <span className="flex-grow">{message}</span>
            <button onClick={onClose} className="ml-4 text-white hover:text-emerald-200 focus:outline-none">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
        </div>
    );
};

export default CustomAlert;