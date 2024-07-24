import { NextRequest, NextResponse } from 'next/server';
import { CreateArticleSchema } from '@/utils/ValidationSchema';
import { CreateArticleDto } from '@/utils/dtos';
import { Article } from '@prisma/client';
import prisma from '@/utils/db';

/** 
 * @method GET
 * @route  http://localhost:3000/api/articles Or ~/api/articles
 * @desc   GET All Articles
 * @access Public
 */
export async function GET(request: NextRequest) {
    try {
        const articles = await prisma.article.findMany();
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
 * @access Public
 */
export async function POST(request: NextRequest) {
    try {
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
