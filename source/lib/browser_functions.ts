import { Menus, Tabs, browser } from 'webextension-polyfill-ts'

export const openInIncognitoWindow = (url: string, _tab: Tabs.Tab | undefined): void => {
  browser.windows.create({ incognito: true, url }).catch((error: Error) => {
    sendErrorToDialog(`Unable to open ${url}\n\n ${error}`, _tab)
  })
}

export const blockZoomClientDownloadListener = (_details: any) => {
  return { cancel: true }
}

export const blockZoomClientDownload = (blockClientDownload: boolean): void => {
  if (browser.webRequest.onBeforeRequest.hasListener(blockZoomClientDownloadListener)) {
    browser.webRequest.onBeforeRequest.removeListener(blockZoomClientDownloadListener)
  }
  if (blockClientDownload === true) {
    browser.webRequest.onBeforeRequest.addListener(
      blockZoomClientDownloadListener,
      { urls: ['*://*.zoom.us/downloads/*'] },
      ['blocking'],
    )
  }
}

/**
 * Solution suggested by glazou
 * http://www.glazman.org/weblog/dotclear/index.php?post/2018/06/07/Browser-detection-inside-a-WebExtension
 */
export const removeIconsOnChrome = (
  contextMenueProps: Menus.CreateCreatePropertiesType,
): Menus.CreateCreatePropertiesType => {
  const extensionUrl = browser.runtime.getURL('/')
  if (extensionUrl.startsWith('chrome')) {
    delete contextMenueProps.icons
  }
  return contextMenueProps
}

export const sendErrorToDialog = (message: string, tab: Tabs.Tab | undefined): void => {
  if (tab !== undefined) {
    const tabId = tab.id as number
    browser.tabs.sendMessage(tabId, { type: 'error', message }).catch((error: Error) => {
      console.log(error)
    })
  }
}
