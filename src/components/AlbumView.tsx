import React, { useState, useEffect } from 'react';
import PageRenderer from './PageRenderer';
import '../styles/components/AlbumView.scss';

interface AlbumViewProps {
    albumPath: string;
    onBack: () => void;
}

const AlbumView: React.FC<AlbumViewProps> = ({ albumPath, onBack }) => {
    const [photos, setPhotos] = useState<string[]>([]);
    const [meta, setMeta] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const loadAlbum = async () => {
        setLoading(true);
        const photoList = await window.electronAPI.listPhotos(albumPath);
        const albumMeta = await window.electronAPI.getAlbumMeta(albumPath);
        setPhotos(photoList);
        setMeta(albumMeta);
        setLoading(false);
    };

    useEffect(() => {
        loadAlbum();
    }, [albumPath]);

    const handleAddPhotos = async () => {
        const success = await window.electronAPI.addPhotos(albumPath);
        if (success) {
            loadAlbum();
        }
    };

    if (loading) return <div className="album-view-loading">Carregando álbum...</div>;

    const albumName = albumPath.split(/[\\/]/).pop();
    const template = meta?.template || 'default';

    return (
        <div className="album-view">
            <header className="album-header">
                <div className="header-left">
                    <button onClick={onBack} className="back-button">← Voltar</button>
                    <h2>{albumName}</h2>
                </div>
                <button className="primary-button small" onClick={handleAddPhotos}>
                    + Adicionar Fotos
                </button>
            </header>

            <div className="book-container">
                <div className="page left-page">
                    <PageRenderer
                        photos={photos}
                        template={template}
                        pageIndex={currentPage * 2}
                        albumPath={albumPath}
                    />
                    <p className="page-number">{currentPage * 2 + 1}</p>
                </div>

                <div className="page right-page">
                    <PageRenderer
                        photos={photos}
                        template={template}
                        pageIndex={(currentPage * 2) + 1}
                        albumPath={albumPath}
                    />
                    <p className="page-number">{currentPage * 2 + 2}</p>
                </div>
            </div>

            <footer className="album-controls">
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(p => p - 1)}
                >Anterior</button>
                <span>Página {currentPage + 1}</span>
                <button
                    onClick={() => setCurrentPage(p => p + 1)}
                >Próxima</button>
            </footer>
        </div>
    );
};

export default AlbumView;
