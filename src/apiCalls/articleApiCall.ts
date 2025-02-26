import { Article } from "@prisma/client";
import { DOMAIN } from '@/utils/constants';
import { SingleArticle } from "@/utils/types";


// Get Articles based on pageNumber
export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
   
    const response = await fetch(
        `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
        {cache:'no-store'}
    );
    if (!response.ok) {
        throw new Error(`Failed To Fetch Articles`);
    }   
     
    return response.json();
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