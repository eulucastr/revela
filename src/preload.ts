import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    selectLibrary: () => ipcRenderer.invoke('select-library'),
    listGalleries: (path: string) => ipcRenderer.invoke('list-galleries', path),
    createGallery: (libraryPath: string, name: string) => ipcRenderer.invoke('create-gallery', { libraryPath, name }),
    listPhotos: (galleryPath: string) => ipcRenderer.invoke('list-photos', galleryPath),
    getAlbumMeta: (galleryPath: string) => ipcRenderer.invoke('get-album-meta', galleryPath),
});
