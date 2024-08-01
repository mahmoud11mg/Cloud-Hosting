export interface CreateArticleDto {
    title: string;
    description: string;
}

export interface UpdateArticleDto {
    title?: string;
    description?: string;
}

export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
}
export interface LoginUserDto {
    email: string;
    password: string;
}

export interface UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    isAdmin?: boolean;
    
}
export interface CreateCommentDto {
    text: string;
    articleId: number;
}
export interface UpdateCommentDto {
    text: string;
}
export interface CreateUserDto {
    userName: string;
    email: string;
    isAdmin: boolean;
}

export interface UpdateUserAdminDto {
    username: string;
    email: string;
    isAdmin: boolean
    
}

