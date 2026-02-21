import React from 'react';
import Dashboard from './components/Dashboard';
import AlbumView from './components/AlbumView';
import { AlbumProvider, useAlbum } from './context/AlbumContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppContent: React.FC = () => {
    const { libraryRoot, currentAlbum } = useAlbum();
    const { theme, toggleTheme } = useTheme();

    if (!libraryRoot) {
        return <div className="loading-screen">Iniciando Revela...</div>;
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Revela</h1>
                <div className="header-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
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
