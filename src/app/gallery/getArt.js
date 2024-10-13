import axios from 'axios';

export async function getArtGalleryByLocalHostApi() {
    try {
        const url = `${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/api/Gallery`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching art objects:', error);
        return [];
    }
}

export async function getArtInfoByLocalHostApi(id) {
    try {
        const url = `${process.env.NEXT_PUBLIC_LOCALHOST_API_URL}/api/ArtInfo?id=${id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching art objects:', error);
        return;
    }
}