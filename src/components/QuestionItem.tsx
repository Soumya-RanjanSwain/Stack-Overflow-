import { useState } from "react";
import { MessageSquare, Eye, Triangle, Star } from "lucide-react";
import { decoder } from "../utils/htmlEntityDecoder";

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

const QuestionItem = ({ title, tags, votes, answers, views, askedBy, timeAgo, ownerLink, questionLink, bounty_amount, }: Question) => {
    const [isVoteClicked, setIsVoteClicked] = useState(true);
    const [isAnswerClicked, setIsAnswerClicked] = useState(false);
    const [isViewClicked, setIsViewClicked] = useState(false);

    return (
        <div className="flex gap-6 p-4 border border-gray-200 mx-2 shadow-md hover:shadow-xl hover:scale-[1.01] transition">
            <div className="flex-1">
                <h2 className=" text-base lg:text-lg mb-2 text-[#5a5a5a] hover:text-black font-semibold max-w-[750px] text-justify">
                    <a href={questionLink} target="_blank" rel="noopener noreferrer">
                        {decoder(title)}
                    </a>
                </h2>

                <div className="flex flex-wrap gap-2 mb-2 max-w-[750px]">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-4 py-1 border text-[#575757] text-xs rounded-3xl  hover:bg-orange-100 hover:text-orange-500 hover:cursor-pointer"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-row items-center gap-4 text-sm text-gray-600 ms-2">
                        <div
                            className="flex items-center gap-1"
                            onClick={() => setIsVoteClicked(!isVoteClicked)}
                        >
                            <Triangle
                                className={`h-4 w-4 ${isVoteClicked ? "stroke-orange-400 " : ""
                                    } hover:cursor-pointer`}
                            />
                            <span>{votes}</span>
                        </div>
                        <div
                            className="flex items-center gap-1"
                            onClick={() => setIsAnswerClicked(!isAnswerClicked)}
                        >
                            <MessageSquare
                                className={`h-4 w-4 ${isAnswerClicked ? "stroke-orange-400" : ""
                                    } hover:cursor-pointer`}
                            />
                            <span>{answers}</span>
                        </div>
                        <div
                            className="flex items-center gap-1"
                            onClick={() => setIsViewClicked(!isViewClicked)}
                        >
                            <Eye
                                className={`h-4 w-4 ${isViewClicked ? "stroke-orange-400 " : ""
                                    } hover:cursor-pointer`}
                            />
                            <span>{views}</span>
                        </div>
                        {bounty_amount && (
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 stroke-yellow-400 hover:cursor-pointer" />
                                <span className="text-yellow-500 font-medium">
                                    {bounty_amount + " points"}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="text-sm text-gray-600 hidden lg:block">
                        asked {timeAgo} by{" "}
                        <a
                            href={ownerLink}
                            target="_blank"
                            className="text-[#0074CC] hover:text-[#0A95FF]"
                            rel="noopener noreferrer"
                        >
                            {decoder(askedBy)}
                        </a>
                    </div>
                </div>
                <div className="text-sm text-gray-600 lg:hidden block mt-2 ms-2">
                    asked {timeAgo} by{" "}
                    <a
                        href={ownerLink}
                        target="_blank"
                        className="text-[#0074CC] hover:text-[#0A95FF]"
                        rel="noopener noreferrer"
                    >
                        {decoder(askedBy)}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default QuestionItem;
