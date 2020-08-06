import { Menus, Tabs, browser } from 'webextension-polyfill-ts'

import { openInIncognitoWindow, sendErrorToDialog } from '../lib/browser_functions'
import { generateZoomWebLink, isZoomMeetingUrl } from '../lib/parsers'
import optionsStorage from '../options/options-storage'

browser.contextMenus.create({
  id: 'zoomcognito-context-open-incognito',
  title: 'Open zoom in incognito windows',
  icons: {
    '16': 'icons/zoomcognito-icon.svg',
  },
  contexts: ['link', 'selection'],
})

const openZoomMeetingUrlIcognito = (info: Menus.OnClickData, _tab?: Tabs.Tab | undefined) => {
  const url = info.linkUrl !== undefined ? info.linkUrl : info.selectionText
  if (url !== undefined) {
    if (isZoomMeetingUrl(url) === true) {
      optionsStorage
        .getAll()
        .then((response) => {
          const urlPrefix = response.zoomUrlPrefix
          const zoomWebLink = generateZoomWebLink(url, urlPrefix)
          openInIncognitoWindow(zoomWebLink, _tab)
        })
        .catch(() => {
          sendErrorToDialog('Error getting the value of the option zoomUrlPrefix.', _tab)
        })
    } else {
      sendErrorToDialog(
        `The given link-url/selection isn't a proper zoom meeting url: ${url}`,
        _tab,
      )
    }
  } else {
    sendErrorToDialog("Couldn't determine url.", _tab)
  }
}

const triggerContextAction = (info: Menus.OnClickData, tab?: Tabs.Tab | undefined) => {
  switch (info.menuItemId) {
    case 'zoomcognito-context-open-incognito':
      openZoomMeetingUrlIcognito(info, tab)
      break
  }
}

browser.contextMenus.onClicked.addListener(triggerContextAction)
