import React from 'react'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { browser } from 'webextension-polyfill-ts'

import { DialogProps } from '../content_scripts/modals'

interface AlertDialogProps extends DialogProps {
  closeDialog: () => void
}

export default function AlertDialog(props: AlertDialogProps) {
  const [open, setOpen] = React.useState(true)

  const { closeDialog, title, message } = props

  const handleClose = () => {
    setOpen(false)
    closeDialog()
  }
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <img
            style={{ width: '1em', marginRight: '1em' }}
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
