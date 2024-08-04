import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';
import { CreateCommentDto } from '@/utils/dtos';
import { CreateCommentSchema } from '@/utils/ValidationSchema';

/** 
 * @method Post
 * @route  http://localhost:3000/api/comments Or ~/api/comments
 * @dexc   Create New Comments Articles
 * @access private 
 */
export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request); 
        if (!user) {
            return NextResponse.json({ message: "Only Logged in Users, Access denied" }, { status: 401 });
        } 

        const body = await request.json() as CreateCommentDto;
        
        // Convert articleId to number if it's a string
        const articleId = typeof body.articleId === 'string' ? parseInt(body.articleId, 10) : body.articleId;

        const validation = CreateCommentSchema.safeParse({
            ...body,
            articleId, // Ensure articleId is in the correct format for validation
        });

        if (!validation.success) {
            return NextResponse.json({ 
                message: validation.error.errors.map(err => err.message).join(', ') 
            }, { status: 400 });
        }

        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId, // Use the number type here
                userId: user.id
            },
        });

        return NextResponse.json(newComment, { status: 201 });
    }
    catch (error) {
        console.error(error); // Added for better debugging
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

/** 
 * @method GET
 * @route  http://localhost:3000/api/comments Or ~/api/comments
 * @desc   GET All Comments Articles
 * @access private (only Admin)
 */
export async function GET(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json({ message: "Only Admin User, Access denied" }, { status: 403 });
        }

        const comments = await prisma.comment.findMany({
            include: {
                user: true, // Include user information
            },
        });

        return NextResponse.json(comments, { status: 200 });
    } catch (error) {
        console.error(error); // Added for better debugging
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}