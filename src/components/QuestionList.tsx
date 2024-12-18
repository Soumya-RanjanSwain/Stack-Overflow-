import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { questionsState, loadingState, errorState } from '../atoms/questionatom';
import QuestionItem, { Question } from './QuestionItem';
import SkeletonLoader from './SkeletonLoader';
import { getTimeDifference } from "../utils/findTheTimeDifference";

interface ApiResponseItem {
    tags: string[];
    owner: {
        display_name: string;
        link: string;
    };
    is_answered: boolean;
    view_count: number;
    answer_count: number;
    score: number;
    last_activity_date: number;
    creation_date: number;
    question_id: number;
    content_license: string;
    link: string;
    title: string;
    bounty_amount?: number;
}

const QuestionList = () => {
    const [activeButton, setActiveButton] = useState('Interesting');
    const [questionsCache, setQuestionsCache] = useRecoilState(questionsState);
    const [loading, setLoading] = useRecoilState(loadingState);
    const [error, setError] = useRecoilState(errorState);
    const [globalBackoff, setGlobalBackoff] = useState<number | null>(null); 
    const [countdown, setCountdown] = useState<number | null>(null);

    const buttons = ['Interesting', 'Bountied', 'Hot', 'Week', 'Month'];

    const apiEndpoints: { [key: string]: string } = {
        Interesting: 'https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&filter=!)rG855.3x2.wEj4klcBt&key=rl_GuTbjyeFa1DQXP9Nk47iAsrSJ',
        Bountied: 'https://api.stackexchange.com/2.3/questions/featured?order=desc&sort=activity&site=stackoverflow&pagesize=20&key=rl_GuTbjyeFa1DQXP9Nk47iAsrSJ',
        Hot: 'https://api.stackexchange.com/2.3/questions?order=desc&sort=hot&site=stackoverflow&key=rl_GuTbjyeFa1DQXP9Nk47iAsrSJ',
        Week: 'https://api.stackexchange.com/2.3/questions?order=desc&sort=week&site=stackoverflow&key=rl_GuTbjyeFa1DQXP9Nk47iAsrSJ',
        Month: 'https://api.stackexchange.com/2.3/questions?order=desc&sort=month&site=stackoverflow&key=rl_GuTbjyeFa1DQXP9Nk47iAsrSJ',
    };

    const fetchQuestions = () => {
        if (globalBackoff !== null) {
            return;
        }

        if (questionsCache[activeButton]) {
            return;
        }

        setLoading(true);
        setError(null);

        fetch(apiEndpoints[activeButton])
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                if (data.backoff) {
                    setGlobalBackoff(data.backoff);
                    setCountdown(data.backoff);
                    setTimeout(() => setGlobalBackoff(null), data.backoff * 1000);
                }

                const fetchedQuestions: Question[] = data.items.map((item: ApiResponseItem) => ({
                    title: item.title,
                    questionLink: item.link,
                    tags: item.tags,
                    votes: item.score,
                    answers: item.answer_count,
                    views: item.view_count,
                    askedBy: item.owner.display_name,
                    ownerLink: item.owner.link,
                    timeAgo: getTimeDifference(item.creation_date),
                    bounty_amount: item.bounty_amount,
                }));

                setQuestionsCache((prev) => ({
                    ...prev,
                    [activeButton]: fetchedQuestions,
                }));
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (!questionsCache[activeButton]) {
            fetchQuestions();
        }
    }, [activeButton]);

    useEffect(() => {
        if (globalBackoff === null && !questionsCache[activeButton]) {
            fetchQuestions();
        }
    }, [globalBackoff]);

    useEffect(() => {
        if (countdown === null) {
            return;
        }

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev === null || prev <= 1) {
                    clearInterval(interval);
                    return null;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [countdown]);

    // const questions = questionsCache[activeButton] || [];

    return (
        <div className="space-y-4 mt-4 mb-4">
            <div className="flex justify-between items-center">
                <h1 className="lg:text-2xl lg:font-medium font-normal ms-2 lg:ms-0">Top Questions</h1>
            </div>
            <div className="flex justify-between items-center mb-6 px-2 lg:min-w-[790px]">
                <div className="flex gap-1 lg:gap-2">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            className={`lg:px-5 lg:text-base text-sm px-1 py-1 rounded-3xl transition-all duration-300 ${activeButton === button
                                    ? 'bg-orange-500 text-white'
                                    : 'text-gray-500 hover:bg-orange-100 hover:text-orange-500'
                                }`}
                            onClick={() => setActiveButton(button)}
                        >
                            {button}
                        </button>
                    ))}
                </div>
                <button className="lg:px-10 px-3 lg:text-base text-sm py-1 bg-[#0A95FF] text-white rounded-3xl hover:bg-[#0074CC]">
                    Ask <span className='hidden lg:inline'> Question</span>
                </button>
            </div>

            <div className="space-y-4">
                {globalBackoff !== null && !questionsCache[activeButton] && (
                    <div className="flex flex-col items-center space-y-2">
                        <div className="text-6xl">⏳</div>
                        <p className="text-xl">
                            Please wait {countdown} second{countdown !== 1 && 's'}...
                        </p>
                    </div>
                )}
                {loading && globalBackoff === null &&
                    [...Array(5)].map((_, index) => <SkeletonLoader key={index} />)}
                {!loading && globalBackoff === null && error && (!questionsCache[activeButton] || questionsCache[activeButton].length === 0) && (
                    <p className="text-red-500">Error: {error}</p>
                )}
                {!loading && globalBackoff === null && (!questionsCache[activeButton] || questionsCache[activeButton].length === 0) && !error && (
                    <p>No questions available</p>
                )}
                {!loading && questionsCache[activeButton] && questionsCache[activeButton].length > 0 &&
                    questionsCache[activeButton].map((question, index) => (
                        <QuestionItem
                            key={index}
                            title={question.title}
                            tags={question.tags}
                            votes={question.votes}
                            answers={question.answers}
                            views={question.views}
                            askedBy={question.askedBy}
                            timeAgo={question.timeAgo}
                            ownerLink={question.ownerLink}
                            questionLink={question.questionLink}
                            bounty_amount={question.bounty_amount}
                        />
                    ))}
            </div>
        </div>
    );
};

export default QuestionList;
