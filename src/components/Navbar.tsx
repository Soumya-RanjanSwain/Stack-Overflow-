import { Search, MessageSquare, Trophy, List, User } from 'lucide-react';
import logo from '../assets/StackOverflowFavicon.png';

const Navbar = () => {
  return (
    <nav className="bg-white  sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <img src={logo} alt="Stack Overflow" width="70px" />
            <div>stack<b>overflow</b></div>
          </div>
        </div>

        <div className="flex-1 max-w-[800px] px-4">
          <div className="relative w-3/4 mx-auto">
            <input
              type="text"
              placeholder="Search Your Answers Here..."
              className="w-full pl-5 pr-10 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Search
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 stroke-orange-500"
            />
          </div>
        </div>

        <button className="text-sm text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-md">
          Products
        </button>

        <div className="flex items-center gap-4 lg:pl-10">
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <MessageSquare className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Trophy className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <List className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <User className="h-8 w-8 p-1 rounded-full bg-gray-200" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
