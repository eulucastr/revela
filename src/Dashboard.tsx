import React, { useState, useEffect } from 'react';

interface DashboardProps {
    libraryPath: string;
    onOpenGallery: (galleryName: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ libraryPath, onOpenGallery }) => {
    const [galleries, setGalleries] = useState<string[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newGalleryName, setNewGalleryName] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchGalleries = async () => {
        setLoading(true);
        const list = await window.electronAPI.listGalleries(libraryPath);
        setGalleries(list);
        setLoading(false);
    };

    useEffect(() => {
        fetchGalleries();
    }, [libraryPath]);

    const handleCreate = async () => {
        if (!newGalleryName.trim()) return;

        const success = await window.electronAPI.createGallery(libraryPath, newGalleryName);
        if (success) {
            setNewGalleryName('');
            setShowCreateModal(false);
            fetchGalleries();
        }
    };

    return (
        <div className="dashboard-content">
            <header className="dashboard-header">
                <h2>Suas Galerias</h2>
                <button className="primary-button small" onClick={() => setShowCreateModal(true)}>
                    + Criar Galeria
                </button>
            </header>

            {loading ? (
                <p>Carregando galerias...</p>
            ) : galleries.length === 0 ? (
                <div className="empty-state">
                    <p>Você ainda não tem galeria. Crie a sua primeira memória.</p>
                </div>
            ) : (
                <div className="gallery-grid">
                    {galleries.map(gallery => (
                        <div key={gallery} className="gallery-card" onClick={() => onOpenGallery(gallery)}>
                            <div className="gallery-preview">
                                {/* Fallback for now */}
                                <div className="preview-placeholder">🖼️</div>
                            </div>
                            <span className="gallery-name">{gallery}</span>
                        </div>
                    ))}
                </div>
            )}

            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Nova Galeria</h3>
                        <p>Dê um nome para sua nova galeria de memórias.</p>
                        <input
                            type="text"
                            value={newGalleryName}
                            onChange={(e) => setNewGalleryName(e.target.value)}
                            placeholder="Ex: Viagem 2024"
                            autoFocus
                        />
                        <div className="modal-actions">
                            <button onClick={() => setShowCreateModal(false)}>Cancelar</button>
                            <button className="primary-button" onClick={handleCreate}>Criar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
