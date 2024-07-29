import { Article } from "@prisma/client";

// Get Articles based on pageNumber
export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
    const response = await fetch(`http://localhost:3000/api/articles?pageNumber=${pageNumber}`);
    if (!response.ok) {
        throw new Error(`Failed To Fetch Articles`);
    }
    return response.json();
}

// Get Articles Count
export async function getArticlesCount(): Promise<number> {
    const response = await fetch(`http://localhost:3000/api/articles/count`);
    if (!response.ok) {
        throw new Error(`Failed To Get Article Count`);
    }
    const { count } = await response.json() as { count: number };
    return count;
}

// Get Articles based on SarchText
export async function getArticlesBasedOnSarch(searchText: string ): Promise<Article[]> {
    const response = await fetch(`http://localhost:3000/api/articles/search?searchText=${searchText}`);
    if (!response.ok) {
        throw new Error(`Failed To Fetch Articles`);
    }
    return response.json();
}
