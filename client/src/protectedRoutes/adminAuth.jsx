import React from 'react'
import { json, Navigate, Outlet } from 'react-router-dom'

const AdminAuth=()=>
{
const user=JSON.parse(localStorage.getItem('admin'));
return user?<Outlet/>:<Navigate to='/admin/signin'/>

}

export default AdminAuth