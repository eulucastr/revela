import React, { useState, useEffect } from 'react';
import SetupView from './SetupView';
import Dashboard from './Dashboard';
import AlbumView from './AlbumView';

const App: React.FC = () => {
    const [libraryRoot, setLibraryRoot] = useState<string | null>(
        localStorage.getItem('revela_library_root')
    );

    const [currentGallery, setCurrentGallery] = useState<string | null>(null);

    const handleSelectLibrary = (path: string) => {
        localStorage.setItem('revela_library_root', path);
        setLibraryRoot(path);
    };

    if (!libraryRoot) {
        return <SetupView onSelectLibrary={handleSelectLibrary} />;
    }

    if (currentGallery) {
        const fullPath = `${libraryRoot}/${currentGallery}`;
        return (
            <AlbumView
                galleryPath={fullPath}
                onBack={() => setCurrentGallery(null)}
            />
        );
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Revela</h1>
                <div className="library-info">
                    <span>Biblioteca: {libraryRoot}</span>
                    <button onClick={() => {
                        localStorage.removeItem('revela_library_root');
                        setLibraryRoot(null);
                        setCurrentGallery(null); // Added this line
                    }} className="text-button">Alterar</button>
                </div>
            </header>

            <main className="dashboard">
                <Dashboard
                    libraryPath={libraryRoot}
                    onOpenGallery={(name) => setCurrentGallery(name)} // Added this prop
                />
            </main>
        </div>
    );
};

export default App;
