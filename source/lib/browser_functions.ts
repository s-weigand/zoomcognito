import { Tabs, browser } from 'webextension-polyfill-ts'

export const openInIncognitoWindow = (url: string): void => {
  browser.windows.create({ incognito: true, url }).catch((error: Error) => {
    alert(`Unable to open ${url}\n\n ${error}`)
  })
}

export const blockZoomClientDownloadListener = (_details: any) => {
  return { cancel: true }
}

export const blockZoomClientDownload = (blockClientDownload: boolean) => {
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

export const sendErrorToDialog = (message: string, tab: Tabs.Tab | undefined) => {
  if (tab !== undefined) {
    const tabId = tab.id as number
    browser.tabs.sendMessage(tabId, { type: 'error', message }).catch((error: Error) => {
      console.log(error)
    })
  }
}
