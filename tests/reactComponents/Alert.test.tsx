import React from 'react'

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AlertDialog } from '../../source/reactComponents/Alert'

it('AlertDialog Component', () => {
  const closeDialogMock = jest.fn()

  const { getByRole, getByText } = render(
    <AlertDialog {...{ closeDialog: closeDialogMock, title: 'testTitle', message: 'testMsg' }} />,
  )

  expect(getByRole('heading').textContent).toBe('testTitle')
  getByText('testMsg')
  expect(getByRole('button').textContent).toBe('Close')

  userEvent.click(getByText('Close'))
  expect(closeDialogMock).toBeCalledTimes(1)
})
