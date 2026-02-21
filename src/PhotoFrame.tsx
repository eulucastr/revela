import React from 'react';

interface PhotoFrameProps {
    src: string;
    caption?: string;
    rotation?: number;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ src, caption, rotation = 0 }) => {
    return (
        <div className="photo-frame-container" style={{ transform: `rotate(${rotation}deg)` }}>
            <div className="photo-corners">
                <div className="corner top-left"></div>
                <div className="corner top-right"></div>
                <div className="corner bottom-left"></div>
                <div className="corner bottom-right"></div>
            </div>
            <div className="photo-paper">
                <img src={`atom://${src}`} alt={caption || "Photo"} />
                {caption && <p className="photo-caption">{caption}</p>}
            </div>
        </div>
    );
};

export default PhotoFrame;
