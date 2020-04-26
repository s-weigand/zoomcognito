import { browser } from 'webextension-polyfill-ts'

export const openInIncognitoWindow = (url: string): void => {
  browser.windows.create({ incognito: true, url }).catch(() => {
    alert(`Unable to open ${url}`)
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
      ['blocking']
    )
  }
}
