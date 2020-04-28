import XRegExp from 'xregexp'

import { ImplementationError } from './errors'

/**
 * Determines if an url is valid, to generate a zoom link
 */
export const isZoomMeetingUrl = (url: string): boolean => {
  const zoomMeetingUrlRegex = XRegExp(
    `^https?://
    (sub-domain\\.)?
    zoom\\.us/
    (wc/)?
    (?<mode1>(j|s|join|start)/)?
    (\\d+)
    (?<mode2>/(join|start|j|s|))?`,
    'ix',
  )
  const matches = XRegExp.exec(url, zoomMeetingUrlRegex)
  if (matches !== null && (matches.mode1 !== undefined || matches.mode2 !== undefined)) {
    return true
  } else {
    return false
  }
}

/**
 * Generates a zoom web link from a valid zoom url
 */
export const generateZoomWebLink = (validZoomUrl: string, urlPrefix: string = ''): string => {
  const zoomMeetingUrlRegex = XRegExp(
    `^https?://
    ((?<subDomain>.*)\\.)?
    zoom\\.us/
    (wc/)?
    ((?<mode1>(j|s|join|start))/)?
    (?<zoomId>\\d+)
    (/(?<mode2>(join|start|j|s|))\/?)?
    (.*\\?((.*\\&)?pwd=(?<password>[a-z0-9]+)))?`,
    'ix',
  )
  const matches = XRegExp.exec(validZoomUrl, zoomMeetingUrlRegex)
  if (
    matches !== null &&
    // tslint:disable-next-line: strict-type-predicates
    (matches.mode1 !== undefined || matches.mode2 !== undefined)
  ) {
    // tslint:disable-next-line: strict-type-predicates
    const subDomain = matches.subDomain !== undefined ? matches.subDomain : urlPrefix
    const zoomId = matches.zoomId
    const password = matches.password
    // tslint:disable-next-line: strict-type-predicates
    let mode = matches.mode1 !== undefined ? matches.mode1 : matches.mode2
    mode = mode.length === 1 ? mode.replace('j', 'join').replace('s', 'start') : mode
    let zoomWebLink =
      subDomain === ''
        ? `https://zoom.us/wc/${zoomId}/${mode}`
        : `https://${subDomain}.zoom.us/wc/${zoomId}/${mode}`
    if (password) {
      zoomWebLink = `${zoomWebLink}?pwd=${password}`
    }
    return zoomWebLink
  } else {
    throw new ImplementationError(`The given url:\n${validZoomUrl}\n
    is not a valid zoom meeting url, make sure to check the url with 'isZoomMeetingUrl' before calling 'generateZoomWebLink'.`)
  }
}
