import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';



/** 
 * @method GET
 * @route  http://localhost:3000/api/articles/search?searchText=value Or ~/api/articles/search?searchText=value
 * @desc   Get Articles By Search Text
 * @access public 
 */
export async function GET(request: NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get('searchText');
        let articles;
        if (searchText) {
            articles = await prisma.article.findMany({
                where: {
                    title:{
                        startsWith: searchText,
                        mode:'insensitive',
                    },
                },
            });
        }
        else {
            articles = await prisma.article.findMany({ take: 6 })
        }
        return NextResponse.json(articles, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}