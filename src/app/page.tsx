'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from '@/styles/Gallery.module.css';
import { getArtGalleryByLocalHostApi } from '@/app/gallery/getArt';
import { ArtObject } from '@/app/lib/ArtObject';

export default function Home() {
  const [artObjects, setArtObjects] = useState<ArtObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  const fetchArtObjects = async () => {
    setIsLoading(true);
    const artObjects: ArtObject[] = await getArtGalleryByLocalHostApi();
    setArtObjects(artObjects);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchArtObjects();
    }
  }, []);

  return (
    <div className={styles.galleryContainer}>
      <p className={styles.title}>Simple Gallery</p>
      <div className={styles.gallery}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          artObjects.map((artObject: ArtObject) => (
            <div key={artObject.objectNumber} className={styles.imageContainer}>
              <a href={`/infoPages/${artObject.objectNumber}`} rel="noopener noreferrer">
                <Image
                  src={artObject.imageUrl}
                  alt={`Image ${artObject.objectNumber}`}
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </div>
          ))
        )}
      </div>
      <button onClick={fetchArtObjects} className={styles.shuffleButton} disabled={isLoading}>
        Shuffle Gallery
      </button>
    </div>
  );
}