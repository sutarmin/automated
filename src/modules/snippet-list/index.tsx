import { memo } from 'react';
import { Grid } from '@chakra-ui/react';
import { Component } from './types';
import SnippetPreview from './components/snippet-preview';

const SnippetList: Component = ({ snippets, search }) => {
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      gap={6}
      overflow="auto"
    >
      {snippets.map((snippet) => (
        <SnippetPreview key={snippet.id} snippet={snippet} search={search} />
      ))}
    </Grid>
  );
};

export default memo(SnippetList);
