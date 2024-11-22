import { atom } from 'recoil';
import { Question } from '../components/QuestionItem';

export const questionsState = atom<Record<string, Question[]>>({
    key: 'questionsState',
    default: {},
});

export const loadingState = atom<boolean>({
    key: 'loadingState',
    default: false,
});

export const errorState = atom<string | null>({
    key: 'errorState',
    default: null,
});

export const searchQueryState = atom<string>({
  key: 'searchQueryState',
  default: '',
});
