import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

    // Real metadata or fallbacks
    const displayDate = album.metadata?.date || "01/01/2026";
    const displayCode = album.metadata?.code || "ALBUM";

    return (
        <motion.div
            className="album-card"
            onClick={() => onOpenAlbum(album.name)}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            layout
            initial={false}
            animate={{
                flex: isHovered ? "0 0 320px" : "0 0 60px",
                backgroundColor: isHovered ? "#d1d1d1" : "#f7f7f7",
                borderColor: isHovered ? "#3498db" : "#e0e0e0",
                boxShadow: isHovered ? "0 10px 30px rgba(0,0,0,0.15)" : "0 2px 5px rgba(0,0,0,0.05)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <AnimatePresence mode="wait">
                {!isHovered ? (
                    <motion.div
                        key="collapsed"
                        className="collapsed-header"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="vertical-text">
                            <span className="code">{displayCode}</span>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="expanded"
                        className="expanded-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <div className="album-preview">
                            {album.preview ? (
                                <img src={`atom://${album.preview.replace(/\\/g, '/')}`} alt={album.name} />
                            ) : (
                                <div className="preview-placeholder">🖼️</div>
                            )}
                        </div>
                        <div className="album-info">
                            <h3 className="album-name">{album.name}</h3>
                            <p className="album-date">{displayDate} — {displayCode}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default AlbumCard;