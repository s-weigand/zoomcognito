import { Menus, Tabs, browser } from 'webextension-polyfill-ts'

import { openInIncognitoWindow } from '../lib/browser_functions'
import { generateZoomWebLink, isZoomMeetingUrl } from '../lib/parsers'
import optionsStorage from '../options/options-storage'

browser.contextMenus.create({
  id: 'zoomcognito-context-open-incognito',
  title: 'Open zoom in incognito windows',
  contexts: ['link', 'selection'],
})

// not working in firefox
const currentUrlIcognito = (info: Menus.OnClickData, _tab?: Tabs.Tab | undefined) => {
  const url = info.linkUrl !== undefined ? info.linkUrl : info.selectionText
  if (url !== undefined) {
    if (isZoomMeetingUrl(url) === true) {
      optionsStorage
        .getAll()
        .then((response) => {
          const urlPrefix = response.zoomUrlPrefix
          const zoomWebLink = generateZoomWebLink(url, urlPrefix)
          openInIncognitoWindow(zoomWebLink)
        })
        .catch(() => {
          alert('Error getting the value of the option zoomUrlPrefix.')
        })
    } else {
      alert(`The given url isn't a proper zoom meeting url:\n ${url}`)
    }
  } else {
    alert("Couldn't determine url.")
  }
}

const triggerContextAction = (info: Menus.OnClickData, tab?: Tabs.Tab | undefined) => {
  switch (info.menuItemId) {
    case 'zoomcognito-context-open-incognito':
      currentUrlIcognito(info, tab)
      break
  }
}

browser.contextMenus.onClicked.addListener(triggerContextAction)
