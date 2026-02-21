import React from 'react';
import PhotoFrame from './PhotoFrame';

interface PageRendererProps {
    photos: string[];
    template: string;
    pageIndex: number;
    galleryPath: string;
}

const PageRenderer: React.FC<PageRendererProps> = ({ photos, template, pageIndex, galleryPath }) => {
    // Simple logic for now: 2 photos per page
    const photosOnThisPage = photos.slice(pageIndex * 2, (pageIndex * 2) + 2);

    return (
        <div className={`page-template ${template}`}>
            {photosOnThisPage.map((photo, i) => (
                <PhotoFrame
                    key={photo}
                    src={`${galleryPath}/${photo}`}
                    rotation={i % 2 === 0 ? -1 : 1.5}
                />
            ))}
        </div>
    );
};

export default PageRenderer;
