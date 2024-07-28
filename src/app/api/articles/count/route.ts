import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';

/** 
 * @method GET
 * @route  http://localhost:3000/api/articles/count Or ~/api/articles/count
 * @desc   Get Articles Count
 * @access public 
 */
export async function GET(request: NextRequest) {
    try {
        
        const count = await prisma.article.count();
        return NextResponse.json({ count }, { status: 200 });
  

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}