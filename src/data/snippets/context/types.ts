import { FC, PropsWithChildren } from 'react';
import { SnippetParams, Snippet } from '../types';

/*
  At the moment CRUD methods don't have to be async, operations themselves are syncronous.
  But since it's very easy to imagine how they might become async very soon (http/db operations), 
  for demonstrative purposes I decided to implement async data flow. 
*/
export interface SnippetDataContextType {
  snippets: Snippet[];
  createSnippet(snippet: SnippetParams): Promise<Snippet>;
  updateSnippet(snippet: Snippet): Promise<Snippet>;
  deleteSnippet(snippetId: string): Promise<string>;
}

export type Component = FC<PropsWithChildren<{}>>;
