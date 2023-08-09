import { Snippet } from 'data/snippets/types';
import { FC } from 'react';

export type Props = {
  snippet: Snippet;
  search: string;
};

export type Component = FC<Props>;
