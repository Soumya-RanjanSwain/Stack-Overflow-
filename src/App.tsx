import LeftSideBar from "./components/LeftSideBar";
import Navbar from "./components/Navbar";
import { Home, Search, MessageSquare, Award, Briefcase, Users, Plus, Globe } from 'lucide-react';
import RightSidebar from "./components/RightSideBar";
import QuestionList from './components/QuestionList';
import SearchList from './components/SearchList';
import { useState } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const LeftSideBarItems = [
    { icon: Home, label: 'Home', active: true, path: '/' },
    { icon: Globe, label: 'PUBLIC', header: true },
    { icon: Search, label: 'Questions', path: '/questions' },
    { icon: MessageSquare, label: 'Tags', path: '/tags' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Award, label: 'COLLECTIVES', header: true },
    { icon: Search, label: 'Explore Jobs', path: '/jobs/explore' },
    { icon: Briefcase, label: 'FIND JOBS', header: true },
    { icon: Search, label: 'Jobs', path: '/jobs' },
    { icon: Briefcase, label: 'Companies', path: '/companies' },
    { icon: Users, label: 'TEAMS', header: true },
    { icon: Plus, label: '+ Create a team', path: '/teams/create' },
  ];

  return (
    <div >
      <Navbar setSearchQuery={setSearchQuery} />
      <div className="flex justify-between">
        <LeftSideBar items={LeftSideBarItems} />
        {/* <div className='text-blue-950'>hi there</div> */}
        {searchQuery ? <SearchList searchQuery={searchQuery} /> : <QuestionList />}
        <RightSidebar />
      </div>
    </div>

  );
}
