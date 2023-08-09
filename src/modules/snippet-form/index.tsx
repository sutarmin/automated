import { memo, useCallback, useEffect, useMemo } from 'react';
import {
  VStack,
  HStack,
  Button,
  Input,
  Textarea,
  IconButton,
  Box,
} from '@chakra-ui/react';
import CodeEditor from 'modules/code-editor';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowBackIcon } from '@chakra-ui/icons';
import DeleteSnippetButton from 'modules/delete-snippet-button';
import { Component } from './types';
import { FormControlStyled, FormLabelStyled, InputStyled } from './styles';

const SnippetForm: Component = ({ snippet, onSaveSnippet }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, watch, formState } = useForm({
    defaultValues: {
      id: snippet?.id,
      language: snippet?.language || 'typescript',
      title: snippet?.title || '',
      description: snippet?.description || '',
      sourceCode:
        snippet?.sourceCode || `function add(a, b) {\n  return a + b;\n}`,
    },
  });

  const codeLanguage = watch('language');
  const sourceCodeValue = watch('sourceCode');
  useEffect(() => {
    // Sync form data with updated snipped
    reset(snippet);
  }, [reset, snippet]);

  const onSaveButtonClick = useMemo(
    () => handleSubmit(onSaveSnippet),
    [handleSubmit, onSaveSnippet]
  );

  const onDeleted = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <VStack padding="16px" gap={8}>
      <HStack alignSelf="stretch">
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Return to list of snippets"
          as={Link}
          to="/"
        />
        <InputStyled placeholder="Add snippet title" {...register('title')} />
        {snippet?.id && (
          <DeleteSnippetButton snippetId={snippet.id} afterDelete={onDeleted} />
        )}
      </HStack>
      <FormControlStyled>
        <FormLabelStyled>Description</FormLabelStyled>
        <Textarea
          placeholder="Add snippet description"
          {...register('description')}
        />
      </FormControlStyled>
      <FormControlStyled>
        <FormLabelStyled>Language</FormLabelStyled>
        <Input
          width={300}
          placeholder="Snippet language"
          {...register('language')}
        />
      </FormControlStyled>

      <FormControlStyled>
        <FormLabelStyled>Snippet</FormLabelStyled>
        <CodeEditor
          language={codeLanguage}
          value={sourceCodeValue}
          {...register('sourceCode')}
        />
      </FormControlStyled>
      <Box width="100%" pl={112}>
        <Button
          onClick={onSaveButtonClick}
          isDisabled={!formState.isDirty}
          colorScheme="blue"
        >
          {snippet === undefined && 'Create snippet'}
          {snippet !== undefined && 'Save snippet'}
        </Button>
      </Box>
    </VStack>
  );
};

export default memo(SnippetForm);
