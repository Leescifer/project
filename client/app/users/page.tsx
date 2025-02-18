import React from 'react'

interface User {
   id: number;
   name: string;
   email: string;
   phone: number;
}


const UsersPage = async () => {

const res = await fetch(
  'https://jsonplaceholder.typicode.com/users');
const users: User[] = await res.json();

  return (
   <>
   <h1>Users</h1>
   <p>{new Date().toLocaleTimeString()}</p>
   <ul>
    {users.map(user => <li key={user.id}>{user.name}{user.email}{user.phone}</li>)}
   </ul>
   </>
  );

};

export default UsersPage;