import '../styles/components/AlbumGrid.scss';
import AlbumCard from './AlbumCard';
import { useAlbum } from '../context/AlbumContext';

const Dashboard: React.FC = () => {
    const { libraryRoot, openAlbum, loading, albums } = useAlbum();

    return (
        <div className="dashboard">
            {loading ? (
                <p>Carregando álbuns...</p>
            ) : albums.length === 0 ? (
                <div className="empty-state">
                    <p>Você ainda não tem álbuns. Crie a sua primeira memória.</p>
                </div>
            ) : (
                <div className="albums-grid">
                    <div className='odd-column column'>
                        {
                            albums.filter((_, index) => index % 2 === 0).map(album => (
                                <AlbumCard key={album.name} album={album} onOpenAlbum={openAlbum} />
                            ))
                        }
                    </div>
                    <div className='even-column column'>
                        {
                            albums.filter((_, index) => index % 2 !== 0).map(album => (
                                <AlbumCard key={album.name} album={album} onOpenAlbum={openAlbum} />
                            ))
                        }
                    </div> 
                </div>
            )}
        </div>
    );
};

export default Dashboard;
