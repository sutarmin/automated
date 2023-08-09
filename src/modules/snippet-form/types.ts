import { Snippet, SnippetParams } from 'data/snippets/types';
import { FC } from 'react';

export type Props = {
  snippet: Snippet | undefined;
  onSaveSnippet: (snippet: SnippetParams) => void;
};

export type Component = FC<Props>;
