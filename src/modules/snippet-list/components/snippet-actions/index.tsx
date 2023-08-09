import { memo } from 'react';
import { CheckIcon, CopyIcon, EditIcon } from '@chakra-ui/icons';
import { Tooltip, IconButton, useClipboard } from '@chakra-ui/react';
import { getSnippetUrl } from 'lib/router/get-snippet-url';
import DeleteSnippetButton from 'modules/delete-snippet-button';
import { Link } from 'react-router-dom';
import { Component } from './types';

const SnippetActions: Component = ({ snippet }) => {
  const { id, title, sourceCode } = snippet;

  const { onCopy, hasCopied } = useClipboard(sourceCode, { timeout: 800 });

  return (
    <>
      <Tooltip label={hasCopied ? 'Copied' : 'Copy snippet'}>
        <IconButton
          icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
          isDisabled={hasCopied}
          aria-label="Copy snippet"
          flexShrink={0}
          colorScheme="blue"
          onClick={onCopy}
        />
      </Tooltip>
      <Tooltip label="Update snippet">
        <IconButton
          icon={<EditIcon />}
          title="Update snippet"
          aria-label={`Update snippet ${title}`}
          flexShrink={0}
          as={Link}
          to={getSnippetUrl(id)}
        />
      </Tooltip>
      <DeleteSnippetButton snippetId={id} />
    </>
  );
};

export default memo(SnippetActions);
