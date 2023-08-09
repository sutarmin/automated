import { memo } from 'react';
import { Badge, HStack, Highlight, Text, VStack } from '@chakra-ui/react';
import CodeEditor from 'modules/code-editor';

import { Component } from './types';
import SnippetActions from '../snippet-actions';

const SnippetPreview: Component = ({ snippet, search }) => {
  const { title, description, sourceCode, language } = snippet;

  const hasTitle = title !== '';

  return (
    <VStack
      gap={2}
      alignItems="stretch"
      border="1px"
      borderColor="gray.300"
      borderRadius={8}
      padding={4}
    >
      <HStack gap={2}>
        <Text
          noOfLines={1}
          title={title}
          flexGrow={1}
          fontWeight={600}
          color={hasTitle ? 'black' : 'gray.500'}
        >
          {title ? (
            <Highlight query={search} styles={{ bg: 'orange.100' }}>
              {title}
            </Highlight>
          ) : (
            'No title'
          )}
        </Text>
        <SnippetActions snippet={snippet} />
      </HStack>
      <Text noOfLines={2} h="48px" textOverflow="ellipsis" color="gray">
        <Highlight query={search} styles={{ bg: 'orange.100' }}>
          {description}
        </Highlight>
      </Text>
      <Badge colorScheme="green">{language}</Badge>
      <CodeEditor
        readOnly
        language={language}
        value={sourceCode}
        placeholder="Code snippet is empty"
      />
    </VStack>
  );
};

export default memo(SnippetPreview);
