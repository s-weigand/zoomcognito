/**
 * @jest-environment jsdom
 */
import { ImplementationError } from '../../source/lib/errors'
import { generateZoomWebLink, isZoomMeetingUrl } from '../../source/lib/parsers'

describe('testing lib/parsers', () => {
  describe('isZoomUrl', () => {
    it.each([
      'https://zoom.us/wc/join/12345',
      'https://zoom.us/wc/join/12345?pwd=password123',
      'http://zoom.us/wc/join/12345?pwd=password123',
      'https://zoom.us/join/12345?pwd=password123',
      'https://zoom.us/j/12345?pwd=password123',
      'https://zoom.us/12345/j?pwd=password123',
      'https://zoom.us/start/12345?pwd=password123',
      'https://zoom.us/s/12345?pwd=password123',
      'https://sub-domain.zoom.us/wc/join/12345?pwd=password123',
      'https://zoom.us/wc/join/12345/join?pwd=password123', // even so this is technically invalid, it allow generation of a valid url
    ])('Valid url: %s', (validUrl) => {
      const result = isZoomMeetingUrl(validUrl)
      expect(result).toBe(true)
    })
    it.each([
      'https://google.com',
      'https://zoom.us',
      'https://zoom.us/12345',
      'https://zoom.us/j',
      'https://zoom.us/wc/j',
    ])('Invalid url: %s', (invalidUrl) => {
      const result = isZoomMeetingUrl(invalidUrl)
      expect(result).toBe(false)
    })
  })

  describe('generateZoomWebLink', () => {
    it.each([
      [
        'https://zoom.us/wc/join/12345',
        'dummy-domain',
        'https://dummy-domain.zoom.us/wc/12345/join',
      ],
      ['https://zoom.us/wc/join/12345', '', 'https://zoom.us/wc/12345/join'],
      [
        'https://zoom.us/wc/join/12345?pwd=password123',
        '',
        'https://zoom.us/wc/12345/join?pwd=password123',
      ],
      [
        'http://zoom.us/wc/join/12345?pwd=password123',
        '',
        'https://zoom.us/wc/12345/join?pwd=password123',
      ],
      [
        'https://zoom.us/join/12345?pwd=password123',
        '',
        'https://zoom.us/wc/12345/join?pwd=password123',
      ],
      [
        'https://zoom.us/j/12345?pwd=password123',
        '',
        'https://zoom.us/wc/12345/join?pwd=password123',
      ],
      [
        'https://zoom.us/12345/j?pwd=password123',
        '',
        'https://zoom.us/wc/12345/join?pwd=password123',
      ],
      [
        'https://zoom.us/start/12345?pwd=password123',
        '',
        'https://zoom.us/wc/12345/start?pwd=password123',
      ],
      [
        'https://zoom.us/s/12345?pwd=password123',
        '',
        'https://zoom.us/wc/12345/start?pwd=password123',
      ],
      [
        'https://sub-domain.zoom.us/wc/join/12345?pwd=password123',
        '',
        'https://sub-domain.zoom.us/wc/12345/join?pwd=password123',
      ],
      [
        'https://zoom.us/wc/join/12345/join?pwd=password123',
        '',
        'https://zoom.us/wc/12345/join?pwd=password123',
      ], // even so this is technically invalid, it allow generation of a valid url
    ])('Valid url: %s', (validUrl, urlPrefix, zoomWebLink) => {
      const result = generateZoomWebLink(validUrl, urlPrefix)
      expect(result).toBe(zoomWebLink)
    })
    it.each([
      'https://google.com',
      'https://zoom.us',
      'https://zoom.us/12345',
      'https://zoom.us/j',
      'https://zoom.us/wc/j',
    ])('Invalid url: %s', (invalidUrl) => {
      const runFunction = () => {
        generateZoomWebLink(invalidUrl)
      }
      expect(runFunction).toThrowError(ImplementationError)
    })
  })
})
