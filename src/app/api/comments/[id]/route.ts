import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';
import { UpdateCommentDto } from '@/utils/dtos';

interface Props {
  params: { id: string };
}

/** 
 * @method PUT
 * @route  http://localhost:3000/api/comments/:id  Or ~/api/comments/:id
 * @desc   Update Comments Articles
 * @access private  (only Owner Of The Comment)
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });
    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }

    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json({ message: 'You Are Not Allowed, Access Denied' }, { status: 401 });
    }
    const body = await request.json() as UpdateCommentDto;
    const updateComment = await prisma.comment.update({
      where: { id: parseInt(params.id) },
      data: { text: body.text }
    });
    return NextResponse.json(updateComment, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/** 
 * @method DELETE
 * @route  http://localhost:3000/api/comments/:id  Or ~/api/comments/:id
 * @desc   DELETE Comments Articles
 * @access private  (only Admin OR Owner Of The Comment)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });
    if (!comment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }

    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json({ message: 'No Token Provided, access denied' }, { status: 401 });
    }
    if (user.isAdmin || user.id === comment.userId) {
      await prisma.comment.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json({ message: 'Comment Deleted' }, { status: 200 });
    }
    return NextResponse.json({ message: 'You Are Not Allowed, Access Denied' }, { status: 403 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
