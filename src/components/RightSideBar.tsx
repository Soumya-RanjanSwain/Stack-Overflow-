import { Pencil } from 'lucide-react';
import Logo from "../assets/stack-overflow.png";

const RightSidebar = () => {
    const blogPosts = [
        {
            title: 'The unexpected benefits of mentoring others',
            icon: Pencil
        },
        {
            title: "Podcast 354: Building for AR with Niantic Labs' augmented reality SDK",
            icon: Pencil
        }
    ];

    const metaPosts = [
        {
            title: 'Tags (driver) and (device-driver) appear to be redundant',
            votes: 8
        },
        {
            title: 'How to handle dupes where A is closed as dup of B but I have an answer that..',
            votes: 27
        },
        {
            title: 'Ambiguous tag [containers]',
            votes: 27
        }
    ];

    return (
        <aside className="w-[350px] p-3 hidden lg:block">
            <div className='bg-[#fdfcfb] p-5'>
                <h3 className="text-lg font-medium pb-4 ">The Overflow Blog</h3>
                <ul className="space-y-3">
                    {blogPosts.map((post, index) => (
                        <li key={index} className="flex gap-2">
                            <post.icon className="h-4 w-4 text-gray-600 flex-shrink-0 mt-1" />
                            <a href="#" className="text-[12px] text-gray-600 hover:text-[#0A95FF]">
                                {post.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='bg-[#c4c0c01a] p-5'>
                <h3 className="text-lg font-medium pb-4">Featured & meta</h3>
                <ul className="space-y-3">
                    <div className="flex gap-2">
                        <img src={Logo} className="h-4" />
                        <a href="#" className="text-[12px] text-gray-600 hover:text-[#0A95FF]">
                            Beta release of Collective™ on Stack Overflow
                        </a>
                    </div>
                </ul>
            </div>

            <div className='bg-[#7e7d7d1a] p-5'>
                <h3 className="text-lg font-medium mb-4">Hot meta post</h3>
                <ul className="space-y-3">
                    {metaPosts.map((post, index) => (
                        <li key={index} className="flex gap-2">
                            <span className="text-sm font-bold text-gray-500">{post.votes}</span>
                            <a href="#" className="text-[12px] text-gray-600 hover:text-[#0A95FF]">
                                {post.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-medium mb-4 pl-4 mt-3">Custom filter</h3>
                <input type="text" placeholder='add custom filters' className='px-4 py-3 w-full border rounded-md placeholder-[#0074CC] border-gray-300 focus:outline-none focus:border-blue-500' />
                {/* <button className="w-full px-4 py-2 text-sm text-[#0074CC] border border-[#0074CC] rounded-md hover:bg-[#F0F8FF]">
                    Add custom filters
                </button> */}
            </div>
        </aside>
    );
}

export default RightSidebar;