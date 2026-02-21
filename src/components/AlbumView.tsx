import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import PhotoFrame from './PhotoFrame';
import '../styles/components/AlbumView.scss';

interface AlbumViewProps {
    albumPath: string;
    onBack: () => void;
}

const AlbumView: React.FC<AlbumViewProps> = ({ albumPath, onBack }) => {
    const [photos, setPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const loadAlbum = async () => {
        setLoading(true);
        // We get the meta first to respect the saved order
        const albumMeta = await window.electronAPI.getAlbumMeta(albumPath);
        const actualPhotos = await window.electronAPI.listPhotos(albumPath);

        // Merge meta photos with actual photos on disk (in case some were added manually)
        const savedOrder = albumMeta.photos || [];
        const orderedPhotos = [
            ...savedOrder.filter((p: string) => actualPhotos.includes(p)),
            ...actualPhotos.filter((p: string) => !savedOrder.includes(p))
        ];

        setPhotos(orderedPhotos);
        setLoading(false);
    };

    useEffect(() => {
        loadAlbum();
    }, [albumPath]);

    const handleAddPhotos = async () => {
        const success = await window.electronAPI.addPhotos(albumPath);
        if (success) {
            loadAlbum();
        }
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setPhotos((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);
                const newOrder = arrayMove(items, oldIndex, newIndex);

                // Persist the new order
                window.electronAPI.updateAlbumMeta(albumPath, {
                    photos: newOrder,
                    template: 'default'
                });

                return newOrder;
            });
        }
    };

    if (loading) return <div className="album-view-loading">Carregando álbum...</div>;

    const albumName = albumPath.split(/[\\/]/).pop();

    return (
        <div className="album-view">
            <header className="album-header">
                <div className="header-left">
                    <button onClick={onBack} className="back-button">← Voltar</button>
                    <h2>{albumName}</h2>
                </div>
                <button className="primary-button small" onClick={handleAddPhotos}>
                    + Adicionar Fotos
                </button>
            </header>

            <main className="grid-container">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={photos}
                        strategy={rectSortingStrategy}
                    >
                        <div className="photo-grid">
                            {photos.map((photo) => (
                                <PhotoFrame
                                    key={photo}
                                    id={photo}
                                    src={`${albumPath}/${photo}`}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </main>
        </div>
    );
};

export default AlbumView;
