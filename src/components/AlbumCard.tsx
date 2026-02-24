import React, { useEffect, useState, useRef } from 'react';
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
    const rootRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={rootRef} className={`album-card`} onClick={() => onOpenAlbum(album.metadata.code)}>
            <div className='collapsed'>
                <span className='code'>#{album.metadata.code}</span>
            </div>

            <div className="expanded">
                <p className="album-date">{album.metadata.date?.split(',')[0]}</p>
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