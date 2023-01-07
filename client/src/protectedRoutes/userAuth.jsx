import React from 'react'
import { json, Navigate, Outlet } from 'react-router-dom'

const UserAuth=()=>
{
const user=JSON.parse(localStorage.getItem('user'));
console.log(user);
return user?<Outlet/>:<Navigate to='/login'/>
}

export default UserAuth