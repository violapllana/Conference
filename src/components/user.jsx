import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null); // For editing user
  const [formData, setFormData] = useState({
    username: '',
    password: '',  // We will leave this empty and handle it separately
    role: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again.');
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
        credentials: 'include', // Ensure cookies are sent with the request
      });
  
      if (!response.ok) {
        throw new Error('Error deleting user');
      }
  
      // If the delete was successful, update the state to reflect the changes
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
    }
  };
  

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ username: user.username, password: '', role: user.role });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
  
    try {
      const updatedData = { ...formData };
  
      // If password is left empty, we don't send it for update
      if (formData.password === '') {
        delete updatedData.password;
      }
  
      const response = await fetch(`http://localhost:5000/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
        credentials: 'include', // Include credentials (cookies)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
  
      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setEditingUser(null); // Close the edit form
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user. Please try again.');
    }
  };
  
  return (
    <div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {editingUser ? (
        <div className="bg-gray-100 p-6 rounded-md shadow-lg max-w-lg mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-4">Edit User</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update User
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-200 p-6 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <h4 className="text-xl font-bold mb-2">
                    <span className="font-medium">Username: </span>{user.username}
                  </h4>
                  <p className="text-gray-600 mb-1">
                    <strong>Role:</strong> {user.role}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full mb-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-3">No users found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
