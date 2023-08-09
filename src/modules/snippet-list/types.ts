import { Snippet } from 'data/snippets/types';
import { FC } from 'react';

export type Props = {
  snippets: Snippet[];
  search: string;
};

export type Component = FC<Props>;
