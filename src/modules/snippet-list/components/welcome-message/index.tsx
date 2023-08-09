import { memo } from 'react';
import { Center, VStack, Button, Text } from '@chakra-ui/react';
import { getSnippetUrl } from 'lib/router/get-snippet-url';
import { Link } from 'react-router-dom';
import { Component } from './types';

const WelcomeMessage: Component = () => {
  return (
    <Center>
      <VStack gap={6}>
        <Text fontSize={24} fontWeight={500}>
          Welcome to the Code snippet manager
        </Text>
        <Text fontSize={18} fontWeight={400}>
          This app allows you to easily create and manage often-used pieces of
          code
        </Text>
        <Button
          flexShrink={0}
          colorScheme="blue"
          as={Link}
          to={getSnippetUrl(undefined)}
        >
          Add my first sinppet
        </Button>
      </VStack>
    </Center>
  );
};

export default memo(WelcomeMessage);
