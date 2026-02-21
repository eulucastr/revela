/// <reference types="vite/client" />

export { };

declare global {
    interface AlbumMeta {
        photos: string[];
        template: string;
    }

    interface Window {
        electronAPI: {
            getLibraryPath: () => Promise<string>;
            listAlbums: (path: string) => Promise<{ name: string, preview: string | null }[]>;
            createAlbum: (libraryPath: string, name: string) => Promise<boolean>;
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
