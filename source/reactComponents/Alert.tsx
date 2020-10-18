import React from 'react'

import { ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { browser } from 'webextension-polyfill-ts'

import { DialogProps } from '../content_scripts/modals'
import { getTheme } from './utils'

export interface AlertDialogProps extends DialogProps {
  closeDialog: () => void
}

export function AlertDialog(props: AlertDialogProps) {
  const [open, setOpen] = React.useState(true)

  const { closeDialog, title, message } = props

  const handleClose = () => {
    setOpen(false)
    closeDialog()
  }

  return (
    <ThemeProvider theme={getTheme()}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img
            style={{ width: '1.5em', marginRight: '.5em', verticalAlign: 'text-bottom' }}
            src={browser.runtime.getURL('icons/zoomcognito-icon.svg')}
            alt="ZoomCognitoIcon"
          />
          <span>{title}</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}
