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
    const displayDate = album.metadata?.date ? album.metadata.date.split(',')[0] : "01/01/2026";
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
                flex: isHovered ? "0 0 320px" : "0 0 320px",
                backgroundColor: isHovered ? "var(--card-hover-bg)" : "var(--card-bg)",
                borderColor: isHovered ? "var(--card-hover-border)" : "var(--border-color)",
                boxShadow: isHovered ? "0 10px 30px var(--card-shadow)" : "0 2px 5px var(--card-shadow)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >

            <AnimatePresence mode="wait">
                {isHovered ? (
                    <motion.div
                        key="collapsed"
                        className="collapsed-header"
                        initial={{ x: "50%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "50%", opacity: 0 }}
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
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "-100%", opacity: 0 }}
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
                            <p className="album-date">{displayDate}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='flag'>
                <span className='line'></span>
                <span className='line'></span>
                <span className='line'></span>
                <span className='line'></span>
            </div>
        </motion.div>
    );
};

export default AlbumCard;