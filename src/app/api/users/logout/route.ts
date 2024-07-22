import { NextRequest, NextResponse } from 'next/server';
import { cookies} from 'next/headers';
import { LoginSchema } from '@/utils/ValidationSchema';
import prisma from '@/utils/db';
import bcrypt from 'bcryptjs';
import { setCookie } from '@/utils/generateToken';

/** 
 * @method GET
 * @route  http://localhost:3000/api/users/logout Or ~/api/users/logout
 * @dexc   Logout User [ ( Sign Out) (  الخروج من الحساب  )]
 * @access Public
 */
export async function GET(request: NextRequest) {
    try {
        cookies().delete("jwtToken");
        return NextResponse.json({ message: "User LogOut Successfully" }, { status: 200 });

    }

    catch (error) {
        return NextResponse.json({ message: "Internal Server Error " }, { status: 500 })
    }
}

