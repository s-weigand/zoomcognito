import React from 'react'
import ReactDOM from 'react-dom'
import { browser } from 'webextension-polyfill-ts'

import { AlertDialog } from '../reactComponents/Alert'

export interface DialogProps {
  title: string
  message: string
  kind?: 'error'
}

const addDialog = (props: DialogProps) => {
  let container = document.querySelector('#ZoomCognito-dialog-container')
  if (container === null) {
    container = document.createElement('div')
    container.id = 'ZoomCognito-dialog-container'
    const body = document.querySelector('body') as HTMLBodyElement
    body.appendChild(container)
  }
  const title = `ZoomCognito: ${props.title}`
  const closeDialog = (): void => {
    ReactDOM.unmountComponentAtNode(container as Element)
  }
  ReactDOM.render(<AlertDialog {...{ closeDialog, title, message: props.message }} />, container)
}

const messageListener = (message: any) => {
  if (message.type === 'error') {
    addDialog({ title: 'Error', message: message.message })
  }
}

browser.runtime.onMessage.addListener(messageListener)
