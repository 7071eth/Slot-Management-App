import React from 'react'
import { useState } from 'react';
import imgi from '../../assets/user/icons/control.png'
import chat from '../../assets/user/icons/Chat.png'
import calender from '../../assets/user/icons/Calendar.png'
import chart from '../../assets/user/icons/Chart.png'
import { NavLink } from 'react-router-dom';
import '../../assets/user/style.css';
function Sidebar() {

    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "Requests", src: chat },
      { title: "ApprovedList", src: calender },
      { title: "RejectedList", src: chart },
    ];
  return (
    <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-gray-900 h-screen p-5 pt-8 relative duration-300`}
       >
        
        
        
        <img
          src={imgi}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-gray-400
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <nav>
            <NavLink exact to={`/admin/${Menu.title}`} className="link" activeClassName="active">
            <li
              key={index}
              className={'flex place-items-center'}
            >   
                
              <img src={Menu.src} />
              <span className={`${!open && "hidden"} origin-left duration-200 ml-4 font-semibold`}>
                {Menu.title}
              </span>
            </li>
            </NavLink>
            </nav>
          ))}
        </ul>
      </div>
  )
}

export default Sidebar