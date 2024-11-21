import { MessageSquare, Eye, Triangle, Star } from 'lucide-react';

export interface Question {
    title: string;
    tags: string[];
    votes: number;
    answers: number;
    views: number;
    askedBy: string;
    timeAgo: string;
    ownerLink: string;
    questionLink: string;
    bounty_amount?: number;
}

const QuestionItem = ({ title, tags, votes, answers, views, askedBy, timeAgo, ownerLink, questionLink, bounty_amount }: Question) => {
    return (
        <div className="flex gap-6 p-4 border border-gray-200">
            <div className="flex-1">
                <h2 className="text-lg mb-2 text-[#5a5a5a] hover:text-black font-semibold max-w-[750px]">
                    <a href={questionLink} target='_blank'>{title}</a>
                </h2>
                <div className="flex flex-wrap gap-2 mb-2 max-w-[750px]">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-4 py-1 border text-[#575757] text-xs rounded-3xl  hover:bg-orange-100 hover:text-orange-400"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className='flex justify-between items-center'>
                    <div className="flex flex-row items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Triangle className="h-4 w-4 stroke-orange-400" />
                            <span>{votes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{answers}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{views}</span>
                        </div>
                        {bounty_amount && (
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 stroke-yellow-400" />
                                <span className="text-yellow-500 font-medium">{bounty_amount + ' points'}</span>
                            </div>
                        )}
                    </div>
                    <div className="text-sm text-gray-600">
                        asked {timeAgo} by{' '}
                        <a href={ownerLink} target='_blank' className="text-[#0074CC] hover:text-[#0A95FF]">
                            {askedBy}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionItem;
