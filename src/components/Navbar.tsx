import { useState } from 'react';
import { NavLink } from 'react-router'; 
import { NavbarData } from './NavbarData';
import SidebarButton from './ui/ShimmerButton';
import { StepsTitle } from './ui/StepsTitle';
import { SH } from './ui/StepTitleMin';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar sempre visibile */}
      <div
        className={`top-0 h-screen bg-white flex flex-col pt-5 shadow-lg z-40  transition-all duration-500 ease-in-out 
          ${isOpen ? 'w-[250px]' : 'w-[90px]'} `} 
      >
        <ul className="h-full w-full flex flex-col">
          {isOpen ? 
              <li className="mb-2 justify-center flex flex-col whitespace-nowrap text-4xl items-center">
                  <StepsTitle />
              </li> : 
              <li className="justify-center flex flex-col whitespace-nowrap text-4xl items-center">
                  <SH />
              </li>
          }

          {NavbarData.map((val, key) => (
            <li key={key} className="p-7 px-0.5">
              <NavLink
                to={val.link}
                className={({ isActive }) =>
                  `no-underline text-inherit flex w-full ${isActive ? 'font-semibold' : ''}`
                }
              >
                {/* Icona */}
                <div
                  className={`flex-shrink-0 ${isOpen ? 'w-1/3' : 'w-full'} flex justify-center items-center transition-all duration-300 ease-in-out`}
                >
                  {val.icon}
                </div>
                
                {/* Titoli con transizione fluida */}
                <div
                  className={`flex font-semibold text-[22px] transition-all duration-400 ease-in-out
                    text-gray-800 hover:text-blue-600 
                    ${isOpen ? 'opacity-100' : 'opacity-0 translate-x-4'}
                    whitespace-nowrap`}
                >
                  {val.title}
                </div>
              </NavLink>
            </li>
          ))}

          {/* Bottone per aprire/chiudere sidebar */}
          <li className="justify-center items-center">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`flex justify-center items-center transition duration-500 ease-in-out px-0.5 p-7
                ${isOpen ? 'hover:scale-140 rotate-180 scale-130 ' : 'rotate-0 scale-100 hover:scale-90'}`}
            >
              <SidebarButton />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
