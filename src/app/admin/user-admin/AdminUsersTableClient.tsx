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

            toast.success('Admin status updated successfully', { autoClose: 1000 });

        } catch (error) {
            toast.error('Failed to update admin status', { autoClose: 2000 });
            console.error('Error updating admin status:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/users/profile/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete user: ${response.statusText}`);
            }

            // Optionally update local state to reflect changes
            setLocalUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

            toast.success('User deleted successfully', { autoClose: 1000 });

        } catch (error) {
            toast.error('Failed to delete user', { autoClose: 2000 });
            console.error('Error deleting user:', error);
        }
    };

    return (
        <table className="table w-full text-left">
            <thead className="border-t-2 border-b-2 border-gray-500 lg:text-lg">
                <tr>
                    <th className="px-1 lg:p-2">Name</th>
                    <th className="px-1 lg:p-2">Email</th>
                    <th className="px-1 lg:p-2">Is Admin</th>
                    <th className="px-1 lg:p-2">Actions</th> {/* New column for actions */}
                </tr>
            </thead>
            <tbody>
                {localUsers.map((user) => (
                    <tr className="border-b border-t border-gray-300" key={user.id}>
                        <td className="p-1 text-gray-700">{user.username}</td>
                        <td className="p-1 text-gray-700">{user.email}</td>
                        <td className="p-1">
                            <input className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300  rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-sky-700 dark:border-sky-600' 
                                type="checkbox"
                                checked={user.isAdmin}
                                onChange={(e) =>
                                    handleAdminChange(user.id, e.target.checked)
                                }
                            />
                        </td>
                        <td className="p-1">
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="text-white cursor-pointer text-center py-1 rounded-lg p-2 px-2 inline-block bg-red-600 hover:bg-red-800 transition"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AdminUsersTableClient;
