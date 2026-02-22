import { useState } from "react";
import { useAlbum } from "../context/AlbumContext";
import { useTheme } from "../context/ThemeContext";
import '../styles/components/MainHeader.scss';

const MainHeader: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { libraryRoot, openAlbum, createAlbum } = useAlbum();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAlbumName, setNewAlbumName] = useState('');

    const handleCreate = async () => {
        const success = await createAlbum(newAlbumName);
        if (success) {
            setNewAlbumName('');
            setShowCreateModal(false);
        }
    }
    
    return (
        <>
            <div className="header-actions">
                {/* create album onclick */}
                <button className='btn-primary' onClick={() => setShowCreateModal(true)}>
                    <span className='text'>Adicionar Álbum</span>
                </button>
                <button
                    className="theme-toggle btn-primary"
                    onClick={toggleTheme}
                    title={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>

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
        </>
    )
}

export default MainHeader;