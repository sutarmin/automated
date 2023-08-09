import { Snippet } from 'data/snippets/types';
import { FC } from 'react';

export type Props = {
  snippet: Snippet;
};

export type Component = FC<Props>;
