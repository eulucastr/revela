import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AlbumContextType {
    libraryRoot: string | null;
    currentAlbum: string | null;
    openAlbum: (albumName: string) => void;
    closeAlbum: () => void;
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

export const AlbumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [libraryRoot, setLibraryRoot] = useState<string | null>(null);
    const [currentAlbum, setCurrentAlbum] = useState<string | null>(null);

    useEffect(() => {
        const initLibrary = async () => {
            const path = await window.electronAPI.getLibraryPath();
            setLibraryRoot(path);
        };
        initLibrary();
    }, []);

    const openAlbum = (albumName: string) => {
        setCurrentAlbum(albumName);
    };

    const closeAlbum = () => {
        setCurrentAlbum(null);
    };

    return (
        <AlbumContext.Provider value={{ libraryRoot, currentAlbum, openAlbum, closeAlbum }}>
            {children}
        </AlbumContext.Provider>
    );
};

export const useAlbum = () => {
    const context = useContext(AlbumContext);
    if (context === undefined) {
        throw new Error('useAlbum must be used within an AlbumProvider');
    }
    return context;
};
