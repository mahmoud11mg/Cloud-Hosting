import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';
import { CommentDto } from '@/utils/dtos';
import { CreateCommentSchema } from '@/utils/ValidationSchema';

/** 
 * @method Post
 * @route  http://localhost:3000/api/comments Or ~/api/comments
 * @dexc   Create New Comments Articles
 * @access private 
 */
export async function Post(request: NextRequest) {
    try {
        const user = verifyToken(request); 
        if (!user) {
            return NextResponse.json({ message: "Only Logged in User, Access denied" }, { status: 401 });
        } 
        const body = await request.json() as CommentDto; 
        const validation = CreateCommentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }
        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId:body.articleId,
                userId :user.id
               
            },
        });
        return NextResponse.json(newComment, { status: 201 });
    }
    catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

/** 
 * @method GET
 * @route  http://localhost:3000/api/comments Or ~/api/comments
 * @dexc   GET All Comments Articles
 * @access private (only Admin)
 */

export async function GET(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json({ message: "Only Admin User, Access denied" }, { status: 403 });
        }
        const comments = await prisma.comment.findMany();
        return NextResponse.json(comments, { status: 200 });

    }
    catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}