import { NextRequest, NextResponse } from 'next/server';
import { LoginUserDto } from '@/utils/dtos';
import { LoginSchema } from '@/utils/ValidationSchema';
import prisma from '@/utils/db';
import bcrypt from 'bcryptjs';
import { setCookie } from '@/utils/generateToken';

/** 
 * @method POST
 * @route  http://localhost:3000/api/users/login Or ~/api/users/login
 * @desc   Login User [(Login) (Sign In) (تسجيل الدخول)]
 * @access Public
 */
export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as LoginUserDto;
        const validation = LoginSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } });

        if (!user) {
            return NextResponse.json({ message: "Invalid Email Or Password" }, { status: 400 });
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json({ message: "Invalid Email Or Password" }, { status: 400 });
        }

        const cookie = setCookie({
            id: user.id,
            isAdmin: user.isAdmin,
            username: user.username
        });

        return NextResponse.json({ message: "Authenticated" }, {
            status: 200,
            headers: { 'Set-Cookie': cookie },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
