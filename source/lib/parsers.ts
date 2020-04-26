/**
 * Determines if an url is valid, to generate a zoom link
 */
export const isZoomMeetingUrl = (url: string): boolean => {
  const zoomMeetingUrlRegex = /^https?\:\/\/(.*\.)?zoom\.us\/(wc\/)?(?<mode1>(j|s|join|start)\/)?(\d+)(?<mode2>\/(join|start|j|s|))?/i
  const matches = zoomMeetingUrlRegex.exec(url)
  if (matches !== null) {
    if (
      matches.groups !== undefined &&
      // tslint:disable-next-line: strict-type-predicates
      (matches.groups.mode1 !== undefined || matches.groups.mode2 !== undefined)
    ) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

/**
 * Generates a zoom web link from a valid zoom url
 */
export const generateZoomWebLink = (validZoomUrl: string, urlPrefix: string = ''): string => {
  const zoomMeetingUrlRegex = /^https?\:\/\/((?<subDomain>.*)\.)?zoom\.us\/(wc\/)?((?<mode1>(j|s|join|start))\/)?(?<zoomId>\d+)(\/(?<mode2>(join|start|j|s|))\/?)?(.*\?((.*\&)?pwd=(?<password>[a-z0-9]+)))?/i
  const matches = zoomMeetingUrlRegex.exec(validZoomUrl)
  if (
    matches !== null &&
    matches.groups !== undefined &&
    // tslint:disable-next-line: strict-type-predicates
    (matches.groups.mode1 !== undefined || matches.groups.mode2 !== undefined)
  ) {
    // tslint:disable-next-line: strict-type-predicates
    const subDomain = matches.groups.subDomain !== undefined ? matches.groups.subDomain : urlPrefix
    const zoomId = matches.groups.zoomId
    const password = matches.groups.password
    // tslint:disable-next-line: strict-type-predicates
    let mode = matches.groups.mode1 !== undefined ? matches.groups.mode1 : matches.groups.mode2
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
    throw Error(`The given url `)
  }
}
