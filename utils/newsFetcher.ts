import axios from 'axios';
import { NewsArticle } from 'types';

export async function GetAllNews() {
    return getSingleNews();
}

export async function getSingleNews(): Promise<NewsArticle> {
    const getNews = await axios.get("https://newsapi.org/v2/top-headlines?country=id&apiKey=78c8fd330d7b4842a78f19ee291690b8");
    const response: NewsArticle = getNews.data;
    console.log(`Dari Utils: ${response}`);
    return response
}

export async function GetThePost() {

}



