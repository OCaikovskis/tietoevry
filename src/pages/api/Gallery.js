import axios from 'axios';
import { ArtObject } from '@/app/lib/ArtObject';

const random = Math.random;

export default async function handler(req, res) {
    const url = `${process.env.MUSEUM_GALLERY_API_URL}?key=${process.env.API_KEY}&format=json&imgonly=True`;
    try {
        const response = await axios.get(url);
        const artObjects = mapJsonToArtObjects(response.data);
        const shuffledArtObjects = shuffleArtObjects(artObjects);
        return res.status(200).json(shuffledArtObjects);
    } catch (error) {
        console.error(`Error: ${error}`);
        return res.status(500).json({ error: 'Failed to fetch art objects' });
    }
}

function mapJsonToArtObjects(json) {
    const artObjects = [];
    if (json.artObjects && Array.isArray(json.artObjects)) {
        json.artObjects.forEach(artObjectElement => {
            var tmpImageUrl = artObjectElement.webImage.url;
            if (tmpImageUrl.endsWith('=s0')) {
                tmpImageUrl = tmpImageUrl.slice(0, -3);
            }
            var artObject = new ArtObject (
                artObjectElement.objectNumber,
                tmpImageUrl,
            );
            artObjects.push(artObject);
        });
    }
    return artObjects;
}

function shuffleArtObjects(artObjects) {
    const shuffledArtObjects = [];
    while (shuffledArtObjects.length < artObjects.length && shuffledArtObjects.length < Number(process.env.GALLERY_SIZE)) {
        const randomNumber = Math.floor(random() * artObjects.length);
        if (!shuffledArtObjects.some(a => a.objectNumber === artObjects[randomNumber].objectNumber)) {
            shuffledArtObjects.push(artObjects[randomNumber]);
        }
    }
    return shuffledArtObjects;
}