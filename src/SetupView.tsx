import React from 'react';

interface SetupViewProps {
    onSelectLibrary: (path: string) => void;
}

const SetupView: React.FC<SetupViewProps> = ({ onSelectLibrary }) => {
    const handleSelect = async () => {
        try {
            const path = await window.electronAPI.selectLibrary();
            if (path) {
                onSelectLibrary(path);
            }
        } catch (error) {
            console.error('Failed to select library:', error);
        }
    };

    return (
        <div className="setup-view">
            <div className="setup-card">
                <h1>Revela</h1>
                <p>Para começar, selecione a pasta onde seus álbuns de memórias serão guardados.</p>
                <button className="primary-button" onClick={handleSelect}>
                    Selecionar Pasta da Biblioteca
                </button>
            </div>
        </div>
    );
};

export default SetupView;
