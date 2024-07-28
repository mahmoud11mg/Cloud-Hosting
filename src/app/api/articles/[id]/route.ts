import { NextRequest, NextResponse } from 'next/server'
import { UpdateArticleDto } from '@/utils/dtos';
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';


interface Props {
    params: { id: string }
}

/** 
 * @method GET
 * @route  http://localhost:3000/api/articles/:id Or ~/api/articles/:id
 * @dexc   GET Single Articles By Id
 * @access public
 */

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const article = await prisma.article.findUnique({
             where: { id: parseInt(params.id) },
             include:{
                comments:{
                    include:{
                       user:{
                        select:{
                            username:true,
                          },
                       },
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
             }

             });
        if (!article) {
            return NextResponse.json({ message: 'Article not found' }, { status: 404 });
        }
        return NextResponse.json(article, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


/** 
 * @method PUT
 * @route  http://localhost:3000/api/articles/:id Or ~/api/articles/:id
 * @dexc   Update Articles
 * @access private (Only Admin con Update articles)
 */
export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const user = verifyToken(request);
        if (user === null ||user.isAdmin === false) {
            return NextResponse.json({ message: "Only Admins, Access denied" }, { status: 403 });
        }
        const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });
        if (!article) {
            return NextResponse.json({ message: 'Article not found' }, { status: 404 });
        }
        const body = (await request.json()) as UpdateArticleDto;
        const UpdateArticle = await prisma.article.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description
            },

        });

        return NextResponse.json(UpdateArticle, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

/** 
 * @method DELETE
 * @route  http://localhost:3000/api/articles/:id Or ~/api/articles/:id
 * @dexc   DELETE Articles
 * @access private (Only Admin con DELETE articles
 */

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const user = verifyToken(request);
        if (user === null ||user.isAdmin === false) {
            return NextResponse.json({ message: "Only Admins, Access denied" }, { status: 403 });
        }
        const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });
        if (!article) {
            return NextResponse.json({ message: 'Article not found' }, { status: 404 });
        }
        const DELETEArticle = await prisma.article.delete({
            where: { id: parseInt(params.id) }
        });

        return NextResponse.json({ message: 'Article  DELETE' }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

}