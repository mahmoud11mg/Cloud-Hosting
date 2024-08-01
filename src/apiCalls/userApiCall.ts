import { DOMAIN } from "@/utils/constants";
import { User } from "@prisma/client";

export async function getAllUsers(): Promise<User[]> {
    const response = await fetch(`${DOMAIN}/api/users`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    return await response.json();
}
