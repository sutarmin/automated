import { memo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SNIPPED_ID_QUERY_PARAM } from 'lib/router/get-snippet-url/consts';
import { useSnippet } from 'data/snippets/context';
import { getSnippetUrl } from 'lib/router/get-snippet-url';
import { SnippetParams } from 'data/snippets/types';
import SnippetForm from 'modules/snippet-form';
import { Component } from './types';

const Snippet: Component = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sinppedId = searchParams.get(SNIPPED_ID_QUERY_PARAM) || undefined;
  const { snippet, createSnippet, updateSnippet } = useSnippet(sinppedId);

  const onSaveSnippet = useCallback(
    async ({ title, description, language, sourceCode }: SnippetParams) => {
      if (snippet?.id === undefined) {
        const createdSnippet = await createSnippet({
          title,
          description,
          language,
          sourceCode,
        });
        navigate(getSnippetUrl(createdSnippet.id));
        return createdSnippet;
      }
      return updateSnippet({
        id: snippet.id,
        title,
        description,
        language,
        sourceCode,
      });
    },
    [createSnippet, navigate, snippet?.id, updateSnippet]
  );

  return <SnippetForm snippet={snippet} onSaveSnippet={onSaveSnippet} />;
};

export default memo(Snippet);
