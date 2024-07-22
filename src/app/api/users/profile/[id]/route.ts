import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/utils/types';
import { verifyToken } from '@/utils/verifyToken';
interface Props {
    params: { id: string }
}

/** 
* @method DELETE
* @route  http://localhost:3000/api/users/profile/:id Or ~/api/users/profile/:id
* @dexc   Created New User [(Register) ( Sign Up) (إنشاء حساب )]
* @access Private
*/
export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });

        if (!user) {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
        }

        const userFromToken = verifyToken(request);
        if (userFromToken !==null && userFromToken.id === user.id) {
            await prisma.user.delete({ where: { id: parseInt(params.id) } });
            return NextResponse.json({ message: 'Your Profile ( account ) has been deleted ' }, { status: 200 });
        }

        return NextResponse.json({ message: 'Only User Himself Can Delete His Profile , Forbidden ' }, { status: 403 }); // 403 Forbidden

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

}