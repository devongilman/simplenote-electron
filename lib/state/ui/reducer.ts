import { combineReducers } from 'redux';

import { tagHashOf } from '../../utils/tag-hash';

import type * as A from '../action-types';
import type * as T from '../../types';

const emptyList: unknown[] = [];

const dialogs: A.Reducer<T.DialogType[]> = (state = [], action) => {
  switch (action.type) {
    case 'CLOSE_DIALOG':
      return state.slice(0, -1);

    case 'SHOW_DIALOG':
      return state.includes(action.dialog) ? state : [...state, action.dialog];

    default:
      return state;
  }
};

const editMode: A.Reducer<boolean> = (state = true, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_MODE': {
      return !state;
    }
    case 'CREATE_NOTE':
      return true;
    default:
      return state;
  }
};

const editingTags: A.Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case 'TAG_EDITING_TOGGLE':
      return !state;
    case 'OPEN_NOTE':
    case 'SELECT_NOTE':
    case 'OPEN_TAG':
    case 'SELECT_TRASH':
    case 'SHOW_ALL_NOTES':
    case 'NAVIGATION_TOGGLE':
      return false;
    default:
      return state;
  }
};

const filteredNotes: A.Reducer<T.EntityId[]> = (
  state = emptyList as T.EntityId[],
  action
) => {
  if ('undefined' === typeof action.meta?.searchResults) {
    return state;
  }

  return action.meta.searchResults.noteIds;
};

const hasLoadedNotes: A.Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case 'FILTER_NOTES':
      return action.noteIds.length > 0 ? true : state;

    default:
      return state;
  }
};

const openedNote: A.Reducer<T.EntityId | null> = (state = null, action) => {
  switch (action.type) {
    case 'CLOSE_NOTE':
      return null;

    case 'CONFIRM_NEW_NOTE':
      return state === action.originalNoteId ? action.newNoteId : state;

    case 'OPEN_NOTE':
      return action?.noteId ?? state;

    case 'SELECT_NOTE':
      return action.noteId;

    default:
      return 'undefined' !== typeof action.meta?.nextNoteToOpen
        ? action.meta.nextNoteToOpen
        : state;
  }
};

const openedRevision: A.Reducer<[T.EntityId, number] | null> = (
  state = null,
  action
) => {
  switch (action.type) {
    case 'CLOSE_REVISION':
    case 'RESTORE_NOTE_REVISION':
      return null;

    case 'OPEN_REVISION':
      return [action.noteId, action.version];

    default:
      return state;
  }
};

const openedTag: A.Reducer<T.TagHash | null> = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_TRASH':
    case 'SHOW_ALL_NOTES':
      return null;
    case 'OPEN_TAG':
      return tagHashOf(action.tagName);
    case 'TRASH_TAG':
      return tagHashOf(action.tagName) === state ? null : state;
    default:
      return state;
  }
};

const showNoteList: A.Reducer<boolean> = (state = true, action) => {
  switch (action.type) {
    case 'NOTE_LIST_TOGGLE':
      return !state;

    case 'OPEN_NOTE':
      return false;

    default:
      return state;
  }
};

const unsyncedNoteIds: A.Reducer<T.EntityId[]> = (
  state = emptyList as T.EntityId[],
  action
) => ('SET_UNSYNCED_NOTE_IDS' === action.type ? action.noteIds : state);

const searchQuery: A.Reducer<string> = (state = '', action) => {
  switch (action.type) {
    case 'CREATE_NOTE':
      return '';
    case 'SEARCH':
      return action.searchQuery;
    default:
      return state;
  }
};

const simperiumConnected: A.Reducer<boolean> = (state = false, action) =>
  'SIMPERIUM_CONNECTION_STATUS_TOGGLE' === action.type
    ? action.simperiumConnected
    : state;

const showNoteInfo: A.Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case 'NOTE_INFO_TOGGLE':
      return !state;

    case 'NAVIGATION_TOGGLE':
      return false;

    default:
      return state;
  }
};

const showNavigation: A.Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case 'NAVIGATION_TOGGLE':
      return !state;

    case 'OPEN_TAG':
    case 'SELECT_TRASH':
    case 'SHOW_ALL_NOTES':
      return false;
    case 'SHOW_DIALOG':
      if (action.dialog === 'SETTINGS') {
        return false;
      }
      return state;
    default:
      return state;
  }
};

const showRevisions: A.Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case 'REVISIONS_TOGGLE':
      return !state;
    case 'CLOSE_REVISION':
    case 'OPEN_NOTE':
    case 'SELECT_NOTE':
    case 'CREATE_NOTE':
    case 'RESTORE_NOTE_REVISION':
      return false;
    default:
      return state;
  }
};

const showTrash: A.Reducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case 'SELECT_TRASH':
      return true;
    case 'CREATE_NOTE':
    case 'OPEN_TAG':
    case 'SHOW_ALL_NOTES': {
      return false;
    }
    default:
      return state;
  }
};

const tagSuggestions: A.Reducer<T.TagHash[]> = (
  state = emptyList as T.TagHash[],
  action
) => {
  if ('undefined' === typeof action.meta?.searchResults) {
    return state;
  }

  return action.meta.searchResults.tagHashes;
};

export default combineReducers({
  dialogs,
  editMode,
  editingTags,
  filteredNotes,
  hasLoadedNotes,
  openedNote,
  openedRevision,
  openedTag,
  searchQuery,
  showNavigation,
  showNoteInfo,
  showNoteList,
  showRevisions,
  showTrash,
  simperiumConnected,
  tagSuggestions,
  unsyncedNoteIds,
});
