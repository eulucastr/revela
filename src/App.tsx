import React, { useState, useEffect } from 'react';
import SetupView from './components/SetupView';
import Dashboard from './components/Dashboard';
import AlbumView from './components/AlbumView';

const App: React.FC = () => {
    const [libraryRoot, setLibraryRoot] = useState<string | null>(null);
    const [currentAlbum, setCurrentAlbum] = useState<string | null>(null);

    useEffect(() => {
        const initLibrary = async () => {
            const path = await window.electronAPI.getLibraryPath();
            setLibraryRoot(path);
        };
        initLibrary();
    }, []);

    if (!libraryRoot) {
        return <div className="loading-screen">Iniciando Revela...</div>;
    }

    if (currentAlbum) {
        const fullPath = `${libraryRoot}/${currentAlbum}`;
        return (
            <AlbumView
                albumPath={fullPath}
                onBack={() => setCurrentAlbum(null)}
            />
        );
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Revela</h1>
                <div className="library-info">
                    <span>{libraryRoot}</span>
                </div>
            </header>

            <main className="dashboard">
                <Dashboard
                    libraryPath={libraryRoot}
                    onOpenAlbum={(name) => setCurrentAlbum(name)}
                />
            </main>
        </div>
    );
};

export default App;
