import { useBoolean } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { Snippet } from '../types';
import { SNIPPETS_LS_KEY } from './consts';

/**
 * Making these functions async for demonstrative purposes
 */
async function loadSnippets(): Promise<Snippet[]> {
  try {
    const jsonSnippets = localStorage.getItem(SNIPPETS_LS_KEY);
    if (!jsonSnippets) {
      return [];
    }
    /**
     * To be 100% safe in runtime, all the "outside" data (storage/network/user inputs etc)
     * has to be runtime validated to make sure it has the expected shape.
     * I have experience working with io-ts/zod for runtime validation.
     * Such solutions perfectly complement static typing, making the runtime less prone to exceptions.
     * But the downside is, they make code flows more complicated, so should be applied selectively.
     */
    return JSON.parse(jsonSnippets);
  } catch (e) {
    /**
     * JSON.parse might throw an error, which would mean
     * that LS state is broken and has to be reset
     */
    localStorage.removeItem(SNIPPETS_LS_KEY);
    return [];
  }
}

async function persistSnippets(snippets: Snippet[]): Promise<void> {
  try {
    const jsonSnippets = JSON.stringify(snippets);
    localStorage.setItem(SNIPPETS_LS_KEY, jsonSnippets);
  } catch (e) {
    // possible reasons to be handled:
    // local storage is unsavailable ()
    // item size is exceeded: amount of snippets is to big, we should split into severa items or use different storage
  }
}

export function useSnippetsStorage() {
  const [isLoading, setIsLoading] = useBoolean(true);
  const [snippets, setSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    // Load snippets from LS on mount
    loadSnippets()
      .then((lsSnippets) => {
        setSnippets(lsSnippets);
        setIsLoading.off();
      })
      .catch(() => {
        /**
         * using promises in useEffect has drawbacks:
         * if there's a chance that component could be unmounted before promise resolves,
         * that should be handled properly not to end up setting state of unmounted comonent
         */
      });
    setIsLoading.off();
  }, [setIsLoading]);

  useEffect(() => {
    persistSnippets(snippets);
  }, [snippets]);

  const syncSnippets = useCallback(
    (updater: (snippets: Snippet[]) => Snippet[]) => {
      const updatedSnippets = updater(snippets);
      setSnippets(updatedSnippets);
      return persistSnippets(updatedSnippets);
    },
    [snippets]
  );

  return {
    isLoading,
    snippets,
    syncSnippets,
  };
}
