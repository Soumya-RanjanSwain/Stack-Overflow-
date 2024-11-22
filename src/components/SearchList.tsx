import { useState, useEffect } from 'react';
import { getTimeDifference } from "../utils/findTheTimeDifference";
import QuestionItem from './QuestionItem';
import SkeletonLoader from './SkeletonLoader';

interface SearchApiResponseItem {
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

const SearchList = ({ searchQuery }: { searchQuery: string }) => {
  const [searchResults, setSearchResults] = useState<SearchApiResponseItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    const fetchSearchResults = async () => {
      try {
        const encodedQuery = encodeURIComponent(searchQuery);
        const response = await fetch(
          `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&title=${encodedQuery}&site=stackoverflow&filter=!*IU7fuJ7J29ZxWZpq78W.3bUy-jaiUNkP)wmsBW.CRn.90(9GjvQsg-O7eZxBd&key=rl_GuTbjyeFa1DQXP9Nk47iAsrSJ`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSearchResults(data.items);
      } catch (err) {
        setError('Failed to fetch search results: ' + err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="space-y-4 mt-4 mb-4">
      <h1 className="lg:text-2xl lg:font-medium font-normal ms-2 lg:ms-0">
        Search Results for "{searchQuery}"
      </h1>
      <div className="space-y-4">
        {loading && [...Array(5)].map((_, index) => <SkeletonLoader key={index} />)}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && searchResults.length === 0 && (
          <div>No results found</div>
        )}
        {!loading &&
          !error &&
          searchResults.map((result, index) => (
            <QuestionItem
              key={index}
              title={result.title}
              tags={result.tags}
              votes={result.score}
              answers={result.answer_count}
              views={result.view_count}
              askedBy={result.owner.display_name}
              timeAgo={getTimeDifference(result.creation_date)}
              ownerLink={result.owner.link}
              questionLink={result.link}
              bounty_amount={result.bounty_amount}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchList;
