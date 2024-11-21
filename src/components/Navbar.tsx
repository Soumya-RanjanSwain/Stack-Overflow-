import { Search, MessageSquare, Trophy, List, User } from 'lucide-react';
import StackOverflowLogo from "../assets/StackOverflowIcon";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <Link to={"/"}>
            <StackOverflowLogo className="w-24 h-6 md:w-32 md:h-8 lg:w-40 lg:h-10" />

            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-[800px] px-4">
          <div className="relative w-3/4 mx-auto">
            <input
              type="text"
              placeholder="Search Your Answers Here..."
              className="w-full pl-5 pr-10 py-2 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500 lg:placeholder-gray-400 placeholder-transparent"
            />
            <Search
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 stroke-orange-500"
            />
          </div>
        </div>

        <button className="text-sm text-[#636b74] hover:bg-[#e3e6e8] px-3 py-1.5 rounded-3xl">
          Products
        </button>

        <div className="lg:flex items-center gap-4 lg:pl-10 hidden">
          <button className="p-2 hover:bg-[#e3e6e8] rounded-md">
            <MessageSquare className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-[#e3e6e8] rounded-md">
            <Trophy className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-[#e3e6e8] rounded-md">
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
