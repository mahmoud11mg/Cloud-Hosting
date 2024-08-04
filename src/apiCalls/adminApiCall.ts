// adminApiCall.ts
import { DOMAIN } from "@/utils/constants";
import { Comment } from "@prisma/client";

// Define the User type
type User = {
  id: number;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// Define the CommentWithUser type
type CommentWithUser = Comment & { user: User };

// Get all comments with user information
export async function getAllComments(token: string): Promise<CommentWithUser[]> {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: { cookie: `jwtToken=${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}
