import React from 'react';
import PhotoFrame from './PhotoFrame';
import '../styles/components/PageRenderer.scss';

interface PageRendererProps {
    photos: string[];
    template: string;
    pageIndex: number;
    albumPath: string;
}

const PageRenderer: React.FC<PageRendererProps> = ({ photos, template, pageIndex, albumPath }) => {
    // Simple logic for now: 2 photos per page
    const photosOnThisPage = photos.slice(pageIndex * 2, (pageIndex * 2) + 2);

    return (
        <div className={`page-template ${template}`}>
            {photosOnThisPage.map((photo, i) => (
                <PhotoFrame
                    key={photo}
                    id={`photo-${i}`}
                    src={`${albumPath}/${photo}`}
                />
            ))}
        </div>
    );
};

export default PageRenderer;
