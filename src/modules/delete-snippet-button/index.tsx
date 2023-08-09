import { memo, useCallback } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Tooltip, IconButton, useDisclosure } from '@chakra-ui/react';
import ConfirmationAlert from 'modules/confirmation-alert';
import { useSnippet } from 'data/snippets/context';
import { Component } from './types';

const DeleteSnippetButton: Component = ({ snippetId, afterDelete }) => {
  const { isOpen, onOpen: OnDeleteModalOpen, onClose } = useDisclosure();

  const { snippet, deleteSnippet } = useSnippet(snippetId);
  const onConfirmDelete = useCallback(async () => {
    await deleteSnippet(snippetId);
    afterDelete?.();
  }, [deleteSnippet, snippetId, afterDelete]);

  return (
    <>
      <ConfirmationAlert
        isOpen={isOpen}
        onCancel={onClose}
        onConfirm={onConfirmDelete}
      />

      <Tooltip label="Delete snippet">
        <IconButton
          icon={<DeleteIcon />}
          title="Delete snippet"
          aria-label={`Delete snippet ${snippet?.title}`}
          flexShrink={0}
          onClick={OnDeleteModalOpen}
        />
      </Tooltip>
    </>
  );
};

export default memo(DeleteSnippetButton);
