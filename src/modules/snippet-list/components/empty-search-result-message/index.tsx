import { memo } from 'react';
import { Center, VStack, Button, Text } from '@chakra-ui/react';
import { Component } from './types';

const EmptySearchResultMessage: Component = ({ onReset }) => {
  return (
    <Center>
      <VStack gap={6}>
        <Text fontSize={18} fontWeight={400}>
          No snippets found for this query
        </Text>
        <Button onClick={onReset}>Reset filter</Button>
      </VStack>
    </Center>
  );
};

export default memo(EmptySearchResultMessage);
