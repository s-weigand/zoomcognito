import React from 'react'

import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Alert from '../../source/reactComponents/Alert'

it('Alert Component', () => {
  const closeDialogMock = jest.fn()

  const { getByRole, getByText } = render(
    <Alert {...{ closeDialog: closeDialogMock, title: 'testTitle', message: 'testMsg' }} />,
  )

  expect(getByRole('heading').textContent).toBe('testTitle')
  getByText('testMsg')
  expect(getByRole('button').textContent).toBe('Close')

  userEvent.click(getByText('Close'))
  expect(closeDialogMock).toBeCalledTimes(1)
})
