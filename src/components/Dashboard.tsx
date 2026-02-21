import React, { useState, useEffect } from 'react';
import '../styles/components/Dashboard.scss';
import AlbumCard from './AlbumCard';
import { useAlbum } from '../context/AlbumContext';
import { generateAlbumCode } from '../utils/albumCreation';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
    const { libraryRoot, openAlbum } = useAlbum();
    const [albums, setAlbums] = useState<{ name: string, preview: string | null, metadata: { date: string, code: string } }[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAlbumName, setNewAlbumName] = useState('');
    const [loading, setLoading] = useState(true);

    const parseDate = (dateStr: string) => {
        // Suporta formatos: "DD/MM/YYYY" ou "DD/MM/YYYY, HH:mm"
        const [datePart, timePart] = dateStr.split(', ');
        const [day, month, year] = datePart.split('/').map(Number);

        if (timePart) {
            const [hours, minutes] = timePart.split(':').map(Number);
            return new Date(year, month - 1, day, hours, minutes);
        }

        return new Date(year, month - 1, day);
    };

    const fetchAlbums = async () => {
        if (!libraryRoot) return;
        setLoading(true);
        const list = await window.electronAPI.listAlbums(libraryRoot);

        // Ordenar por data decrescente
        const sortedList = [...list].sort((a, b) => {
            const dateA = a.metadata?.date ? parseDate(a.metadata.date) : new Date(0);
            const dateB = b.metadata?.date ? parseDate(b.metadata.date) : new Date(0);
            return dateB.getTime() - dateA.getTime();
        });

        setAlbums(sortedList);
        setLoading(false);
    };

    useEffect(() => {
        fetchAlbums();
    }, [libraryRoot]);

    const handleCreate = async () => {
        if (!newAlbumName.trim() || !libraryRoot) return;

        const date = new Date();
        const code = generateAlbumCode(newAlbumName, date);
        const metadata = {
            date: date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }),
            code: code
        };

        const success = await window.electronAPI.createAlbum(libraryRoot, newAlbumName, metadata);
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
                <motion.div className="album-grid" layout>
                    {albums.map((album, index) => (
                        <AlbumCard key={album.name} album={album} onOpenAlbum={openAlbum} />
                    ))}
                </motion.div>
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
