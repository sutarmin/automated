import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const InputStyled = styled(Input)`
  border-color: transparent;
  font-size: 28px;
  font-weight: 500;
`;

export const FormControlStyled = styled(FormControl)`
  display: flex;
  align-items: baseline;
`;

export const FormLabelStyled = styled(FormLabel)`
  width: 100px;
  flex-shrink: 0;
`;
