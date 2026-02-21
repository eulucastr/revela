import React, { useState, useEffect } from 'react';
import '../styles/components/Dashboard.scss';

interface DashboardProps {
    libraryPath: string;
    onOpenAlbum: (albumName: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ libraryPath, onOpenAlbum }) => {
    const [albums, setAlbums] = useState<{ name: string, preview: string | null }[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAlbumName, setNewAlbumName] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchAlbums = async () => {
        setLoading(true);
        const list = await window.electronAPI.listAlbums(libraryPath);
        setAlbums(list);
        setLoading(false);
    };

    useEffect(() => {
        fetchAlbums();
    }, [libraryPath]);

    const handleCreate = async () => {
        if (!newAlbumName.trim()) return;

        const success = await window.electronAPI.createAlbum(libraryPath, newAlbumName);
        if (success) {
            setNewAlbumName('');
            setShowCreateModal(false);
            fetchAlbums();
        }
    };

    return (
        <div className="dashboard-content">
            <header className="dashboard-header">
                <h2>Seus Álbuns</h2>
                <button className="primary-button small" onClick={() => setShowCreateModal(true)}>
                    + Criar Álbum
                </button>
            </header>

            {loading ? (
                <p>Carregando álbuns...</p>
            ) : albums.length === 0 ? (
                <div className="empty-state">
                    <p>Você ainda não tem álbuns. Crie a sua primeira memória.</p>
                </div>
            ) : (
                <div className="album-grid">
                    {albums.map(album => (
                        <div key={album.name} className="album-card" onClick={() => onOpenAlbum(album.name)}>
                            <div className="album-preview">
                                {album.preview ? (
                                    <img src={`atom://${album.preview.replace(/\\/g, '/')}`} alt={album.name} />
                                ) : (
                                    <div className="preview-placeholder">🖼️</div>
                                )}
                            </div>
                            <span className="album-name">{album.name}</span>
                        </div>
                    ))}
                </div>
            )}

            {showCreateModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Novo Álbum</h3>
                        <p>Dê um nome para seu novo álbum de memórias.</p>
                        <input
                            type="text"
                            value={newAlbumName}
                            onChange={(e) => setNewAlbumName(e.target.value)}
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
