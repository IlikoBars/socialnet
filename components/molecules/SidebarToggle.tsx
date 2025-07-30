import React from 'react';

interface SidebarToggleProps {
  open: boolean;
  onClick: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ open, onClick }) => (
  <button
    className="fixed top-4 left-4 z-50 w-12 h-12 flex flex-col justify-center items-center bg-sky rounded-full shadow-soft hover:shadow-glow transition-all"
    onClick={onClick}
    aria-label="Открыть меню"
  >
    <span className={`block w-7 h-1 bg-graphite rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
    <span className={`block w-7 h-1 bg-graphite rounded transition-all duration-300 my-1 ${open ? 'opacity-0' : ''}`}></span>
    <span className={`block w-7 h-1 bg-graphite rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
  </button>
);

export default SidebarToggle; 