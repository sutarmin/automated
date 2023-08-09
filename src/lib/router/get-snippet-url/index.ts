import { ROUTES } from '..';
import { SNIPPED_ID_QUERY_PARAM } from './consts';

/**
 * @param snippetId — GUID of a snippet. If undefined — navigates to "Create new snippet" screen
 */
export function getSnippetUrl(snippetId?: string) {
  return `${ROUTES.SNIPPET}?${SNIPPED_ID_QUERY_PARAM}=${snippetId}`;
}
