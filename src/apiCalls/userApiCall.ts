import { DOMAIN } from "@/utils/constants";
import { User } from "@prisma/client";

// Get All Users
export async function getAllUsers(id:number | undefined): Promise<User[]> {
    const response = await fetch(`${DOMAIN}/api/users/profile/${id}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    return await response.json();
}
