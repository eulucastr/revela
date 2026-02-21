import React from 'react';
import Dashboard from './components/Dashboard';
import AlbumView from './components/AlbumView';
import { AlbumProvider, useAlbum } from './context/AlbumContext';

const AppContent: React.FC = () => {
    const { libraryRoot, currentAlbum, closeAlbum } = useAlbum();

    if (!libraryRoot) {
        return <div className="loading-screen">Iniciando Revela...</div>;
    }

    if (currentAlbum) {
        const fullPath = `${libraryRoot}/${currentAlbum}`;
        return <AlbumView />;
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Revela</h1>
            </header>

            <main className="dashboard">
                <Dashboard />
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AlbumProvider>
            <AppContent />
        </AlbumProvider>
    );
};

export default App;
