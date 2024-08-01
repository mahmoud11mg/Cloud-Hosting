import { Article,Comment } from "@prisma/client";
 export type JWTPayload={
  id: number
  isAdmin: boolean,
  username: string
  email: string
}

export type CommentWithUser = Comment & {user:User};
export type SingleArticle   = Article & {comments:CommentWithUser[]};


// types.d.ts (or another appropriate file for types)
export interface User {
  id: number; // Change from string to number if this is how IDs are defined
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

