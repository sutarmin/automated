import { FC } from 'react';

export type Props = {
  snippetId: string;
  afterDelete?: () => void;
};

export type Component = FC<Props>;
