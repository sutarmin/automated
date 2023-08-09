import { forwardRef, memo } from 'react';
import UiwCodeEditor, {
  TextareaCodeEditorProps,
} from '@uiw/react-textarea-code-editor';

const CodeEditor = forwardRef<HTMLTextAreaElement, TextareaCodeEditorProps>(
  (props, ref) => {
    return (
      <UiwCodeEditor
        ref={ref}
        minHeight={300}
        data-color-mode="dark"
        placeholder="Enter your code snippet"
        padding={16}
        style={{
          maxHeight: 300,
          width: '100%',
          overflow: 'auto',
          fontSize: 16,
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
        {...props}
      />
    );
  }
);

export default memo(CodeEditor);
