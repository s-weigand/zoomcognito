import { browser } from 'webextension-polyfill-ts'

import optionsStorage from './options-storage'

optionsStorage.syncForm('#options-form').catch(() => {
  console.log('Error loading settings.')
})

const blockClientDownload = document.querySelector('#blockClientDownload') as HTMLInputElement
blockClientDownload.addEventListener('change', (event: Event) => {
  browser.runtime
    .sendMessage({
      triggerBlockClientDownloadReload: (event.currentTarget as HTMLInputElement).checked,
    })
    .catch(() => {
      console.log('Failed to send triggerBlockClientDownloadReload')
    })
})
