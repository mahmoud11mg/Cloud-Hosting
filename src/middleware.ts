import { NextRequest, NextResponse } from 'next/server'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;

  if (!token) {
    return NextResponse.json({ message: 'No Token Provided ,Access Denied , Message From Middle Ware' }, { status: 401 }); // 401 Unauthorized
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/users/profile/:path*"],
}