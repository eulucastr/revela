import React from 'react';
import Dashboard from './components/AlbumGrid';
import AlbumView from './components/AlbumView';
import MainHeader from './components/MainHeader';
import TextScroll from './components/TextScroll';
import { AlbumProvider, useAlbum } from './context/AlbumContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Main from 'electron/main';

const AppContent: React.FC = () => {
    const { libraryRoot, currentAlbum } = useAlbum();

    if (!libraryRoot) {
        return <div className="loading-screen">Iniciando Revela...</div>;
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <TextScroll />
            </header>

            <MainHeader />

            {currentAlbum ? <AlbumView /> : <Dashboard />}
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
