import React, { useState } from 'react';
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
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="album-card" onClick={() => onOpenAlbum(album.name)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className='collapsed'>
                <span className='code'>#{album.metadata.code}</span>
            </div>

            <div className="expanded">
                <p className="album-date">{album.metadata.date}</p>
                <h3 className="album-name">{album.name}</h3>
            </div>
            
            <div className='flag'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default AlbumCard;