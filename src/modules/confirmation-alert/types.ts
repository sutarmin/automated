import { FC } from 'react';

export type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export type Component = FC<Props>;
