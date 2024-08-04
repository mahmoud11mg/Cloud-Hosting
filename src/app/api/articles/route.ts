import { NextRequest, NextResponse } from 'next/server';
import { CreateArticleSchema } from '@/utils/ValidationSchema';
import { CreateArticleDto } from '@/utils/dtos';
import { Article } from '@prisma/client';
import prisma from '@/utils/db';
import { ARTICLE_PER_PAGE } from '@/utils/constants';
import { verifyToken } from '@/utils/verifyToken';


/** 
 * @method GET
 * @route  http://localhost:3000/api/articles Or ~/api/articles
 * @desc   GET Articles By Page Number
 * @access Public
 */
export async function GET(request: NextRequest) {
    try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
        const articles = await prisma.article.findMany({
            skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
            take: ARTICLE_PER_PAGE,


        });
        console.log('Fetched Articles:', articles);

        return NextResponse.json(articles, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

/** 
 * @method POST
 * @route  http://localhost:3000/api/articles Or ~/api/articles
 * @desc   Create New Articles
 * @access private (Only Admin con Creates articles)
 */
export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json({ message: "Only Admins, Access denied" }, { status: 403 });
        }
        const body = (await request.json()) as CreateArticleDto;
        const validation = CreateArticleSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors }, { status: 400 });
        }

        const newArticle: Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description,
            },
        });

        return NextResponse.json(newArticle, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
