export interface Snippet {
  id: string;
  title: string;
  description: string;
  sourceCode: string;
  language: string;
}

export type SnippetParams = Omit<Snippet, 'id'>;
