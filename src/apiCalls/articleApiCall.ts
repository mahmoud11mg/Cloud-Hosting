import { Article } from "@prisma/client";
import { DOMAIN } from '@/utils/constants';
import { SingleArticle } from "@/utils/types";


// Get Articles based on PageNumber
export async function getArticles(PageNumber: string | undefined): Promise<Article[]> {
   
    const response = await fetch(`${DOMAIN}/api/articles?PageNumber=${PageNumber}`);
    if (!response.ok) {
        throw new Error(`Failed To Fetch Articles`);
    }   
     
    return response.json();
}

// Get Articles Count
export async function getArticlesCount(): Promise<number> {
    const response = await fetch(`${DOMAIN}/api/articles/count`);
    if (!response.ok) {
        throw new Error(`Failed To Get Article Count`);
    }
    const { count } = await response.json() as { count: number };
    return count;
}

// Get Articles based on SarchText
export async function getArticlesBasedOnSarch(searchText: string ): Promise<Article[]> {
    const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`);
    if (!response.ok) {
        throw new Error(`Failed To Fetch Articles`);
    }
    return response.json();
}

// Get Single Article By ID
export  async function getSingleArticle(articleId: string): Promise<SingleArticle>{
    const response = await fetch(`${DOMAIN}/api/articles/${articleId}`,{
        cache:'no-store'},
    );
if (!response.ok) {
  throw new Error(`Failed to fetch article:`); 
 }
     return await response.json();

}