import React from 'react';
import '../styles/components/AlbumCard.scss';

interface AlbumCardProps {
    album: {
        name: string;
        preview: string | null;
        metadata: {
            date: string | null;
            code: string | null;
        };
    };
    onOpenAlbum: (name: string) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onOpenAlbum }) => {
    const displayDate = album.metadata?.date || "01/01/2026";
    const displayCode = album.metadata.code;

    return (
        <div className="album-card" onClick={() => onOpenAlbum(album.name)}>
            <div className="collapsed-header">
                <div className="vertical-text">
                    <span className="code">{displayCode}</span>
                </div>
            </div>

            <div className="expanded-content">
                <div className="album-preview">
                    {album.preview ? (
                        <img src={`atom://${album.preview.replace(/\\/g, '/')}`} alt={album.name} />
                    ) : (
                        <div className="preview-placeholder">🖼️</div>
                    )}
                </div>
                <div className="album-info">
                    <h3 className="album-name">{album.name}</h3>
                    <p className="album-date">{displayDate} - {album.metadata?.code}</p>
                </div>
            </div>
        </div>
    );
};

export default AlbumCard;