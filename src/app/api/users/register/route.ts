import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { RegisterUserDto } from '@/utils/dtos';
import { RegisterSchema } from '@/utils/ValidationSchema';
import bcrypt from 'bcryptjs';
import { setCookie } from '@/utils/generateToken';

/** 
 * @method POST
 * @route  http://localhost:3000/api/users/register Or ~/api/users/register
 * @desc   Create New User [(Register) (Sign Up) (إنشاء حساب)]
 * @access public
 */
export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as RegisterUserDto;
        const validation = RegisterSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } });

        if (user) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);
        

        const newUser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashPassword
            },
            select: {
                username: true,
                id: true,
                email: true,
                isAdmin: true,
            }
        });

        const cookie = setCookie({
            id: newUser.id,
            isAdmin: newUser.isAdmin,
            username:newUser .usernameو
            email:newUser.email


            
        });

        return NextResponse.json({ ...newUser, message: "Registered & Authenticated" }, {
            status: 201,
            headers: {
                'Set-Cookie': cookie
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
