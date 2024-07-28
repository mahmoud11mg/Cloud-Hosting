import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { verifyToken } from '@/utils/verifyToken';
import { UpdateUserDto } from '@/utils/dtos';
import bcrypt from 'bcryptjs';
import { UpdateUserSchema } from '@/utils/ValidationSchema';
interface Props {
    params: { id: string }
}

/** 
* @method DELETE
* @route  http://localhost:3000/api/users/profile/:id Or ~/api/users/profile/:id
* @dexc   Created New User [(Register) ( Sign Up) (إنشاء حساب )]
* @access private
*/
export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({ 
            where: { id: parseInt(params.id) } ,
            include:{
                comments:true
            }
        });

        if (!user) {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
        }

        const userFromToken = verifyToken(request);
        if (userFromToken !== null && userFromToken.id === user.id) {
            //Delete User 
            await prisma.user.delete({ where: { id: parseInt(params.id) } });
        //Delete Comments thet belongs to the User
        const commentsId : number[] = user?.comments.map(comment => comment.id);
        await prisma.comment.deleteMany({ where: { id:{ in:commentsId } } });


            return NextResponse.json({ message: 'Your Profile ( account ) has been deleted ' }, { status: 200 });
        }

        return NextResponse.json({ message: 'Only User Himself Can Delete His Profile , Forbidden ' }, { status: 403 }); // 403 Forbidden

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

}

// GET 
/** 
* @method GET
* @route  http://localhost:3000/api/users/profile/:id Or ~/api/users/profile/:id
* @dexc   GET Profile By ID
* @access private (Only User Himeself Can Get His Account/profile)
*/
export async function GET(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id) },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                isAdmin: true,


            }

        });
        if (!user) {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
        }

        const userFromToken = verifyToken(request);

        if (userFromToken === null || userFromToken.id !== user.id) {

            return NextResponse.json({ message: 'You Are Not Allowed, Access denied ' }, { status: 403 });
        }
        return NextResponse.json(user, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

}

// PUT
/** 
* @method PUT
* @route  http://localhost:3000/api/users/profile/:id Or ~/api/users/profile/:id
* @dexc   Update User Profile [(Edit Profile) (تعديل الملف الشخصي )]
* @access private (Only User Himeself Can Update His Account/profile)
*/
export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } });
        if (!user) {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
        }
        const userFromToken = verifyToken(request);

        if (userFromToken === null || userFromToken.id !== user.id) {

            return NextResponse.json({ message: 'You Are Not Allowed, Access denied ' }, { status: 403 });
        }

        const body = await request.json() as UpdateUserDto;
        const validation =UpdateUserSchema.safeParse(body);
        if(!validation.success){
           
            return NextResponse.json({message:validation.error.errors[0].message} , { status: 400 });
            
        }
        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);

        }


        const UpdateUser = await prisma.user.update({
            where: { id: parseInt(params.id) },
            data: {
                username: body.username,
                email: body.email,
                password: body.password,
            }

        });
        const { password, ...other } = UpdateUser;
        return NextResponse.json({ ...other }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ message: 'User Not Found' }, { status: 404 });
    }

}

