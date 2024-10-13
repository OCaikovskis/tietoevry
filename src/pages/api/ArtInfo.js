import axios from 'axios';
import { ArtObject } from '@/app/lib/ArtObject';

export default async function handler(req, res) {
    const id = req.method === 'POST' ? req.body.id : req.query.id;
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    const url = `${process.env.MUSEUM_GALLERY_API_URL}/${id}?key=${process.env.API_KEY}&format=json`;
    try {
        const response = await axios.get(url);
        const artObjects = mapJsonToArtObjects(response.data);
        return res.status(200).json(artObjects);
    } catch (error) {
        console.error(`Error fetching art objects: ${error.message}`);
        if (error.response) {
            console.error(`Response data: ${JSON.stringify(error.response.data)}`);
        }
        return res.status(500).json({ error: 'Failed to fetch art objects' });
    }
}

function mapJsonToArtObjects(json) {
    const artObject = json.artObject;
    return new ArtObject(
        artObject.objectNumber,
        artObject.webImage ? artObject.webImage.url : null,
        artObject.title,
        artObject.plaqueDescriptionEnglish,
        artObject.principalMaker);
}