import axios from 'axios';
import { NewsArticle } from 'types';

export async function getSingleNews(): Promise<NewsArticle[]> {
    let berita: NewsArticle[] = [];

    try {
        const response = await axios.get("https://api-berita-indonesia.vercel.app/tribun/terbaru/");
        berita = response.data.data.posts;
    } catch (error) {
        // Tangani kesalahan (error) di sini, misalnya dengan melemparkannya atau mencetaknya
        throw error;
    }

    return berita;
}
