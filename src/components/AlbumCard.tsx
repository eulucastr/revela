import React, { useEffect, useState, useRef } from 'react';
import '../styles/components/AlbumCard.scss';
import type { Album } from '../types';

interface AlbumCardProps {
    album: Album,
    onOpenAlbum: (code: string) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onOpenAlbum }) => {
    const rootRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={rootRef} className={`album-card`} onClick={() => onOpenAlbum(album.code)}>
            <div className='collapsed'>
                <span className='code'>#{album.code}</span>
            </div>

            <div className="expanded">
                <p className="album-date">{album.date?.split(',')[0]}</p>
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