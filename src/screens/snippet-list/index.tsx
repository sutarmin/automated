import {
  ChangeEventHandler,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { getSnippetUrl } from 'lib/router/get-snippet-url';
import { useSnippetsData } from 'data/snippets/context';
import SnippetList from 'modules/snippet-list';
import { SearchIcon } from '@chakra-ui/icons';
import WelcomeMessage from 'modules/snippet-list/components/welcome-message';
import EmptySearchResultMessage from 'modules/snippet-list/components/empty-search-result-message';
import { Component } from './types';
import { containsSearchValue } from './utils';

const SnippetListScreen: Component = () => {
  const { snippets } = useSnippetsData();
  const [searchValue, setSearchValue] = useState('');

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setSearchValue(event.target.value);
    },
    []
  );

  const onSearchReset = useCallback(() => setSearchValue(''), []);

  const filteredSnippets = useMemo(
    () => snippets.filter(containsSearchValue(searchValue)),
    [snippets, searchValue]
  );

  if (snippets.length === 0) {
    return <WelcomeMessage />;
  }

  return (
    <VStack alignItems="stretch" gap={8} maxH="100vh">
      <HStack>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search..."
            variant="filled"
            flexGrow={1}
          />
        </InputGroup>

        <Button
          flexShrink={0}
          colorScheme="blue"
          as={ReactRouterLink}
          to={getSnippetUrl(undefined)}
        >
          Add snippet
        </Button>
      </HStack>
      {filteredSnippets.length === 0 && (
        <EmptySearchResultMessage onReset={onSearchReset} />
      )}
      <SnippetList snippets={filteredSnippets} search={searchValue} />
    </VStack>
  );
};

export default memo(SnippetListScreen);
