import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import jwt from 'jsonwebtoken';
import { JWTPayload } from '@/utils/types';
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

        const authToken:string = request.headers.get('authToken') as string;
        const userFromToken = jwt.verify(authToken, process.env.JWT_SECRET as string) as JWTPayload;
        if (userFromToken.id === user.id) {
            await prisma.user.delete({ where: { id: parseInt(params.id) } });
            return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
        }

        return NextResponse.json({ message: 'Only User Himself Can Delete His Profile , Forbidden ' }, { status: 403 }); // 403 Forbidden

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

}