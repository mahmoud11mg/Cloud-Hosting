import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { user_PER_PAGE } from '@/utils/constants';
import { verifyToken } from '@/utils/verifyToken';
import { UpdateUserAdminDto } from '@/utils/dtos';
import { UpdateUserAdminSchema } from '@/utils/ValidationSchema';
interface Props {
    params: { id: string }
}
/** 
 * @method GET
 * @route  http://localhost:3000/api/users Or ~/api/users
 * @desc   GET users By Page Number
 * @access Public
 */
export async function GET(request: NextRequest) {
    try {
        const pageNumber = parseInt(request.nextUrl.searchParams.get("pageNumber") || "1");

        const users = await prisma.user.findMany({
            skip: user_PER_PAGE * (pageNumber - 1),
            take: user_PER_PAGE,
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
// app/api/users/[id]/route.ts


/** 
 * @method PUT
 * @route  http://localhost:3000/api/users/[id]
 * @desc   Update user information
 * @access Admin
 */
export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const userId = parseInt(params.id, 10);
        console.log("Request Params:", params);

        // Check if the user exists
        const user = verifyToken(request);
        if (user === null ||user.isAdmin === false) {
            return NextResponse.json({ message: "Only Admins, Access denied" }, { status: 403 });
        }
        

        // Verify the token and ensure the user is authorized
        const userFromToken = verifyToken(request);
        if (userFromToken === null || !userFromToken.isAdmin) {
            return NextResponse.json({ message: 'Access denied' }, { status: 403 });
        }

        // Parse and validate the request body
        const body = await request.json() as UpdateUserAdminDto;
        console.log("Request Body:", body);

        const validation = UpdateUserAdminSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

        // Update the user in the database
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                username: body.username,
                email: body.email,
                isAdmin: body.isAdmin,
            }
        });

        // Exclude sensitive information such as password from the response
        const { password, ...userWithoutPassword } = updatedUser;
        return NextResponse.json(userWithoutPassword, { status: 200 });

    } catch (error: any) {
        console.error("Error:", error.message);
        return NextResponse.json({ message: 'Failed to update user', error: error.message }, { status: 500 });
    }
}