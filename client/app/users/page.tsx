import React from 'react'

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

const UserPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: UserInfo[] = await res.json();
  return (
    <div className="flex justify-center items-center flex-col h-[95vh] bg-gray-100 p-6">
      <h1 className="text-center font-semibold text-4xl mb-6 text-gray-800">Users</h1>
      <ul className="bg-white shadow-md rounded-lg w-full max-w-2xl p-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-3 border-b last:border-none hover:bg-gray-50 transition-all"
          >
            <span className="font-semibold text-gray-700">{user.name}:</span>
            <span className="text-gray-600">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default UserPage