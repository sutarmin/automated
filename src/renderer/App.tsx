import SnippetList from 'screens/snippet-list';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Snippet from 'screens/snippet';
import SnippetDataProvider from 'data/snippets/context';
import Layout from 'screens/_layout';

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: 'dark',
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <SnippetDataProvider>
        <Layout>
          <Router>
            <Routes>
              <Route path="/snippet-list" Component={SnippetList} />
              <Route path="/snippet" Component={Snippet} />
              <Route path="/" element={<Navigate to="/snippet-list" />} />
            </Routes>
          </Router>
        </Layout>
      </SnippetDataProvider>
    </ChakraProvider>
  );
}
