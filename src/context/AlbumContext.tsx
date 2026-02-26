import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { generateAlbumCode, parseDate } from '../utils/albums';
import type { Album } from '../types';

interface AlbumContextType {
    libraryRoot: string | null;
    currentAlbum: string | null;
    albums: Album[];
    loading: boolean;
    openAlbum: (albumName: string) => void;
    createAlbum: (newAlbumName: string) => Promise<boolean>;
    closeAlbum: () => void;
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

export const AlbumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [libraryRoot, setLibraryRoot] = useState<string | null>(null);
    const [currentAlbum, setCurrentAlbum] = useState<string | null>(null);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAlbums = async () => {
        if (!libraryRoot) return;
        setLoading(true);
        const list = await window.electronAPI.listAlbums(libraryRoot);

        // Ordenar por data decrescente
        const sortedList = [...list].sort((a, b) => {
            const dateA = a.date ? parseDate(a.date) : new Date(0);
            const dateB = b.date ? parseDate(b.date) : new Date(0);
            return dateB.getTime() - dateA.getTime();
        });

        console.log('Álbuns carregados:', sortedList);
        setAlbums(sortedList);
        setLoading(false);
    };

    const createAlbum = async (newAlbumName: string) => {
        if (!newAlbumName.trim() || !libraryRoot) return;

        const date = new Date();
        const code = generateAlbumCode(newAlbumName, date);
        const dateStr = date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const albumData: Album = {
            code,
            name: newAlbumName,
            date: dateStr
        };

        console.log('Criando álbum com dados:', albumData);
        const success = await window.electronAPI.createAlbum(libraryRoot, albumData);

        if (success) fetchAlbums();
        return success
    };

    const openAlbum = (code: string) => {
        setCurrentAlbum(code);
    };
    
    const closeAlbum = () => {
        setCurrentAlbum(null);
    };

    useEffect(() => {
        const initLibrary = async () => {
            const path = await window.electronAPI.getLibraryPath();
            setLibraryRoot(path);
        };
        initLibrary();
    }, []);

    useEffect(() => {
        fetchAlbums();
    }, [libraryRoot]);

    return (
        <AlbumContext.Provider value={{ libraryRoot, currentAlbum, openAlbum, closeAlbum, createAlbum, albums, loading }}>
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
