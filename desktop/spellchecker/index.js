'use strict';

/**
 * External dependencies
 */
const { Menu, MenuItem } = require('electron');

const { appCommandSender } = require('../menus/utils');

module.exports = function (mainWindow) {
  mainWindow.webContents.on('context-menu', (event, params) => {
    const { editFlags } = params;

    // // Add each spelling suggestion
    // for (const suggestion of params.dictionarySuggestions) {
    //   menu.append(
    //     new MenuItem({
    //       label: suggestion,
    //       click: () => mainWindow.webContents.replaceMisspelling(suggestion),
    //     })
    //   );
    // }

    // // Allow users to add the misspelled word to the dictionary
    // if (params.misspelledWord) {
    //   menu.append(new MenuItem({ type: 'separator' }));
    //   menu.append(
    //     new MenuItem({
    //       label: 'Add to Dictionary',
    //       click: () =>
    //         mainWindow.webContents.session.addWordToSpellCheckerDictionary(
    //           params.misspelledWord
    //         ),
    //     })
    //   );
    // }

    // if (params?.dictionarySuggestions?.length > 0) {
    //   menu.append(new MenuItem({ type: 'separator' }));
    // }

    const template = [
      {
        id: 'selectAll',
        label: 'Select All',
        click: appCommandSender({ action: 'selectAll' }),
        enabled: editFlags.canSelectAll,
      },
      {
        id: 'cut',
        label: 'Cut',
        role: 'cut',
        enabled: editFlags.canCut,
      },
      {
        id: 'copy',
        label: 'Copy',
        role: 'copy',
        enabled: editFlags.canCopy,
      },
      {
        id: 'paste',
        label: 'Paste',
        role: 'paste',
        enabled: editFlags.canPaste,
      },
      {
        type: 'separator',
      },
    ];
    const menu = Menu.buildFromTemplate(template);
    menu.popup({});
  });
};
