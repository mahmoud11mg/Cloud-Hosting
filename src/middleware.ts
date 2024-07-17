import {NextRequest, NextResponse } from 'next/server'
 // This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const authToken:string = request.headers.get('authToken') as string;

    if (!authToken) {
        return NextResponse.json({ message: 'No Token Provided ,Access Denied , Message From Middle Ware' },{ status: 401 }); // 401 Unauthorized
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/users/profile/:path*"],
}