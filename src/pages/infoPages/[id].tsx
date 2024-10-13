'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/InfoPages.module.css';
import { getArtInfoByLocalHostApi } from '@/app/gallery/getArt';
import { ArtObject } from '@/app/lib/ArtObject';

const Subpage = () => {
    const router = useRouter();
    const { id } = router.query; 
    const [artObjects, setArtObjects] = useState<ArtObject>();
  
    const fetchArtObjects = async () => {
        if (!id) return;
        const artObjects: ArtObject = await getArtInfoByLocalHostApi(id);
        setArtObjects(artObjects);
    };
  
    useEffect(() => {
      fetchArtObjects();
    },[id]);

    return (
        <div className={styles.body}>
        <div className={styles.container}>
            <div className={styles.leftHalf}>
                {artObjects != null ? (
                    <Image
                    src={artObjects.imageUrl}
                    alt="Artwork"
                    layout="responsive"
                    width={500}
                    height={500}
                    />
                    ) : (
                        <p>Loading...</p>
                    )}
            </div>
            <div className={styles.rightHalf}>
                <h1>{artObjects?.title}</h1>
                <p className={styles.principalMaker}>{artObjects?.principalMaker}</p>
                <p className={styles.description}>{artObjects?.description}</p>
                <a href="/" className={styles.backButton}>
                    Back to Gallery
                </a>
            </div>
        </div>
        </div>
    );
};

export default Subpage;
