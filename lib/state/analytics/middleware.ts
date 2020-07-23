import analytics from '../../analytics';

import * as A from '../action-types';
import * as S from '../';

export const middleware: S.Middleware = (store) => {
  return (next) => (action: A.ActionType) => {
    const result = next(action);

    /* catch-all meta used by redux components for these events:
         - importer_import_completed
    */
    if (action.meta?.analytics?.length) {
      action.meta.analytics.forEach(([eventName, eventProperties]) =>
        analytics.tracks.recordEvent(eventName, eventProperties)
      );
    }

    // @todo old events that have not been reimplemented in the rewrite:
    // - application_opened

    // @todo events that don't have a corresponding action and aren't in redux
    // - user_account_created in boot-without-auth.tsx
    // - user_signed_in in boot.ts

    switch (action.type) {
      /* events that map to an action directly */
      case 'ADD_COLLABORATOR':
        analytics.tracks.recordEvent('editor_note_collaborator_added');
        break;
      case 'ADD_NOTE_TAG':
        analytics.tracks.recordEvent('editor_tag_added');
        break;
      case 'CREATE_NOTE':
        analytics.tracks.recordEvent('list_note_created');
        break;
      case 'EDIT_NOTE':
        analytics.tracks.recordEvent('editor_note_edited');
        break;
      case 'INSERT_TASK':
        analytics.tracks.recordEvent('editor_checklist_inserted');
        break;
      case 'LOGOUT':
        analytics.tracks.recordEvent('user_signed_out');
        break;
      case 'OPEN_NOTE':
        analytics.tracks.recordEvent('list_note_opened');
        break;
      case 'OPEN_TAG':
        analytics.tracks.recordEvent('list_tag_viewed');
        break;
      case 'REMOVE_COLLABORATOR':
        analytics.tracks.recordEvent('editor_note_collaborator_removed');
        break;
      case 'REMOVE_NOTE_TAG':
        analytics.tracks.recordEvent('editor_tag_removed');
        break;
      //   case 'RESTORE_NOTE':
      case 'RESTORE_OPEN_NOTE': // @todo we never see RESTORE_NOTE for some reason
        analytics.tracks.recordEvent('editor_note_restored');
        break;
      case 'SEARCH':
        if (action.searchQuery) {
          // @todo this gets called for each character typed
          // in search field, possibly also happening in develop?
          analytics.tracks.recordEvent('list_notes_searched');
        }
        break;
      case 'SELECT_TRASH':
        analytics.tracks.recordEvent('list_trash_viewed');
        break;
      case 'setAccountName':
        analytics.tracks.recordEvent('user_signed_in');
        break;
      case 'SHOW_DIALOG':
        if (action.dialog === 'SHARE') {
          analytics.tracks.recordEvent('editor_share_dialog_viewed');
        }
        break;
      // case 'DELETE_NOTE_FOREVER': @todo not sure if we should track this too?
      //case 'TRASH_NOTE':
      case 'TRASH_OPEN_NOTE': // @todo we never see TRASH_NOTE for some reason
        analytics.tracks.recordEvent('editor_note_deleted');
        break;
      case 'TRASH_TAG':
        analytics.tracks.recordEvent('list_tag_deleted');
        break;
    }
    return result;
  };
};

export default middleware;
