import React from 'react';
import '../styles/components/PhotoFrame.scss';

interface PhotoFrameProps {
    src: string;
    caption?: string;
    rotation?: number;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ src, caption, rotation = 0 }) => {
    const safeSrc = src ? `atom://${src.replace(/\\/g, '/')}` : '';

    return (
        <div className="photo-frame-container" style={{ transform: `rotate(${rotation}deg)` }}>
            <div className="photo-corners">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
            </div>
            <div className="photo-paper">
                <img src={safeSrc} alt={caption || "Photo"} />
                {caption && <p className="photo-caption">{caption}</p>}
            </div>
        </div>
    );
};

export default PhotoFrame;
