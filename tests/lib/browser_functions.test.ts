import {
  // Menus,
  Tabs,
  browser,
} from 'webextension-polyfill-ts'

import {
  blockZoomClientDownloadListener,
  // removeIconsOnChrome,
  sendErrorToDialog,
} from '../../source/lib/browser_functions'

const dummyTab: Tabs.Tab = {
  id: 0,
  index: 0,
  highlighted: false,
  active: true,
  pinned: false,
  incognito: false,
}

const DummyPromise = (...args: any[]) => {
  return new Promise(
    jest.fn(() => {
      return { ...args }
    }),
  )
}

// const test_data_no_icon = {
//   id: 'test',
//   title: 'testTitle',
// }

// const test_data_icon = {
//   icons: {
//     '16': 'test/icon',
//   },
//   ...test_data_no_icon,
// }

describe('Browser Functions', () => {
  beforeAll(() => {
    jest
      .spyOn(browser.tabs, 'sendMessage')
      .mockImplementation(
        (tabId: number, message: any, options?: Tabs.SendMessageOptionsType | undefined) =>
          DummyPromise(tabId, message, options),
      )
  })
  afterAll(() => {
    jest.restoreAllMocks()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('blockZoomClientDownloadListener', () => {
    expect(blockZoomClientDownloadListener({ dummy: {} })).toStrictEqual({
      cancel: true,
    })
  })
  it('sendErrorToDialog calls sendMessage with proper arguments', () => {
    sendErrorToDialog('test_msg', dummyTab)
    expect(browser.tabs.sendMessage).toHaveBeenCalledWith(0, { type: 'error', message: 'test_msg' })
  })
  it('sendErrorToDialog calls sendMessage with false arguments', () => {
    sendErrorToDialog('test_msg', undefined)
    expect(browser.tabs.sendMessage).not.toHaveBeenCalled()
  })
  // it.each([
  //   ['chrome', test_data_icon, test_data_no_icon],
  //   ['moz', test_data_icon, test_data_icon],
  // ])(
  //   'removeIconsOnChrome: for browser %s',
  //   (
  //     browserName: string,
  //     contextProps: Menus.CreateCreatePropertiesType,
  //     expected: Menus.CreateCreatePropertiesType,
  //   ) => {
  //     jest.spyOn(browser.extension, 'getURL').mockImplementation((_path: string) => browserName)
  //     expect(removeIconsOnChrome(contextProps)).toBe(expected)
  //   },
  // )
})
