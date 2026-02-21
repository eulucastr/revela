export { };

declare global {
    interface Window {
        electronAPI: {
            selectLibrary: () => Promise<string | null>;
            listGalleries: (path: string) => Promise<string[]>;
            createGallery: (libraryPath: string, name: string) => Promise<boolean>;
            listPhotos: (galleryPath: string) => Promise<string[]>;
            getAlbumMeta: (galleryPath: string) => Promise<any>;
        };
    }
}
