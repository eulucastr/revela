import { contextBridge, ipcRenderer } from 'electron';
import { Album } from './types';

contextBridge.exposeInMainWorld('electronAPI', {
    getLibraryPath: () => ipcRenderer.invoke('get-library-path'),
    listAlbums: (path: string) => ipcRenderer.invoke('list-albums', path),
    createAlbum: (libraryPath: string, albumData: Album) => 
        ipcRenderer.invoke('create-album', { libraryPath, albumData }),
    addPhotos: (albumPath: string) => ipcRenderer.invoke('add-photos', albumPath),
    listPhotos: (albumPath: string) => ipcRenderer.invoke('list-photos', albumPath),
    getAlbumMeta: (albumPath: string) => ipcRenderer.invoke('get-album-meta', albumPath),
    updateAlbumMeta: (albumPath: string, meta: any) => ipcRenderer.invoke('update-album-meta', { albumPath, meta }),
});
