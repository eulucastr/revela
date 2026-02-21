import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../styles/components/PhotoFrame.scss';

interface PhotoFrameProps {
    id: string;
    src: string;
    caption?: string;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ id, src, caption }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 100 : 1,
        opacity: isDragging ? 0.6 : 1,
    };

    const safeSrc = src ? `atom://${src.replace(/\\/g, '/')}` : '';

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`photo-frame ${isDragging ? 'dragging' : ''}`}
            {...attributes}
            {...listeners}
        >
            <div className="photo-container">
                <img src={safeSrc} alt={caption || "Photo"} />
                {caption && <p className="photo-caption">{caption}</p>}
            </div>
        </div>
    );
};

export default PhotoFrame;
