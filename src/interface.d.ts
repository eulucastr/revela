/// <reference types="vite/client" />

import type { Album, AlbumMeta } from './types';

export { };

declare global {
    interface Window {
        electronAPI: {
            getLibraryPath: () => Promise<string>;
            listAlbums: (path: string) => Promise<Album[]>;
            createAlbum: (libraryPath: string, albumData: Album) => Promise<boolean>;
            addPhotos: (albumPath: string) => Promise<boolean>;
            listPhotos: (albumPath: string) => Promise<string[]>;
            getAlbumMeta: (albumPath: string) => Promise<AlbumMeta>;
            updateAlbumMeta: (albumPath: string, meta: AlbumMeta) => Promise<boolean>;
        };
    }
}

declare module "*.webp" {
    const value: string;
    export default value;
}
