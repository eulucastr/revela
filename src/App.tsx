import React from 'react';
import Dashboard from './components/Dashboard';
import AlbumView from './components/AlbumView';
import { AlbumProvider, useAlbum } from './context/AlbumContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppContent: React.FC = () => {
    const { libraryRoot, currentAlbum } = useAlbum();

    if (!libraryRoot) {
        return <div className="loading-screen">Iniciando Revela...</div>;
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="scrolling-text-container">
                    <div className="scrolling-text-inner">
                        <div className="scrolling-text-item">REVELE·REVELE·REVELE·REVELE·REVELE·</div>
                        <div className="scrolling-text-item">REVELE·REVELE·REVELE·REVELE·REVELE·</div>
                    </div>
                </div>
            </header>

            <main className="dashboard-wrapper">
                {currentAlbum ? <AlbumView /> : <Dashboard />}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <AlbumProvider>
                <AppContent />
            </AlbumProvider>
        </ThemeProvider>
    );
};


export default App;
