/**
 * Central type definitions for ReveLa
 */

/** 
 * Album data as returned by list-albums IPC
 * The folder name in the filesystem is the `code`
 */
export interface Album {
    /** Unique album identifier - also the folder name */
    code: string;
    /** Human-readable album name */
    name: string;
    /** Creation date in pt-BR format (DD/MM/YYYY, HH:mm) */
    date: string;
}

/**
 * Album metadata stored in .meta/album.json
 */
export interface AlbumMeta {
    /** Ordered list of photo filenames */
    photos: string[];
    /** Template used for rendering */
    template: string;
    /** Human-readable album name */
    name: string;
    /** Creation date */
    date: string;
    /** Unique album code (same as folder name) */
    code: string;
}
