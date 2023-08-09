import { Snippet } from 'data/snippets/types';

export const containsSearchValue = (search: string) => (snippet: Snippet) => {
  const normalizedSearch = search.toLocaleLowerCase();
  const normalizedTitle = snippet.title.toLocaleLowerCase();
  const normalizedDescription = snippet.description.toLocaleLowerCase();
  const normalizedLanguage = snippet.language.toLocaleLowerCase();
  return (
    normalizedTitle.includes(normalizedSearch) ||
    normalizedDescription.includes(normalizedSearch) ||
    normalizedLanguage.includes(normalizedSearch)
  );
};
