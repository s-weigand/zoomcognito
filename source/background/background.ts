import { browser } from 'webextension-polyfill-ts'

import { blockZoomClientDownload } from '../lib/browser_functions'
import optionsStorage from '../options/options-storage'

optionsStorage
  .getAll()
  .then((response) => {
    blockZoomClientDownload(response.blockClientDownload)
  })
  .catch(() => {
    alert('Error blocking Zoom client download.')
  })

const messageListener = (data: any) => {
  if (data.triggerBlockClientDownloadReload !== undefined) {
    blockZoomClientDownload(data.triggerBlockClientDownloadReload)
  }
}

browser.runtime.onMessage.addListener(messageListener)
