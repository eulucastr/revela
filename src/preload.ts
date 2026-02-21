import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    getLibraryPath: () => ipcRenderer.invoke('get-library-path'),
    listAlbums: (path: string) => ipcRenderer.invoke('list-albums', path),
    createAlbum: (libraryPath: string, name: string) => ipcRenderer.invoke('create-album', { libraryPath, name }),
    addPhotos: (albumPath: string) => ipcRenderer.invoke('add-photos', albumPath),
    listPhotos: (albumPath: string) => ipcRenderer.invoke('list-photos', albumPath),
    getAlbumMeta: (albumPath: string) => ipcRenderer.invoke('get-album-meta', albumPath),
});
