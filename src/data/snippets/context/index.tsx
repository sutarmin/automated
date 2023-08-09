import { createContext, memo, useCallback, useContext, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Center, Spinner } from '@chakra-ui/react';
import { Component, SnippetDataContextType } from './types';
import { SnippetParams, Snippet } from '../types';
import { noopThrow } from './utils';
import { useSnippetsStorage } from './use-snippets-storage';

const SnippetDataContext = createContext<SnippetDataContextType>({
  snippets: [],
  createSnippet: noopThrow,
  updateSnippet: noopThrow,
  deleteSnippet: noopThrow,
});

/**
 * For this assignment I decided not to use any state manegement libraries to keep things simple.
 * During my career I have being developing applications with redux, rxjs, frp-ts and some other solutions.
 */
const SnippetDataProvider: Component = ({ children }) => {
  const { isLoading, snippets, syncSnippets } = useSnippetsStorage();

  const createSnippet = useCallback(
    async (newSnippet: SnippetParams) => {
      const snippet: Snippet = {
        ...newSnippet,
        id: uuid(),
      };

      await syncSnippets((prevSnippets) => prevSnippets.concat(snippet));
      return snippet;
    },
    [syncSnippets]
  );

  const updateSnippet = useCallback(
    async (updatedSnippet: Snippet) => {
      await syncSnippets((prevSnippets) =>
        prevSnippets.map((snippet) => {
          if (snippet.id === updatedSnippet.id) {
            return updatedSnippet;
          }
          return snippet;
        })
      );
      return updatedSnippet;
    },
    [syncSnippets]
  );

  const deleteSnippet = useCallback(
    async (snippetId: string) => {
      await syncSnippets((prevSnippets) =>
        prevSnippets.filter((snippet) => snippet.id !== snippetId)
      );
      return snippetId;
    },
    [syncSnippets]
  );

  const contextValue: SnippetDataContextType = useMemo(() => {
    return {
      snippets,
      createSnippet,
      updateSnippet,
      deleteSnippet,
    };
  }, [snippets, createSnippet, updateSnippet, deleteSnippet]);

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner
          size="lg"
          color="blue.500"
          emptyColor="gray.200"
          speed="0.65s"
        />
      </Center>
    );
  }
  return (
    <SnippetDataContext.Provider value={contextValue} children={children} />
  );
};

export default memo(SnippetDataProvider);

export function useSnippetsData() {
  return useContext(SnippetDataContext);
}

export function useSnippet(snippetId: string | undefined) {
  const { snippets, createSnippet, updateSnippet, deleteSnippet } =
    useSnippetsData();

  return {
    snippet: snippets.find((snippet) => snippet.id === snippetId),
    createSnippet,
    updateSnippet,
    deleteSnippet,
  };
}
