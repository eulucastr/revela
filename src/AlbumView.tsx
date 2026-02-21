import React, { useState, useEffect } from 'react';
import PageRenderer from './PageRenderer';

interface AlbumViewProps {
    galleryPath: string;
    onBack: () => void;
}

const AlbumView: React.FC<AlbumViewProps> = ({ galleryPath, onBack }) => {
    const [photos, setPhotos] = useState<string[]>([]);
    const [meta, setMeta] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0); // This represents the "sheet" (pair of pages)

    useEffect(() => {
        const loadAlbum = async () => {
            setLoading(true);
            const photoList = await window.electronAPI.listPhotos(galleryPath);
            const albumMeta = await window.electronAPI.getAlbumMeta(galleryPath);
            setPhotos(photoList);
            setMeta(albumMeta);
            setLoading(false);
        };
        loadAlbum();
    }, [galleryPath]);

    if (loading) return <div className="album-view-loading">Carregando álbum...</div>;

    const galleryName = galleryPath.split(/[\\/]/).pop();
    const template = meta?.template || 'default';

    return (
        <div className="album-view">
            <header className="album-header">
                <button onClick={onBack} className="back-button">← Voltar</button>
                <h2>{galleryName}</h2>
            </header>

            <div className="book-container">
                <div className="book-spine"></div>

                <div className="page left-page">
                    <PageRenderer
                        photos={photos}
                        template={template}
                        pageIndex={currentPage * 2}
                        galleryPath={galleryPath}
                    />
                    <p className="page-number">{currentPage * 2 + 1}</p>
                </div>

                <div className="page right-page">
                    <PageRenderer
                        photos={photos}
                        template={template}
                        pageIndex={(currentPage * 2) + 1}
                        galleryPath={galleryPath}
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
