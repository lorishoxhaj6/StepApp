import { useState } from 'react';
import { NavLink } from 'react-router';
import { NavbarData } from './NavbarData';
import SidebarButton from './ui/ShimmerButton';
import { StepsTitle } from './ui/StepsTitle';
import { SH } from './ui/StepTitleMin';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Bottone hamburger visibile solo su mobile */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white shadow-md border border-gray-200"
        >
          <SidebarButton />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white flex flex-col pt-5 shadow-lg z-40 transition-all duration-500 ease-in-out 
          ${isOpen ? 'w-[250px]' : 'w-[100px]'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'} 
          sm:relative sm:translate-x-0
        `}
      >
        <ul className="h-full w-full flex flex-col">
          {isOpen ? (
            <li className="mb-2 justify-center flex flex-col whitespace-nowrap text-[35px] items-center">
              <StepsTitle />
            </li>
          ) : (
            <li className="justify-center flex flex-col whitespace-nowrap text-[35px] items-center">
              <SH />
            </li>
          )}

          {NavbarData.map((val, key) => (
            <li key={key} className="p-7 px-0.5">
              <NavLink
                to={val.link}
                className={({ isActive }) =>
                  `no-underline text-inherit flex w-full ${isActive ? 'font-semibold' : ''}`
                }
              >
                <div
                  className={`flex-shrink-0 ${isOpen ? 'w-1/3' : 'w-full'} flex justify-center items-center transition-all duration-300 ease-in-out`}
                >
                  {val.icon}
                </div>

                <div
                  className={`flex font-semibold text-[24px] transition-all duration-400 ease-in-out
                    text-gray-800 hover:text-blue-600 
                    ${isOpen ? 'opacity-100' : 'opacity-0 translate-x-4'}
                    whitespace-nowrap`}
                >
                  {val.title}
                </div>
              </NavLink>
            </li>
          ))}

          {/* Bottone toggle sidebar visibile solo su sm+ */}
          <li className="justify-center items-center hidden sm:flex">
            <div
              onClick={toggleSidebar}
              className={`flex justify-center items-center transition duration-500 ease-in-out px-0.5 p-7
                ${isOpen ? 'hover:scale-140 rotate-180 scale-130' : 'rotate-0 scale-100 hover:scale-90'}`}
            >
              <SidebarButton />
            </div>
          </li>
        </ul>
       
      </div>
                
      {/* Overlay su mobile quando sidebar è aperta */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 sm:hidden z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default Navbar;
