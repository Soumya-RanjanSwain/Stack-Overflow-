import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface LeftSideBarItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  header?: boolean;
  path?: string;
}

interface LeftSideBarProps {
  items: LeftSideBarItem[];
}

const LeftSideBar = ({ items }: LeftSideBarProps) => {
  const location = useLocation();

  return (
    <aside className="sticky top-14 z-40 h-[calc(100vh-3.5rem)] w-[250px] border-r border-gray-200 bg-white hidden lg:block">
      {items.map((item, index) => (
        <div key={index} className="px-2">
          {item.header && (
            <div className="flex items-center px-4 py-2 text-xs font-bold text-gray-500">
              <item.icon className="h-4 w-4 mr-2 shrink-0" />
              <span className="truncate">{item.label}</span>
            </div>
          )}
          {!item.header && item.path && (
            <Link
              to={item.path}
              className={`flex items-center px-4 py-2 text-sm rounded-sm  ${
                location.pathname === item.path
                  ? 'bg-orange-100 text-orange-600 border-r-[6px] border-orange-500'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label === 'Home' ? (
                <item.icon className="h-4 w-4 mr-2 shrink-0" />
              ) : (
                <span className="w-6 h-4 inline-block"></span>
              )}
              <span className="truncate">{item.label}</span>
            </Link>
          )}
        </div>
      ))}
    </aside>
  );
};

export default LeftSideBar;
