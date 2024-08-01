'use client';

import { useState } from 'react';
import { User } from '@/utils/types'; // Adjust the path according to your project structure
import { toast } from 'react-toastify';

interface AdminUsersTableClientProps {
    users: User[];
}

const AdminUsersTableClient: React.FC<AdminUsersTableClientProps> = ({ users }) => {
    const [localUsers, setLocalUsers] = useState<User[]>(users);

    const handleAdminChange = async (id: number, isAdmin: boolean) => {
        try {
            const response = await fetch(`/api/users/profile/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isAdmin }), // Include other fields if needed
            });

            if (!response.ok) {
                throw new Error(`Failed to update user: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Response:", result);

            // Optionally update local state to reflect changes
            setLocalUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, isAdmin } : user
                )
            );

            toast.success('Admin status updated successfully', { autoClose: 2000 });

        } catch (error) {
            toast.error('Failed to update admin status', { autoClose: 2000 });
            console.error('Error updating admin status:', error);
        }
    };

    return (
        <table className="table w-full text-left">
            <thead className="border-t-2 border-b-2 border-gray-500 lg:text-lg">
                <tr>
                    <th className="px-1 lg:p-2">Name</th>
                    <th className="px-1 lg:p-2">Email</th>
                    <th className="px-1 lg:p-2">Is Admin</th>
                </tr>
            </thead>
            <tbody>
                {localUsers.map((user) => (
                    <tr className="border-b border-t border-gray-300" key={user.id}>
                        <td className="p-1 text-gray-700">{user.username}</td>
                        <td className="p-1 text-gray-700">{user.email}</td>
                        <td className="p-1">
                            <select
                                value={user.isAdmin ? 'true' : 'false'}
                                onChange={(e) =>
                                    handleAdminChange(user.id, e.target.value === 'true')
                                }
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AdminUsersTableClient;
