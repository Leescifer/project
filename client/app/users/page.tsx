'use client';
import Link from "next/link";
import React, { useEffect, useState } from 'react';

interface UserInfo {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<string>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: UserInfo[] = await res.json();
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) 
    return (
      <div className="text-center mt-23 text-xl font-semibold">
        Loading...
      </div>
    );

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filtering users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.website.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting before pagination
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortField as keyof UserInfo] < b[sortField as keyof UserInfo]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortField as keyof UserInfo] > b[sortField as keyof UserInfo]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => {
    if (indexOfLastUser < filteredUsers.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-center font-semibold text-4xl mb-6 text-gray-800">Users</h1>
      
      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search users..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="mb-4 p-2 border rounded w-45 max-w-6xl"
      />

      {/* User Table */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-6xl p-6">
        {/* Table Header */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 font-semibold text-gray-700 bg-gray-200 p-3 rounded-md">
          <span className="text-center cursor-pointer">ID</span>
          <span className="cursor-pointer" onClick={() => handleSort('name')}>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Website</span>
        </div>

        {/* Table Rows */}
        {currentUsers.map((user) => (
          <div 
            key={user.id} 
            className="grid grid-cols-2 md:grid-cols-5 gap-4 p-3 border-b last:border-none hover:bg-gray-100 transition-all"
          >
            <span className="text-center">{user.id}</span>
            <span className="font-medium">{user.name}</span>
            <span className="break-words">{user.email}</span>
            <span>{user.phone}</span>
            <span className="break-words">{user.website}</span>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6 w-full max-w-4xl">
        <button 
          onClick={prevPage} 
          disabled={currentPage === 1} 
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          ⇦
        </button>
        <span className="text-lg font-semibold">Page {currentPage}</span>
        <button 
          onClick={nextPage} 
          disabled={indexOfLastUser >= filteredUsers.length} 
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
         ⇨
        </button>
      </div>

      {/* Back Button */}
      <Link 
        href="/" 
        className="mt-6 text-white hover:bg-gray-800 text-lg border px-6 py-3 rounded-lg bg-black transition-all"
      >
        Back
      </Link>
    </div>
  );
};

export default UserPage;
