import { z } from "zod";

// Create Acticle Schema
export const CreateArticleSchema = z.object({
    title: z.string(
        {
            required_error: "Title required",
            invalid_type_error: "Title  Should Be Of Type  String",
        }
    ).
        min(3, { message: "Title Must Be More Than 3 Characters" })
        .max(200, { message: "Title Must Be less Than Or Equal to 200 Characters" }),
    description: z.string(
        {
            required_error: "Description required",
            invalid_type_error: "Description  Should Be Of Type  String",
        }

    ).min(10, { message: "Description Must Be less Than Or Equal to 10 Characters" }),
})

// Register Schema
export const RegisterSchema = z.object({

    username: z.string().min(3, { message: "User Name Must Be More Than 3 Characters" })
        .max(100, { message: "User Name less Than Or Equal to 100 Characters" }),

    email: z.string().min(10, { message: "Email Must Be More Than 20 Characters" })
        .max(50, { message: " Email less Than Or Equal to 100 Characters" }),

    password: z.string().min(8, { message: "Password Must Be More Than 8 Characters" }),
})

// Login Schema
export const LoginSchema = z.object({
    email: z.string().min(10, { message: "Email Must Be More Than 20 Characters" })
        .max(50, { message: " Email less Than Or Equal to 100 Characters" }),
    password: z.string().min(8, { message: "Password Must Be More Than 8 Characters" }),
})
// Create Comment Schema
export const CreateCommentSchema = z.object({
    text: z.string().min(1, { message: "Text is required" }),
    articleId: z.number().min(1, { message: "Article ID is required and must be a number" }),
});

// Update User Profil Schema
export const UpdateUserSchema = z.object({

    username: z.string().min(3, { message: "User Name Must Be More Than 3 Characters" })
        .max(100, { message: "User Name less Than Or Equal to 100 Characters" }).optional(),

    email: z.string().min(10, { message: "Email Must Be More Than 20 Characters" })
        .max(50, { message: " Email less Than Or Equal to 100 Characters" }).optional(),

    password: z.string().min(8, { message: "Password Must Be More Than 8 Characters" }).optional(),
})