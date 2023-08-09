import { Box } from '@chakra-ui/react';
import { PropsWithChildren, memo } from 'react';

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box minH="100vh" padding={8}>
      {children}
    </Box>
  );
};

export default memo(Layout);
